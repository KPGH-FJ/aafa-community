'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
const DEFAULT_TIMEOUT = 10000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface UseApiOptions {
  immediate?: boolean;
  timeout?: number;
  retries?: number;
  onError?: (error: ApiError) => void;
  requiresAuth?: boolean;
}

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => Promise<void>;
  reset: () => void;
}

/**
 * 通用 API Hook
 * 自动处理 token、超时、重试、错误提示
 */
export function useApi<T>(
  endpoint: string,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const {
    immediate = true,
    timeout = DEFAULT_TIMEOUT,
    retries = MAX_RETRIES,
    onError,
    requiresAuth = false,
  } = options;

  const router = useRouter();
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const getToken = useCallback((): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_token');
  }, []);

  const fetchWithRetry = useCallback(
    async (attempt = 1): Promise<T> => {
      // 取消之前的请求
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const token = getToken();
      
      if (requiresAuth && !token) {
        throw new ApiError('请先登录', 401, 'UNAUTHORIZED');
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          abortControllerRef.current?.abort();
          reject(new ApiError('请求超时，请稍后重试', 408, 'TIMEOUT'));
        }, timeout);

        fetch(`${API_BASE_URL}${endpoint}`, {
          headers,
          signal: abortControllerRef.current.signal,
        })
          .then(async (response) => {
            clearTimeout(timeoutId);

            // 处理 401 未授权
            if (response.status === 401) {
              localStorage.removeItem('admin_token');
              router.push('/admin/login');
              throw new ApiError('登录已过期，请重新登录', 401, 'TOKEN_EXPIRED');
            }

            if (!response.ok) {
              let errorData: { message?: string; code?: string } = {};
              try {
                errorData = await response.json();
              } catch {
                // 响应不是 JSON 格式
              }

              const errorMessage = errorData.message || `请求失败 (${response.status})`;
              throw new ApiError(errorMessage, response.status, errorData.code);
            }

            const data = await response.json();
            resolve(data);
          })
          .catch((error) => {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
              reject(new ApiError('请求已取消', 0, 'ABORTED'));
              return;
            }

            // 网络错误时重试
            if (
              attempt < retries &&
              (!error.statusCode || error.statusCode >= 500)
            ) {
              setTimeout(() => {
                fetchWithRetry(attempt + 1).then(resolve).catch(reject);
              }, RETRY_DELAY * attempt);
              return;
            }

            reject(error);
          });
      });
    },
    [endpoint, timeout, retries, getToken, requiresAuth, router]
  );

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await fetchWithRetry();
      setState({ data, loading: false, error: null });
    } catch (error) {
      const apiError =
        error instanceof ApiError
          ? error
          : new ApiError(
              error instanceof Error ? error.message : '网络错误，请检查连接',
              undefined,
              'NETWORK_ERROR'
            );

      setState({ data: null, loading: false, error: apiError });
      onError?.(apiError);
    }
  }, [fetchWithRetry, onError]);

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [immediate, execute]);

  return {
    ...state,
    refetch: execute,
    reset,
  };
}

/**
 * 通用 POST/PUT/DELETE 请求 Hook
 */
export function useMutation<T, D = unknown>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options: Omit<UseApiOptions, 'immediate'> = {}
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const router = useRouter();

  const getToken = useCallback((): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_token');
  }, []);

  const mutate = useCallback(
    async (data?: D): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const token = getToken();
        
        if (options.requiresAuth && !token) {
          throw new ApiError('请先登录', 401, 'UNAUTHORIZED');
        }

        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method,
          headers,
          body: data ? JSON.stringify(data) : undefined,
        });

        if (response.status === 401) {
          localStorage.removeItem('admin_token');
          router.push('/admin/login');
          throw new ApiError('登录已过期，请重新登录', 401, 'TOKEN_EXPIRED');
        }

        if (!response.ok) {
          let errorData: { message?: string; code?: string } = {};
          try {
            errorData = await response.json();
          } catch {}

          const errorMessage = errorData.message || `请求失败 (${response.status})`;
          throw new ApiError(errorMessage, response.status, errorData.code);
        }

        // 204 No Content
        if (response.status === 204) {
          return null as T;
        }

        const result = await response.json();
        return result;
      } catch (error) {
        const apiError =
          error instanceof ApiError
            ? error
            : new ApiError(
                error instanceof Error ? error.message : '网络错误',
                undefined,
                'NETWORK_ERROR'
              );

        setError(apiError);
        options.onError?.(apiError);
        toast.error(apiError.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, method, options, getToken, router]
  );

  return { mutate, loading, error };
}

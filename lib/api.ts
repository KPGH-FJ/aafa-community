// API 调用封装 - 优化版本
// 改进: 更好的错误处理、请求超时、类型安全

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
const REQUEST_TIMEOUT = 10000; // 10秒超时
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// API 错误类
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

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string;
  timeout?: number;
}

// 存储活跃的请求控制器
const activeControllers = new Map<string, AbortController>();

// 生成请求 ID
function generateRequestId(endpoint: string, method: string): string {
  return `${method}:${endpoint}:${Date.now()}`;
}

// 取消之前的相同请求
function cancelPreviousRequest(requestId: string): void {
  const existingController = activeControllers.get(requestId);
  if (existingController) {
    existingController.abort();
    activeControllers.delete(requestId);
  }
}

// 超时包装器
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = REQUEST_TIMEOUT
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('请求超时，请稍后重试', 408, 'TIMEOUT');
    }
    throw error;
  }
};

// 带重试的请求
const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  timeout: number,
  attempt = 1
): Promise<Response> => {
  try {
    return await fetchWithTimeout(url, options, timeout);
  } catch (error) {
    // 只在网络错误或 5xx 错误时重试
    const shouldRetry =
      error instanceof ApiError &&
      (!error.statusCode || error.statusCode >= 500) &&
      attempt < MAX_RETRIES;

    if (shouldRetry) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * attempt));
      return fetchWithRetry(url, options, timeout, attempt + 1);
    }

    throw error;
  }
};

// 主 API 调用函数
export async function api<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = 'GET', body, token, timeout } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // 生成请求 ID 并取消之前的相同请求（只对非 GET 请求）
  const requestId = generateRequestId(endpoint, method);
  if (method !== 'GET') {
    cancelPreviousRequest(requestId);
  }

  const controller = new AbortController();
  activeControllers.set(requestId, controller);

  try {
    const response = await fetchWithRetry(
      `${API_BASE_URL}${endpoint}`,
      {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      },
      timeout
    );

    // 处理非 2xx 响应
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

    // 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // 网络错误或其他异常
    throw new ApiError(
      error instanceof Error ? error.message : '网络错误，请检查连接',
      undefined,
      'NETWORK_ERROR'
    );
  } finally {
    activeControllers.delete(requestId);
  }
}

// 取消特定请求
export function cancelRequest(endpoint: string, method: string): void {
  const requestId = generateRequestId(endpoint, method);
  cancelPreviousRequest(requestId);
}

// 取消所有活跃请求
export function cancelAllRequests(): void {
  activeControllers.forEach((controller) => controller.abort());
  activeControllers.clear();
}

// ===== 文章 API =====
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featured: boolean;
}

export interface ArticlesResponse {
  success: boolean;
  data: Article[];
}

export const articlesApi = {
  getAll: (params?: { skip?: number; take?: number; category?: string }) =>
    api<ArticlesResponse>('/articles', { method: 'GET' }),

  getById: (id: string) =>
    api<{ success: boolean; data: Article }>(`/articles/${id}`, { method: 'GET' }),

  getBySlug: (slug: string) =>
    api<{ success: boolean; data: Article }>(`/articles/slug/${slug}`, { method: 'GET' }),
};

// ===== 活动 API =====
export interface Event {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  date: string;
  time: string;
  location: string;
  status: 'UPCOMING' | 'ONGOING' | 'PAST' | 'CANCELLED';
  maxAttendees?: number;
  currentAttendees: number;
  price: number;
  tags: string[];
}

export const eventsApi = {
  getAll: (params?: { skip?: number; take?: number; status?: string }) =>
    api<{ success: boolean; data: Event[] }>('/events', { method: 'GET' }),

  getById: (id: string) =>
    api<{ success: boolean; data: Event }>(`/events/${id}`, { method: 'GET' }),

  register: (id: string, token: string) =>
    api<{ success: boolean; message: string }>(`/events/${id}/register`, {
      method: 'POST',
      token,
    }),
};

// ===== Newsletter API =====
export const newsletterApi = {
  subscribe: (email: string, name?: string) =>
    api<{ success: boolean; message: string }>('/newsletter/subscribe', {
      method: 'POST',
      body: { email, name },
    }),
};

// ===== 认证 API =====
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
  bio?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export const authApi = {
  login: (email: string, password: string) =>
    api<AuthResponse>('/auth/login', {
      method: 'POST',
      body: { email, password },
    }),

  register: (email: string, password: string, name?: string) =>
    api<AuthResponse>('/auth/register', {
      method: 'POST',
      body: { email, password, name },
    }),

  getMe: (token: string) =>
    api<{ success: boolean; data: User }>('/auth/me', { method: 'GET', token }),
};

// ===== 导出所有 API =====
export const apiClient = {
  articles: articlesApi,
  events: eventsApi,
  newsletter: newsletterApi,
  auth: authApi,
};

export default apiClient;
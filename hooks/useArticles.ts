'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  publishedAt: string;
  readTime: number;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface ArticlesResponse {
  success: boolean;
  data: Article[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface UseArticlesState {
  data: ArticlesResponse | null;
  loading: boolean;
  error: ApiError | null;
}

/**
 * 获取管理员文章列表（包含草稿）
 */
export function useAdminArticles(limit: number = 100) {
  const [state, setState] = useState<UseArticlesState>({
    data: null,
    loading: true,
    error: null,
  });
  const router = useRouter();

  const fetchArticles = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/articles/admin/all?limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
        throw new ApiError('登录已过期', 401, 'UNAUTHORIZED');
      }

      if (!response.ok) {
        throw new ApiError(`请求失败 (${response.status})`, response.status);
      }

      const data: ArticlesResponse = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      const apiError =
        error instanceof ApiError
          ? error
          : new ApiError(
              error instanceof Error ? error.message : '网络错误',
              undefined,
              'NETWORK_ERROR'
            );
      setState({ data: null, loading: false, error: apiError });
      toast.error(apiError.message);
    }
  }, [limit, router]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    ...state,
    refetch: fetchArticles,
  };
}

/**
 * 删除文章
 */
export function useDeleteArticle() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteArticle = useCallback(
    async (id: string): Promise<boolean> => {
      const confirmed = window.confirm('确定要删除这篇文章吗？此操作不可恢复。');
      if (!confirmed) return false;

      setLoading(true);

      try {
        const token = localStorage.getItem('admin_token');
        if (!token) {
          router.push('/admin/login');
          return false;
        }

        const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          localStorage.removeItem('admin_token');
          router.push('/admin/login');
          throw new ApiError('登录已过期', 401, 'UNAUTHORIZED');
        }

        if (!response.ok) {
          throw new ApiError(`删除失败 (${response.status})`, response.status);
        }

        toast.success('文章删除成功');
        return true;
      } catch (error) {
        const apiError =
          error instanceof ApiError
            ? error
            : new ApiError(
                error instanceof Error ? error.message : '网络错误',
                undefined,
                'NETWORK_ERROR'
              );
        toast.error(apiError.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  return { deleteArticle, loading };
}

// API 调用封装
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: any;
  token?: string;
}

export async function api<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  
  return response.json();
}

// 文章 API
export const articlesApi = {
  getAll: (params?: { skip?: number; take?: number; category?: string }) => 
    api('/articles', { method: 'GET' }),
  
  getById: (id: string) => 
    api(`/articles/${id}`, { method: 'GET' }),
  
  getBySlug: (slug: string) => 
    api(`/articles/slug/${slug}`, { method: 'GET' }),
};

// 活动 API
export const eventsApi = {
  getAll: (params?: { skip?: number; take?: number; status?: string }) => 
    api('/events', { method: 'GET' }),
  
  getById: (id: string) => 
    api(`/events/${id}`, { method: 'GET' }),
  
  register: (id: string, token: string) => 
    api(`/events/${id}/register`, { method: 'POST', token }),
};

// Newsletter API
export const newsletterApi = {
  subscribe: (email: string, name?: string) => 
    api('/newsletter/subscribe', { 
      method: 'POST', 
      body: { email, name } 
    }),
};

// 认证 API
export const authApi = {
  login: (email: string, password: string) => 
    api('/auth/login', { 
      method: 'POST', 
      body: { email, password } 
    }),
  
  register: (email: string, password: string, name?: string) => 
    api('/auth/register', { 
      method: 'POST', 
      body: { email, password, name } 
    }),
  
  getMe: (token: string) => 
    api('/auth/me', { method: 'GET', token }),
};

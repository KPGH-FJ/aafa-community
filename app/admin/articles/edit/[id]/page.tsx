'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ImageUploader } from '@/components/ui/ImageUploader';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { useAutoSave } from '@/hooks/useAutoSave';

interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  coverImage: string;
  readTime: number;
  featured: boolean;
  status: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  readTime: number;
  featured: boolean;
  status: string;
}

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  // 确保 params 已加载
  if (!id) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#C9A89A] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-[#7A7670]">加载中...</p>
        </div>
      </div>
    );
  }
  
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'AI真相揭秘',
    tags: '',
    coverImage: '',
    readTime: 5,
    featured: false,
    status: 'DRAFT',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const STORAGE_KEY = `article-draft-${id}`;

  const {
    lastSaved,
    isDirty,
    restoreDraft,
    clearDraft,
    saveDraft,
  } = useAutoSave(formData, { key: STORAGE_KEY, interval: 30000 });

  // 页面加载时获取文章数据
  useEffect(() => {
    const fetchArticle = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
        const response = await fetch(`${apiUrl}/articles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setFetchError('文章不存在');
          } else if (response.status === 401) {
            router.push('/admin/login');
            return;
          } else {
            setFetchError('获取文章失败');
          }
          setFetchLoading(false);
          return;
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          const article: Article = data.data;
          
          // 检查是否有草稿需要恢复
          const draft = restoreDraft();
          if (draft) {
            // 使用草稿数据，但保持ID
            setFormData(draft);
          } else {
            // 使用API返回的数据
            setFormData({
              title: article.title,
              slug: article.slug,
              excerpt: article.excerpt,
              content: article.content,
              category: article.category,
              tags: Array.isArray(article.tags) ? article.tags.join(', ') : '',
              coverImage: article.coverImage || '',
              readTime: article.readTime,
              featured: article.featured,
              status: article.status,
            });
          }
        } else {
          setFetchError('文章数据格式错误');
        }
      } catch (err) {
        setFetchError('网络错误，请检查API连接');
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id, router, restoreDraft]);

  // 预览功能
  const handlePreview = () => {
    // 保存到 localStorage
    saveDraft();
    // 打开预览页面
    window.open(`/admin/preview?type=article&id=${id}&draft=true`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const response = await fetch(`${apiUrl}/articles/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });

      const data = await response.json();

      if (data.success) {
        // 保存成功后清除草稿
        clearDraft();
        toast.success('文章保存成功');
        router.push('/admin/articles');
      } else {
        setError(data.error || '更新失败');
        toast.error('保存失败: ' + (data.error || '未知错误'));
      }
    } catch (err) {
      setError('网络错误');
      toast.error('保存失败: 网络错误');
    } finally {
      setSaving(false);
    }
  };

  // 加载中状态
  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#C9A89A] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-[#7A7670]">加载中...</p>
        </div>
      </div>
    );
  }

  // 获取失败状态
  if (fetchError) {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <header className="bg-white border-b border-[#E5E2DE]">
          <Container className="py-4">
            <Link href="/admin/articles" className="text-[#2C2C2C] hover:text-[#C9A89A]">
              ← 返回文章列表
            </Link>
          </Container>
        </header>
        <Container className="py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#2C2C2C] mb-2">{fetchError}</h2>
            <p className="text-[#7A7670] mb-6">无法加载文章数据，请稍后重试</p>
            <Button onClick={() => window.location.reload()}>重新加载</Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <header className="bg-white border-b border-[#E5E2DE]">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/articles" className="text-[#2C2C2C] hover:text-[#C9A89A]">
                ← 返回
              </Link>
              <h1 className="text-xl font-serif font-bold text-[#2C2C2C]">
                编辑文章
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {/* 自动保存状态 */}
              <div className="text-sm text-[#7A7670]">
                {isDirty ? (
                  <span className="text-[#C9A89A]">● 有未保存的更改</span>
                ) : lastSaved ? (
                  <span>✓ 已保存 {lastSaved.toLocaleTimeString()}</span>
                ) : null}
              </div>
              {/* 预览按钮 */}
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePreview}
                className="flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                预览
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <Container className="py-8">
        <div className="bg-white rounded-xl border border-[#E5E2DE] p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#5C5852] mb-2">
                标题 *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] focus:ring-2 focus:ring-[#C9A89A]/20 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5C5852] mb-2">
                URL 标识 (slug) *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] focus:ring-2 focus:ring-[#C9A89A]/20 outline-none"
                placeholder="例如: cursor-efficiency-test"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5C5852] mb-2">
                摘要 *
              </label>
              <textarea
                required
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] focus:ring-2 focus:ring-[#C9A89A]/20 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5C5852] mb-2">
                正文内容 *
              </label>
              <RichTextEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="开始写作..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#5C5852] mb-2">
                  分类 *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] outline-none"
                >
                  <option value="AI真相揭秘">AI真相揭秘</option>
                  <option value="人文思辨">人文思辨</option>
                  <option value="工具实操">工具实操</option>
                  <option value="前沿资讯">前沿资讯</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5C5852] mb-2">
                  标签 (逗号分隔)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] outline-none"
                  placeholder="Cursor, 编程工具, 效率测评"
                />
              </div>
            </div>

            <ImageUploader
              value={formData.coverImage}
              onChange={(url) => setFormData({ ...formData, coverImage: url })}
            />

            <div>
              <label className="block text-sm font-medium text-[#5C5852] mb-2">
                阅读时间 (分钟)
              </label>
              <input
                type="number"
                min={1}
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] outline-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-[#E5E2DE] text-[#C9A89A] focus:ring-[#C9A89A]"
                />
                <span className="text-sm text-[#5C5852]">精选文章</span>
              </label>
            </div>

            <div className="flex items-center gap-4">
              <label className="block text-sm font-medium text-[#5C5852]">状态</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="px-4 py-2 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] outline-none"
              >
                <option value="DRAFT">草稿</option>
                <option value="PUBLISHED">发布</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={saving}>
                {saving ? '保存中...' : '保存更改'}
              </Button>
              <Button type="button" variant="outline" onClick={handlePreview}>
                <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                预览
              </Button>
              <Link href="/admin/articles">
                <Button variant="outline" type="button">
                  取消
                </Button>
              </Link>
            </div>

            <p className="text-xs text-[#A8A49D]">
              提示：按 Ctrl+S 可手动保存草稿
            </p>
          </form>
        </div>
      </Container>
    </div>
  );
}

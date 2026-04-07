'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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

const STORAGE_KEY = 'article-draft-new';

export default function NewArticlePage() {
  const router = useRouter();
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
  const [error, setError] = useState('');
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);

  const {
    lastSaved,
    isDirty,
    hasRestoredDraft,
    restoreDraft,
    clearDraft,
    setHasRestoredDraft,
  } = useAutoSave(formData, { key: STORAGE_KEY, interval: 30000 });

  // 页面加载时检查是否有草稿
  useEffect(() => {
    const draft = restoreDraft();
    if (draft) {
      setShowRestorePrompt(true);
    }
  }, [restoreDraft]);

  // 恢复草稿
  const handleRestore = () => {
    const draft = restoreDraft();
    if (draft) {
      setFormData(draft);
    }
    setShowRestorePrompt(false);
    setHasRestoredDraft(false);
  };

  // 放弃草稿
  const handleDiscard = () => {
    clearDraft();
    setShowRestorePrompt(false);
    setHasRestoredDraft(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const response = await fetch(`${apiUrl}/articles`, {
        method: 'POST',
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
        // 发布成功后清除草稿
        clearDraft();
        router.push('/admin/articles');
      } else {
        setError(data.error || '创建失败');
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <header className="bg-white border-b border-[#E5E2DE]">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-[#2C2C2C] hover:text-[#C9A89A]">
                ← 返回
              </Link>
              <h1 className="text-xl font-serif font-bold text-[#2C2C2C]">
                新建文章
              </h1>
            </div>
            {/* 自动保存状态 */}
            <div className="text-sm text-[#7A7670]">
              {isDirty ? (
                <span className="text-[#C9A89A]">● 有未保存的更改</span>
              ) : lastSaved ? (
                <span>✓ 已保存 {lastSaved.toLocaleTimeString()}</span>
              ) : null}
            </div>
          </div>
        </Container>
      </header>

      {/* 恢复草稿提示 */}
      {showRestorePrompt && (
        <div className="bg-[#E8DED4] border-b border-[#D4C4B5]">
          <Container className="py-4">
            <div className="flex items-center justify-between">
              <p className="text-[#5C5852]">
                发现未保存的草稿（{lastSaved?.toLocaleString()}），是否恢复？
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleRestore}
                  className="px-4 py-2 bg-[#C9A89A] text-white rounded-lg hover:bg-[#B89789] transition-colors"
                >
                  恢复草稿
                </button>
                <button
                  onClick={handleDiscard}
                  className="px-4 py-2 bg-white text-[#5C5852] rounded-lg hover:bg-[#F0EEEB] transition-colors"
                >
                  放弃
                </button>
              </div>
            </div>
          </Container>
        </div>
      )}

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
              <Button type="submit" disabled={loading}>
                {loading ? '创建中...' : '创建文章'}
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

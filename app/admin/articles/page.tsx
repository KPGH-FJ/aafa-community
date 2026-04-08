'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TableSkeleton } from '@/components/ui/Skeleton';
import { useAdminArticles } from '@/hooks/useArticles';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  publishedAt: string;
  author: {
    name: string;
  };
}

function ArticlesTable({ 
  articles, 
  onDelete 
}: { 
  articles: Article[];
  onDelete: (id: string) => Promise<void>;
}) {
  const getStatusBadge = (status: Article['status']) => {
    const styles = {
      PUBLISHED: 'bg-green-100 text-green-700',
      DRAFT: 'bg-yellow-100 text-yellow-700',
      ARCHIVED: 'bg-gray-100 text-gray-700',
    };
    
    const labels = {
      PUBLISHED: '已发布',
      DRAFT: '草稿',
      ARCHIVED: '已归档',
    };

    return (
      <span className={`text-xs px-2 py-1 rounded ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-[#E5E2DE] overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#F0EEEB]">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#5C5852]">标题</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#5C5852]">分类</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#5C5852]">状态</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-[#5C5852]">发布时间</th>
            <th className="text-right px-6 py-4 text-sm font-medium text-[#5C5852]">操作</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-t border-[#E5E2DE] hover:bg-[#FAFAF8]">
              <td className="px-6 py-4">
                <div className="font-medium text-[#2C2C2C]">{article.title}</div>
                {article.featured && (
                  <span className="text-xs bg-[#C9A89A] text-white px-2 py-0.5 rounded mt-1 inline-block">
                    精选
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-[#5C5852]">{article.category}</td>
              <td className="px-6 py-4">{getStatusBadge(article.status)}</td>
              <td className="px-6 py-4 text-sm text-[#7A7670]">
                {new Date(article.publishedAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-4">
                  <Link
                    href={`/articles/${article.slug}`}
                    target="_blank"
                    className="text-sm text-[#7A7670] hover:text-[#5C5852] transition-colors"
                  >
                    预览
                  </Link>
                  <Link
                    href={`/admin/articles/edit/${article.id}`}
                    className="text-sm text-[#C9A89A] hover:underline"
                  >
                    编辑
                  </Link>
                  <button
                    onClick={() => onDelete(article.id)}
                    className="text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    删除
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArticlesContent() {
  const { data, loading, error, refetch } = useAdminArticles();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？此操作不可恢复。')) return;

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const response = await fetch(`${apiUrl}/articles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success('文章删除成功');
        refetch();
      } else {
        const data = await response.json();
        toast.error(data.error || '删除失败');
      }
    } catch (error) {
      console.error('删除文章失败:', error);
      toast.error('删除文章失败，请重试');
    }
  };

  if (loading) {
    return (
      <Container className="py-8">
        <TableSkeleton rows={5} columns={5} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">加载失败: {error.message}</p>
          <Button onClick={refetch} variant="outline">重试</Button>
        </div>
      </Container>
    );
  }

  const articles = data?.data || [];

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-[#E5E2DE]">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-[#2C2C2C] hover:text-[#C9A89A] transition-colors">
                ← 返回
              </Link>
              <h1 className="text-xl font-serif font-bold text-[#2C2C2C]">
                文章管理
              </h1>
            </div>
            <Link href="/admin/articles/new">
              <Button>+ 新建文章</Button>
            </Link>
          </div>
        </Container>
      </header>

      {/* Content */}
      <Container className="py-8">
        {articles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-[#E5E2DE]">
            <p className="text-[#7A7670] mb-4">暂无文章</p>
            <Link href="/admin/articles/new">
              <Button>创建第一篇文章</Button>
            </Link>
          </div>
        ) : (
          <ArticlesTable articles={articles} onDelete={handleDelete} />
        )}
      </Container>
    </>
  );
}

export default function AdminArticlesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <ErrorBoundary>
        <ArticlesContent />
      </ErrorBoundary>
    </div>
  );
}

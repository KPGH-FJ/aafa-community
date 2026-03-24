'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  featured: boolean;
  publishedAt: string;
  author: {
    name: string;
  };
}

export default function AdminArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchArticles(token);
  }, [router]);

  const fetchArticles = async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const response = await fetch(`${apiUrl}/articles/admin/all?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setArticles(data.data);
      }
    } catch (error) {
      console.error('获取文章失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？')) return;

    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const response = await fetch(`${apiUrl}/articles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setArticles(articles.filter(a => a.id !== id));
      }
    } catch (error) {
      console.error('删除文章失败:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-[#7A7670]">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E2DE]">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-[#2C2C2C] hover:text-[#C9A89A]">
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
                <tr key={article.id} className="border-t border-[#E5E2DE]">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#2C2C2C]">{article.title}</div>
                    {article.featured && (
                      <span className="text-xs bg-[#C9A89A] text-white px-2 py-0.5 rounded">
                        精选
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#5C5852]">{article.category}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      article.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-700'
                        : article.status === 'DRAFT'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {article.status === 'PUBLISHED' ? '已发布' : 
                       article.status === 'DRAFT' ? '草稿' : '已归档'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#7A7670]">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/articles/edit/${article.id}`}
                      className="text-sm text-[#C9A89A] hover:underline mr-4"
                    >
                      编辑
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {articles.length === 0 && (
            <div className="text-center py-12 text-[#7A7670]">
              暂无文章
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

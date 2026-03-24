'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    articles: 0,
    events: 0,
    subscribers: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');

    if (!token || !userData) {
      router.push('/admin/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchStats(token);
    setLoading(false);
  }, [router]);

  const fetchStats = async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      
      const [articlesRes, eventsRes, subscribersRes] = await Promise.all([
        fetch(`${apiUrl}/articles?limit=1`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${apiUrl}/events?limit=1`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${apiUrl}/newsletter/subscribers?limit=1`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const articles = await articlesRes.json();
      const events = await eventsRes.json();
      const subscribers = await subscribersRes.json();

      setStats({
        articles: articles.meta?.total || 0,
        events: events.meta?.total || 0,
        subscribers: subscribers.meta?.total || 0,
      });
    } catch (error) {
      console.error('获取统计数据失败:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
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
              <h1 className="text-xl font-serif font-bold text-[#2C2C2C]">
                AAFA 管理后台
              </h1>
              <span className="text-sm text-[#7A7670]">
                欢迎, {user?.name || user?.email}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-[#5C5852] hover:text-[#C9A89A]"
              >
                返回网站
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                退出登录
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <Container className="py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-[#E5E2DE]">
            <div className="text-3xl font-bold text-[#2C2C2C]">{stats.articles}</div>
            <div className="text-sm text-[#7A7670] mt-1">文章总数</div>
            <Link
              href="/admin/articles"
              className="text-sm text-[#C9A89A] hover:underline mt-4 inline-block"
            >
              管理文章 →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5E2DE]">
            <div className="text-3xl font-bold text-[#2C2C2C]">{stats.events}</div>
            <div className="text-sm text-[#7A7670] mt-1">活动总数</div>
            <Link
              href="/admin/events"
              className="text-sm text-[#C9A89A] hover:underline mt-4 inline-block"
            >
              管理活动 →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5E2DE]">
            <div className="text-3xl font-bold text-[#2C2C2C]">{stats.subscribers}</div>
            <div className="text-sm text-[#7A7670] mt-1">订阅用户</div>
            <div className="text-sm text-[#A8A49D] mt-4">
              Newsletter 订阅数
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-[#E5E2DE] p-6">
          <h2 className="text-lg font-semibold text-[#2C2C2C] mb-4">
            快速操作
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/articles/new">
              <Button>+ 新建文章</Button>
            </Link>
            <Link href="/admin/events/new">
              <Button variant="outline">+ 新建活动</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  status: string;
  currentAttendees: number;
  maxAttendees: number | null;
  price: number;
}

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchEvents(token);
  }, [router]);

  const fetchEvents = async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const response = await fetch(`${apiUrl}/events?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error('获取活动失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个活动吗？')) return;

    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const response = await fetch(`${apiUrl}/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setEvents(events.filter(e => e.id !== id));
      }
    } catch (error) {
      console.error('删除活动失败:', error);
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
                活动管理
              </h1>
            </div>
            <Link href="/admin/events/new">
              <Button>+ 新建活动</Button>
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
                <th className="text-left px-6 py-4 text-sm font-medium text-[#5C5852]">活动名称</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[#5C5852]">日期</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[#5C5852]">地点</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[#5C5852]">报名</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[#5C5852]">状态</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-[#5C5852]">操作</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-t border-[#E5E2DE]">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#2C2C2C]">{event.title}</div>
                    <div className="text-sm text-[#7A7670]">
                      ¥{event.price}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#5C5852]">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#5C5852]">{event.location}</td>
                  <td className="px-6 py-4 text-sm text-[#5C5852]">
                    {event.currentAttendees}
                    {event.maxAttendees && ` / ${event.maxAttendees}`} 人
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      event.status === 'UPCOMING'
                        ? 'bg-green-100 text-green-700'
                        : event.status === 'ONGOING'
                        ? 'bg-blue-100 text-blue-700'
                        : event.status === 'PAST'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {event.status === 'UPCOMING' ? '即将开始' : 
                       event.status === 'ONGOING' ? '进行中' :
                       event.status === 'PAST' ? '已结束' : '已取消'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/events/edit/${event.id}`}
                      className="text-sm text-[#C9A89A] hover:underline mr-4"
                    >
                      编辑
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {events.length === 0 && (
            <div className="text-center py-12 text-[#7A7670]">
              暂无活动
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'past';
  maxAttendees?: number;
  currentAttendees: number;
  price: number;
}

interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  note: string;
}

export default function EventRegisterPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fetchError, setFetchError] = useState('');

  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    phone: '',
    note: '',
  });

  // 获取活动信息
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
        const response = await fetch(`${apiUrl}/events/${eventId}`);

        if (!response.ok) {
          setFetchError('活动不存在');
          return;
        }

        const data = await response.json();

        if (data.success && data.data) {
          const eventData: Event = data.data;
          
          // 检查活动是否已结束
          if (eventData.status === 'past') {
            setFetchError('该活动已结束');
            return;
          }

          // 检查是否已满员
          if (eventData.maxAttendees && eventData.currentAttendees >= eventData.maxAttendees) {
            setFetchError('该活动已满员');
            return;
          }

          setEvent(eventData);
        } else {
          setFetchError('活动不存在');
        }
      } catch (err) {
        console.error('获取活动失败:', err);
        setFetchError('网络错误，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const response = await fetch(`${apiUrl}/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          note: formData.note || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        toast.success('报名成功！确认邮件已发送至您的邮箱');
      } else {
        setError(data.error || '报名失败，请稍后重试');
        toast.error('报名失败: ' + (data.error || '请稍后重试'));
      }
    } catch (err) {
      console.error('报名失败:', err);
      setError('网络错误，请稍后重试');
      toast.error('报名失败: 网络错误，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <header className="bg-white border-b border-[#E5E2DE]">
          <Container className="py-4">
            <h1 className="text-xl font-serif font-bold text-[#2C2C2C]">活动报名</h1>
          </Container>
        </header>
        <Container className="py-12">
          <div className="text-center text-[#7A7670]">加载中...</div>
        </Container>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <header className="bg-white border-b border-[#E5E2DE]">
          <Container className="py-4">
            <h1 className="text-xl font-serif font-bold text-[#2C2C2C]">活动报名</h1>
          </Container>
        </header>
        <Container className="py-12">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center max-w-md mx-auto">
            {fetchError}
          </div>
          <div className="text-center mt-4">
            <Link href="/events" className="text-[#C9A89A] hover:underline">
              返回活动列表
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <header className="bg-white border-b border-[#E5E2DE]">
          <Container className="py-4">
            <h1 className="text-xl font-serif font-bold text-[#2C2C2C]">报名成功</h1>
          </Container>
        </header>
        <Container className="py-12">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl border border-[#E5E2DE] p-8 text-center">
              <div className="w-16 h-16 bg-[#B8C4A3] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-2">
                报名成功！
              </h2>
              <p className="text-[#7A7670] mb-4">
                感谢您对「{event?.title}」的关注，我们已收到您的报名信息。
              </p>
              <p className="text-sm text-[#A8A49D] mb-6">
                确认邮件已发送至 {formData.email}，请注意查收。
              </p>
              <div className="flex flex-col gap-2">
                <Link href={`/events/${eventId}`}>
                  <Button className="w-full">返回活动详情</Button>
                </Link>
                <Link href="/events">
                  <Button variant="outline" className="w-full">查看其他活动</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <header className="bg-white border-b border-[#E5E2DE]">
        <Container className="py-4">
          <div className="flex items-center gap-4">
            <Link href={`/events/${eventId}`} className="text-[#2C2C2C] hover:text-[#C9A89A]">
              ← 返回
            </Link>
            <h1 className="text-xl font-serif font-bold text-[#2C2C2C]">活动报名</h1>
          </div>
        </Container>
      </header>

      <Container className="py-8">
        <div className="max-w-2xl mx-auto">
          {/* Event Summary */}
          <div className="bg-white rounded-xl border border-[#E5E2DE] p-6 mb-6">
            <h2 className="text-lg font-semibold text-[#2C2C2C] mb-2">{event?.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-[#7A7670]">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#C9A89A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {event?.date}
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#C9A89A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {event?.time}
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#C9A89A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {event?.location}
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-xl border border-[#E5E2DE] p-6">
            <h2 className="text-lg font-semibold text-[#2C2C2C] mb-6">填写报名信息</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#5C5852] mb-2">
                  姓名 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] focus:ring-2 focus:ring-[#C9A89A]/20 outline-none"
                  placeholder="请输入您的姓名"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5C5852] mb-2">
                  邮箱 *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] focus:ring-2 focus:ring-[#C9A89A]/20 outline-none"
                  placeholder="请输入您的邮箱"
                />
                <p className="text-xs text-[#A8A49D] mt-1">
                  报名确认信息将发送至该邮箱
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5C5852] mb-2">
                  手机号 <span className="text-[#A8A49D]">(选填)</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] focus:ring-2 focus:ring-[#C9A89A]/20 outline-none"
                  placeholder="请输入您的手机号"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5C5852] mb-2">
                  备注 <span className="text-[#A8A49D]">(选填)</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] focus:ring-2 focus:ring-[#C9A89A]/20 outline-none"
                  placeholder="有什么想告诉我们的吗？"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  required
                  id="agreement"
                  className="w-4 h-4 mt-0.5 rounded border-[#E5E2DE] text-[#C9A89A] focus:ring-[#C9A89A]"
                />
                <label htmlFor="agreement" className="text-sm text-[#5C5852]">
                  我同意 AAFA 社区的活动参与条款，并确认提供的信息真实有效。
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={submitting} className="flex-1">
                  {submitting ? '提交中...' : '确认报名'}
                </Button>
                <Link href={`/events/${eventId}`}>
                  <Button variant="outline" type="button">
                    取消
                  </Button>
                </Link>
              </div>

              {event && event.price > 0 && (
                <p className="text-sm text-[#A8A49D] text-center">
                  本活动收费 ¥{event.price}，报名后请留意邮件中的支付信息
                </p>
              )}
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

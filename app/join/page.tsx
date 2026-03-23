'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { newsletterApi } from '@/lib/api';

export const metadata = {
  title: '加入社区 - AAFA',
  description: '加入AAFA社区，与我们一起构建最真实的AI世界。',
};

export default function JoinPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await newsletterApi.subscribe(email, name);
      setStatus('success');
      setMessage('订阅成功！感谢您的关注。');
      setEmail('');
      setName('');
    } catch (error) {
      setStatus('error');
      setMessage('订阅失败，请稍后重试或直接联系我们。');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-[#E5E2DE]">
        <Container className="py-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2C2C] mb-4">
            加入 AAFA 社区
          </h1>
          <p className="text-lg text-[#7A7670]">
            与 1,560+ 成员一起，构建最真实的AI世界
          </p>
        </Container>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-[#FAFAF8]">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E8DED4] text-[#C9A89A] flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2">最新资讯</h3>
              <p className="text-sm text-[#7A7670]">
                第一时间获取AI领域真实、有价值的资讯和观点
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E8DED4] text-[#C9A89A] flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2">线下活动</h3>
              <p className="text-sm text-[#7A7670]">
                参加最酷炫最好玩的AI主题活动，结识有趣的人
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E8DED4] text-[#C9A89A] flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2">独家内容</h3>
              <p className="text-sm text-[#7A7670]">
                获取会员专属的深度内容和产品评测报告
              </p>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="max-w-xl mx-auto">
            <div className="bg-white p-8 rounded-2xl border border-[#E5E2DE]">
              <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-4 text-center">
                订阅 Newsletter
              </h2>
              <p className="text-[#7A7670] text-center mb-6">
                每周一封，精选AI世界最有价值的信息。无垃圾邮件，随时退订。
              </p>
              
              {status === 'success' ? (
                <div className="p-4 bg-[#B8C4A3] bg-opacity-20 rounded-lg text-center">
                  <p className="text-[#2C2C2C] font-medium">{message}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#5C5852] mb-2">
                      邮箱地址
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] focus:ring-2 focus:ring-[#C9A89A]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#5C5852] mb-2">
                      称呼（可选）
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="怎么称呼你？"
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] focus:ring-2 focus:ring-[#C9A89A]/20 outline-none transition-all"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={status === 'loading'}>
                    {status === 'loading' ? '订阅中...' : '立即订阅'}
                  </Button>
                  {status === 'error' && (
                    <p className="text-sm text-red-500 text-center">{message}</p>
                  )}
                </form>
              )}
              
              <p className="text-xs text-[#A8A49D] text-center mt-4">
                订阅即表示你同意接收我们的邮件。我们尊重你的隐私。
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

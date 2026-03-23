'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-[#E8DED4] rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-[#B8C4A3] rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#E8DED4] text-[#4A4A4A] text-sm mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-[#B8C4A3] mr-2 animate-pulse" />
            AAFA 社区 · 为了AGI的降临
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-[#2C2C2C] leading-tight mb-6 animate-fade-in-up delay-100">
            构建最真实的
            <br />
            <span className="text-[#C9A89A]">AI世界</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#5C5852] mb-4 max-w-2xl mx-auto animate-fade-in-up delay-200">
            让所有人都能享受AI创造的真实价值
          </p>
          <p className="text-base text-[#7A7670] mb-10 max-w-xl mx-auto animate-fade-in-up delay-300">
            我们关注AI的真实与虚假，巨头的狂热与普通人的焦虑。
            <br className="hidden md:block" />
            帮你看清真相，从容面对AGI时代。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-400">
            <Button href="/articles" size="lg">
              探索内容
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button href="/events" variant="outline" size="lg">
              参加活动
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-[#E5E2DE]">
            <p className="text-sm text-[#A8A49D] mb-6">我们提供</p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-[#5C5852]">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#B8C4A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                最前沿的AI资讯
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#C9A89A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                最犀利的AI观点
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#9BA4AD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                最好用的产品推荐
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#C9A89A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                最差产品避雷
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#B8C4A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                最酷线下活动
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: '加入社区 - AAFA',
  description: '加入AAFA社区，与我们一起构建最真实的AI世界。',
};

export default function JoinPage() {
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
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#5C5852] mb-2">
                    邮箱地址
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
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
                    placeholder="怎么称呼你？"
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E2DE] focus:border-[#C9A89A] focus:ring-2 focus:ring-[#C9A89A]/20 outline-none transition-all"
                  />
                </div>
                <Button type="submit" className="w-full">
                  立即订阅
                </Button>
              </form>
              
              <p className="text-xs text-[#A8A49D] text-center mt-4">
                订阅即表示你同意接收我们的邮件。我们尊重你的隐私。
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-4">
              其他方式联系我们
            </h2>
            <p className="text-[#7A7670] mb-8">
              有任何问题或建议？欢迎通过以下方式联系我们
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-3 bg-[#F0EEEB] rounded-full text-[#5C5852] hover:bg-[#E8DED4] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z"/>
                </svg>
                公众号
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-3 bg-[#F0EEEB] rounded-full text-[#5C5852] hover:bg-[#E8DED4] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
                Telegram
              </a>
              <a
                href="mailto:hello@aafa.org"
                className="flex items-center gap-2 px-6 py-3 bg-[#F0EEEB] rounded-full text-[#5C5852] hover:bg-[#E8DED4] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@aafa.org
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

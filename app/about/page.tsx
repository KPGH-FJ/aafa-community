import { Container } from '@/components/ui/Container';

export const metadata = {
  title: '关于我们 - AAFA',
  description: '了解AAFA社区的故事、愿景和团队。为了AGI的降临，构建最真实的AI世界。',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-[#E5E2DE]">
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2C2C] mb-6">
              关于 AAFA
            </h1>
            <p className="text-xl text-[#7A7670] leading-relaxed">
              我们是一个帮普通人看清AI真相，了解真实的AI世界、用好AI工具的社区。
            </p>
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section className="section-padding bg-[#FAFAF8]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-6">
              我们的愿景
            </h2>
            <div className="p-8 bg-[#E8DED4] rounded-2xl">
              <p className="text-2xl md:text-3xl font-serif text-[#2C2C2C] leading-relaxed">
                "为了AGI的降临，构建最真实的AI世界。"
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-6">
              我们的目标
            </h2>
            <p className="text-lg text-[#5C5852] leading-relaxed mb-8">
              让所有人都能享受AI创造的真实价值，与所有人一起期待AGI的降临。
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 bg-[#F9F8F6] rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-[#B8C4A3] text-white flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2">反泡沫</h3>
                <p className="text-sm text-[#7A7670]">
                  在信息过载时代，我们只做AI世界的"质检员"——去伪存真，降低你的决策成本。
                </p>
              </div>
              <div className="p-6 bg-[#F9F8F6] rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-[#C9A89A] text-white flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2">人本视角</h3>
                <p className="text-sm text-[#7A7670]">
                  不谈技术参数，只谈技术如何服务于人（生活、工作、创造力）。
                </p>
              </div>
              <div className="p-6 bg-[#F9F8F6] rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-[#9BA4AD] text-white flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2">公共性</h3>
                <p className="text-sm text-[#7A7670]">
                  AI不是程序员的私产，我们创造普通人接触AI的公共场景（活动、对话、共建）。
                </p>
              </div>
              <div className="p-6 bg-[#F9F8F6] rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-[#C9A89A] text-white flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2">长期主义</h3>
                <p className="text-sm text-[#7A7670]">
                  建立信任机制，拒绝割韭菜课程和虚假承诺，陪伴你从容面对AGI时代。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Brand Personality */}
      <section className="section-padding bg-[#F0EEEB]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-6">
              我们是谁
            </h2>
            <div className="p-8 bg-white rounded-2xl">
              <p className="text-lg text-[#5C5852] leading-relaxed mb-6">
                我们是那个<strong>懂很多但从不炫耀</strong>的朋友，会用段子讲透复杂问题，还总拉你一起搞点"反主流"的有趣实验。
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="p-4">
                  <div className="text-2xl mb-2">🤔</div>
                  <div className="font-medium text-[#2C2C2C]">思考者</div>
                  <div className="text-sm text-[#7A7670]">不论年龄性别，保持独立思考</div>
                </div>
                <div className="p-4">
                  <div className="text-2xl mb-2">🤗</div>
                  <div className="font-medium text-[#2C2C2C]">亲和的看护者</div>
                  <div className="text-sm text-[#7A7670]">不居高临下，陪伴式成长</div>
                </div>
                <div className="p-4">
                  <div className="text-2xl mb-2">😎</div>
                  <div className="font-medium text-[#2C2C2C]">活泼有趣+叛逆</div>
                  <div className="text-sm text-[#7A7670]">用轻松方式对抗严肃霸权</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Join CTA */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-[#2C2C2C] mb-4">
              加入我们
            </h2>
            <p className="text-lg text-[#7A7670] mb-8">
              如果你也相信AI应该属于所有人，欢迎加入我们，一起构建最真实的AI世界。
            </p>
            <a
              href="/join"
              className="inline-flex items-center px-8 py-4 text-base font-medium text-white bg-[#C9A89A] rounded-full hover:bg-[#B89789] transition-colors"
            >
              成为社区成员
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}

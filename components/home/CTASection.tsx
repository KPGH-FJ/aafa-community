import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function CTASection() {
  return (
    <section className="section-padding bg-[#2C2C2C] text-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            与所有人一起
            <br />
            <span className="text-[#C9A89A]">期待AGI的降临</span>
          </h2>
          <p className="text-lg text-[#A8A49D] mb-8">
            加入AAFA社区，获取最新的AI资讯、活动邀请和独家内容。
            <br />
            让我们一起构建最真实的AI世界。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/join" size="lg" className="w-full sm:w-auto">
              立即加入
            </Button>
            <Button href="/articles" variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
              先逛逛内容
            </Button>
          </div>

          <p className="mt-6 text-sm text-[#7A7670]">
            已有 1,560+ 成员加入 · 每周更新 · 随时退订
          </p>
        </div>
      </Container>
    </section>
  );
}

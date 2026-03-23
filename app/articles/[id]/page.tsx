import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);
  
  if (!article) {
    return {
      title: '文章未找到 - AAFA',
    };
  }
  
  return {
    title: `${article.title} - AAFA`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);
  
  if (!article) {
    notFound();
  }
  
  return (
    <article className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E2DE]">
        <Container className="py-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Tag variant="accent">{article.category}</Tag>
              <span className="text-sm text-[#A8A49D]">{article.readTime} 分钟阅读</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2C2C] mb-6">
              {article.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#E8DED4]" />
                <div>
                  <div className="font-medium text-[#2C2C2C]">{article.author.name}</div>
                  <div className="text-sm text-[#A8A49D]">{article.publishedAt}</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Cover Image */}
      <div className="bg-[#F0EEEB]">
        <Container className="py-8">
          <div className="max-w-3xl mx-auto">
            <div className="aspect-video bg-[#E5E2DE] rounded-2xl flex items-center justify-center">
              <svg className="w-20 h-20 text-[#A8A49D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </Container>
      </div>

      {/* Content */}
      <div className="section-padding bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-[#5C5852] leading-relaxed mb-8">
                {article.excerpt}
              </p>
              
              <div className="p-6 bg-[#F9F8F6] rounded-xl border-l-4 border-[#C9A89A] mb-8">
                <p className="text-[#5C5852] italic m-0">
                  文章内容正在建设中，敬请期待...
                </p>
              </div>
              
              <p className="text-[#5C5852] leading-relaxed">
                这里是文章的详细内容。在实际项目中，这里会显示完整的文章内容。
                目前这是一个示例页面，展示文章详情页的布局和样式。
              </p>
              
              <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mt-8 mb-4">
                为什么写这篇文章
              </h2>
              <p className="text-[#5C5852] leading-relaxed">
                在AI信息爆炸的时代，我们希望通过真实、客观的测评，
                帮助普通用户识别AI产品的真实价值，避免被营销话术误导。
              </p>
              
              <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mt-8 mb-4">
                核心发现
              </h2>
              <ul className="space-y-2 text-[#5C5852]">
                <li>真实的使用体验往往与官方宣传存在差距</li>
                <li>不同用户群体的需求差异很大</li>
                <li>持续学习和适应是提升效率的关键</li>
              </ul>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-[#E5E2DE]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-[#7A7670]">标签：</span>
                {article.tags.map((tag) => (
                  <Tag key={tag} href={`/articles?tag=${tag}`}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>

            {/* Author */}
            <div className="mt-8 p-6 bg-[#F9F8F6] rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#E8DED4] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#2C2C2C] mb-1">{article.author.name}</h3>
                  <p className="text-sm text-[#7A7670]">
                    AAFA社区成员，关注AI工具的真实价值与实际应用。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </article>
  );
}

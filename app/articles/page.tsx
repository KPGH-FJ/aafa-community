import { articlesApi } from '@/lib/api';
import { articles as mockArticles, categories } from '@/data/articles';
import { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Container } from '@/components/ui/Container';

export const metadata = {
  title: '内容中心 - AAFA',
  description: '去伪存真，为你筛选AI世界最有价值的信息。精选AI真相揭秘、工具实操、人文思考等内容。',
};

// 获取文章数据（服务端）
async function getArticles() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'}/articles`, {
      next: { revalidate: 60 }, // 每60秒重新验证
    });
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data.articles || mockArticles; // 如果API失败，使用mock数据
  } catch (error) {
    console.log('Using mock data:', error);
    return mockArticles;
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-[#E5E2DE]">
        <Container className="py-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2C2C] mb-4">
            内容中心
          </h1>
          <p className="text-lg text-[#7A7670] max-w-2xl">
            去伪存真，为你筛选AI世界最有价值的信息
          </p>
        </Container>
      </section>

      {/* Filters */}
      <section className="bg-[#FAFAF8] border-b border-[#E5E2DE]">
        <Container className="py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#7A7670] mr-2">分类：</span>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  category === '全部'
                    ? 'bg-[#C9A89A] text-white'
                    : 'bg-white text-[#5C5852] hover:bg-[#E8DED4]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-[#FAFAF8]">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: any) => (
              <Card key={article.id} href={`/articles/${article.id}`} className="h-full">
                <CardImage src={article.coverImage || ''} alt={article.title} aspectRatio="video" />
                <CardContent className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag variant={article.featured ? 'accent' : 'default'}>
                      {article.category?.name || '文章'}
                    </Tag>
                    <span className="text-xs text-[#A8A49D]">{article.readTime || 5} 分钟</span>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.excerpt}</CardDescription>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#E8DED4]" />
                    <span className="text-sm text-[#5C5852]">{article.author?.name || 'AAFA'}</span>
                  </div>
                  <span className="text-xs text-[#A8A49D]">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

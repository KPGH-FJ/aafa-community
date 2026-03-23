import Link from 'next/link';
import { articles } from '@/data/articles';
import { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Container } from '@/components/ui/Container';

export function FeaturedArticles() {
  const featuredArticles = articles.filter(a => a.featured).slice(0, 2);
  const recentArticles = articles.filter(a => !a.featured).slice(0, 4);

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionTitle
          title="精选内容"
          subtitle="去伪存真，为你筛选AI世界最有价值的信息"
        />

        {/* Featured Articles - Large Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredArticles.map((article) => (
            <Card key={article.id} href={`/articles/${article.id}`} className="h-full">
              <CardImage src={article.coverImage} alt={article.title} aspectRatio="video" />
              <CardContent className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Tag variant="accent">{article.category}</Tag>
                  <span className="text-xs text-[#A8A49D]">{article.readTime} 分钟阅读</span>
                </div>
                <CardTitle className="text-xl">{article.title}</CardTitle>
                <CardDescription>{article.excerpt}</CardDescription>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#E8DED4]" />
                  <span className="text-sm text-[#5C5852]">{article.author.name}</span>
                </div>
                <span className="text-xs text-[#A8A49D]">{article.publishedAt}</span>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Recent Articles - Smaller Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {recentArticles.map((article) => (
            <Card key={article.id} href={`/articles/${article.id}`} className="h-full">
              <CardImage src={article.coverImage} alt={article.title} aspectRatio="video" />
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <Tag>{article.category}</Tag>
                </div>
                <CardTitle className="text-base">{article.title}</CardTitle>
                <CardDescription className="text-xs">{article.excerpt}</CardDescription>
              </CardContent>
              <CardFooter>
                <span className="text-xs text-[#A8A49D]">{article.readTime} 分钟</span>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/articles"
            className="inline-flex items-center text-[#C9A89A] hover:text-[#B89789] font-medium transition-colors"
          >
            查看全部内容
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}

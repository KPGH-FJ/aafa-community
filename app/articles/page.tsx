'use client';

import { useState, useEffect } from 'react';
import { articles as mockArticles, categories } from '@/data/articles';
import { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Container } from '@/components/ui/Container';

export default function ArticlesPage() {
  const [articles, setArticles] = useState(mockArticles);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从 API 获取文章
    const fetchArticles = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
        const response = await fetch(`${apiUrl}/articles`);
        if (response.ok) {
          const data = await response.json();
          setArticles(data.data || mockArticles);
        }
      } catch (error) {
        console.log('Using mock data');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // 筛选文章
  const filteredArticles = activeCategory === '全部' 
    ? articles 
    : articles.filter((article: any) => article.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-[#7A7670]">加载中...</div>
      </div>
    );
  }

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
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  category === activeCategory
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
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 text-[#7A7670]">
              该分类下暂无文章
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article: any) => (
                <Card key={article.id} href={`/articles/${article.id}`} className="h-full">
                  <CardImage src={article.coverImage || ''} alt={article.title} aspectRatio="video" />
                  <CardContent className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag variant={article.featured ? 'accent' : 'default'}>
                        {article.category}
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
          )}
        </Container>
      </section>
    </div>
  );
}

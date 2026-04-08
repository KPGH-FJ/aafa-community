'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { articles as mockArticles, categories } from '@/data/articles';
import { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Container } from '@/components/ui/Container';
import { Pagination } from '@/components/ui/Pagination';
import type { Article } from '@/types';

interface ArticlesResponse {
  data: Article[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function ArticlesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 从 URL 获取分页参数
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const categoryFromUrl = searchParams.get('category') || '全部';
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [pageSize, setPageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // 获取文章数据
  const fetchArticles = async (page: number, category: string, limit: number) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      let url = `${apiUrl}/articles?page=${page}&limit=${limit}`;
      
      // 添加分类筛选参数
      if (category !== '全部') {
        url += `&category=${encodeURIComponent(category)}`;
      }
      
      const response = await fetch(url);
      
      if (response.ok) {
        const data: ArticlesResponse = await response.json();
        setArticles(data.data || []);
        setTotalPages(data.meta?.totalPages || 1);
        setTotalItems(data.meta?.total || 0);
      } else {
        // API 失败时使用 mock 数据并手动分页
        let filtered = mockArticles;
        if (category !== '全部') {
          filtered = mockArticles.filter((a: any) => a.category === category);
        }
        
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginated = filtered.slice(start, end);
        
        setArticles(paginated);
        setTotalPages(Math.ceil(filtered.length / limit));
        setTotalItems(filtered.length);
      }
    } catch (error) {
      console.log('Using mock data');
      let filtered = mockArticles;
      if (category !== '全部') {
        filtered = mockArticles.filter((a: any) => a.category === category);
      }
      
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      setArticles(filtered.slice(start, end));
      setTotalPages(Math.ceil(filtered.length / pageSize));
      setTotalItems(filtered.length);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载和参数变化时重新获取数据
  useEffect(() => {
    fetchArticles(currentPage, activeCategory, pageSize);
  }, [currentPage, activeCategory, pageSize]);

  // 处理分类切换
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    
    // 更新 URL
    const params = new URLSearchParams();
    if (category !== '全部') {
      params.set('category', category);
    }
    params.set('page', '1');
    router.push(`/articles?${params.toString()}`, { scroll: false });
  };

  // 处理页码切换
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // 更新 URL
    const params = new URLSearchParams();
    if (activeCategory !== '全部') {
      params.set('category', activeCategory);
    }
    params.set('page', page.toString());
    router.push(`/articles?${params.toString()}`, { scroll: false });
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 处理每页数量变化
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

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
                onClick={() => handleCategoryChange(category)}
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
          {articles.length === 0 ? (
            <div className="text-center py-12 text-[#7A7670]">
              该分类下暂无文章
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
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
                        {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''}
                      </span>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </>
          )}
        </Container>
      </section>
    </div>
  );
}

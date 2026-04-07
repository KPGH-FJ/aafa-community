'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ArticleData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  readTime: number;
  featured: boolean;
  status: string;
  createdAt?: string;
  author?: string;
}

interface EventData {
  id?: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  time: string;
  location: string;
  maxAttendees?: number;
  currentAttendees: number;
  price: number;
  tags: string[];
  status: string;
}

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const isDraft = searchParams.get('draft') === 'true';

  const [data, setData] = useState<ArticleData | EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!type || !['article', 'event'].includes(type)) {
      setError('无效的预览类型');
      setLoading(false);
      return;
    }

    if (isDraft) {
      // 从 localStorage 读取草稿
      const draftKey = type === 'article' 
        ? (id ? `article-draft-${id}` : 'article-draft-new')
        : `event-draft-${id || 'new'}`;
      
      const draftData = localStorage.getItem(draftKey);
      if (draftData) {
        try {
          const parsed = JSON.parse(draftData);
          setData(parsed);
        } catch (e) {
          setError('草稿数据解析失败');
        }
      } else {
        setError('未找到草稿数据');
      }
      setLoading(false);
    } else if (id) {
      // 从 API 获取已发布数据
      fetchData();
    } else {
      setError('缺少必要参数');
      setLoading(false);
    }
  }, [type, id, isDraft]);

  const fetchData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const endpoint = type === 'article' ? `articles/${id}` : `events/${id}`;
      const response = await fetch(`${apiUrl}/${endpoint}`);
      
      if (!response.ok) {
        setError('获取数据失败');
        setLoading(false);
        return;
      }

      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || '获取数据失败');
      }
    } catch (err) {
      setError('网络错误');
    } finally {
      setLoading(false);
    }
  };

  const getBackUrl = () => {
    if (isDraft) {
      if (type === 'article') {
        return id ? `/admin/articles/edit/${id}` : '/admin/articles/new';
      } else {
        return id ? `/admin/events/edit/${id}` : '/admin/events/new';
      }
    }
    return type === 'article' ? '/admin/articles' : '/admin/events';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-[#7A7670]">加载中...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <header className="bg-white border-b border-[#E5E2DE]">
          <Container className="py-4">
            <div className="flex items-center gap-4">
              <Link href={getBackUrl()} className="text-[#2C2C2C] hover:text-[#C9A89A]">
                ← 返回
              </Link>
              <h1 className="text-xl font-serif font-bold text-[#2C2C2C]">预览</h1>
            </div>
          </Container>
        </header>
        <Container className="py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#2C2C2C] mb-2">{error || '加载失败'}</h2>
            <Link href={getBackUrl()}>
              <Button className="mt-4">返回编辑</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const isArticle = type === 'article';
  const articleData = data as ArticleData;
  const eventData = data as EventData;

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E2DE] sticky top-0 z-50">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={getBackUrl()} className="text-[#2C2C2C] hover:text-[#C9A89A]">
                ← 返回编辑
              </Link>
              <h1 className="text-xl font-serif font-bold text-[#2C2C2C]">
                {isDraft ? '草稿预览' : '内容预览'}
              </h1>
            </div>
            {isDraft && (
              <Badge variant="warning">草稿模式</Badge>
            )}
          </div>
        </Container>
      </header>

      {/* Preview Content */}
      {isArticle ? (
        <ArticlePreview article={articleData} />
      ) : (
        <EventPreview event={eventData} />
      )}
    </div>
  );
}

function ArticlePreview({ article }: { article: ArticleData }) {
  return (
    <article className="py-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge variant="default">{article.category}</Badge>
            {article.featured && <Badge variant="success">精选</Badge>}
            {article.tags?.map((tag) => (
              <span
                key={tag}
                className="text-sm text-[#7A7670]">
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2C2C] mb-4">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-[#7A7670] mb-8 pb-8 border-b border-[#E5E2DE]">
            <span>{article.author || 'AAFA团队'}</span>
            <span>•</span>
            <span>{article.readTime} 分钟阅读</span>
            {article.createdAt && (
              <>
                <span>•</span>
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </>
            )}
          </div>

          {/* Cover Image */}
          {article.coverImage && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          <p className="text-lg text-[#7A7670] mb-8 italic border-l-4 border-[#C9A89A] pl-4">
            {article.excerpt}
          </p>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-[#2C2C2C] prose-p:text-[#5C5852] prose-a:text-[#C9A89A]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </Container>
    </article>
  );
}

function EventPreview({ event }: { event: EventData }) {
  const isPast = event.status === 'PAST' || event.status === 'past';
  const isFull = Boolean(event.maxAttendees && event.currentAttendees >= event.maxAttendees);

  return (
    <div className="pb-12">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E2DE] py-12">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={event.price === 0 ? 'success' : 'default'}>
                {event.price === 0 ? '免费' : `¥${event.price}`}
              </Badge>
              <Badge variant={isPast ? 'default' : 'info'}>
                {isPast ? '已结束' : '即将开始'}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2C2C] mb-4">
              {event.title}
            </h1>
            <p className="text-lg text-[#7A7670]">{event.description}</p>
          </div>
        </Container>
      </header>

      {/* Cover Image */}
      <div className="bg-[#F0EEEB]">
        <Container className="py-8">
          <div className="max-w-3xl mx-auto">
            {event.coverImage ? (
              <div className="aspect-video rounded-2xl overflow-hidden">
                <img
                  src={event.coverImage}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video bg-[#E5E2DE] rounded-2xl flex items-center justify-center">
                <svg className="w-20 h-20 text-[#A8A49D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Event Details */}
      <div className="section-padding bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Info Card */}
              <div className="p-6 bg-[#F9F8F6] rounded-xl">
                <h2 className="text-lg font-semibold text-[#2C2C2C] mb-4">活动信息</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-[#C9A89A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="text-sm text-[#7A7670]">日期</div>
                      <div className="font-medium text-[#2C2C2C]">{event.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-[#C9A89A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="text-sm text-[#7A7670]">时间</div>
                      <div className="font-medium text-[#2C2C2C]">{event.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-[#C9A89A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="text-sm text-[#7A7670]">地点</div>
                      <div className="font-medium text-[#2C2C2C]">{event.location}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Card */}
              <div className="p-6 bg-[#E8DED4] rounded-xl">
                <h2 className="text-lg font-semibold text-[#2C2C2C] mb-4">报名情况</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#7A7670]">已报名</span>
                      <span className="font-medium text-[#2C2C2C]">
                        {event.currentAttendees}
                        {event.maxAttendees && ` / ${event.maxAttendees}`} 人
                      </span>
                    </div>
                    {event.maxAttendees && (
                      <div className="w-full bg-[#D4C5B9] rounded-full h-2">
                        <div
                          className="bg-[#C9A89A] h-2 rounded-full"
                          style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {!isPast && (
                    <div className="pt-4 border-t border-[#D4C5B9]">
                      <Button
                        disabled={isFull}
                        className="w-full"
                      >
                        {isFull ? '已满员' : '立即报名'}
                      </Button>
                      <p className="text-xs text-[#7A7670] text-center mt-2">
                        {event.price === 0 ? '免费活动' : `票价：¥${event.price}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-[#E5E2DE]">
              <div className="flex flex-wrap items-center gap-2">
                {event.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-[#F0EEEB] text-[#5C5852]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-[#7A7670]">加载中...</div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}

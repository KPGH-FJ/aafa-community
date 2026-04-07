import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Event {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'past';
  maxAttendees?: number;
  currentAttendees: number;
  price: number;
  tags: string[];
}

interface Props {
  params: Promise<{ id: string }>;
}

async function getEvent(id: string): Promise<Event | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    const response = await fetch(`${apiUrl}/events/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('获取活动失败:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    return {
      title: '活动未找到 - AAFA',
    };
  }

  return {
    title: `${event.title} - AAFA`,
    description: event.description,
  };
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const isPast = event.status === 'past';
  const isFull = Boolean(event.maxAttendees && event.currentAttendees >= event.maxAttendees);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E2DE]">
        <Container className="py-12">
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
                      <Link href={`/events/${event.id}/register`}>
                        <Button
                          disabled={isFull}
                          className="w-full"
                        >
                          {isFull ? '已满员' : '立即报名'}
                        </Button>
                      </Link>
                      <p className="text-xs text-[#7A7670] text-center mt-2">
                        {event.price === 0 ? '免费活动' : `票价：¥${event.price}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-4">
                活动详情
              </h2>
              <p className="text-[#5C5852] leading-relaxed">
                {event.description}
              </p>
              <p className="text-[#5C5852] leading-relaxed mt-4">
                这是一场属于普通人的AI聚会。我们相信，AI不应该只是技术专家的私产，
                每个人都应该有权利了解、讨论和使用AI。在这里，没有高高在上的演讲，
                只有平等的交流和真诚的分享。
              </p>

              <h3 className="text-xl font-semibold text-[#2C2C2C] mt-8 mb-4">
                你会获得什么
              </h3>
              <ul className="space-y-2 text-[#5C5852]">
                <li>与志同道合的朋友交流AI心得</li>
                <li>了解AI产品的真实使用体验</li>
                <li>拓展你的人脉圈</li>
                <li>收获AAFA社区独家资料</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#2C2C2C] mt-8 mb-4">
                适合谁参加
              </h3>
              <ul className="space-y-2 text-[#5C5852]">
                <li>对AI感兴趣但不知从何入手的普通人</li>
                <li>正在使用AI工具想交流经验的朋友</li>
                <li>对AI行业有独特见解的思考者</li>
                <li>想认识更多AI爱好者的小伙伴</li>
              </ul>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-[#E5E2DE]">
              <div className="flex flex-wrap items-center gap-2">
                {event.tags && event.tags.map((tag) => (
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

import Link from 'next/link';
import { getUpcomingEvents } from '@/data/events';
import { Card, CardImage, CardContent, CardTitle } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';

export function UpcomingEvents() {
  const upcomingEvents = getUpcomingEvents().slice(0, 3);

  return (
    <section className="section-padding bg-[#F0EEEB]">
      <Container>
        <SectionTitle
          title="即将开始的活动"
          subtitle="真实的连接，有趣的灵魂，期待与你相遇"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} href={`/events/${event.id}`} className="h-full flex flex-col">
              <CardImage src={event.coverImage} alt={event.title} aspectRatio="video" />
              <CardContent className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={event.price === 0 ? 'success' : 'default'}>
                    {event.price === 0 ? '免费' : `¥${event.price}`}
                  </Badge>
                  {event.status === 'upcoming' && (
                    <Badge variant="info">即将开始</Badge>
                  )}
                </div>
                
                <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                
                <p className="text-sm text-[#7A7670] mb-4 line-clamp-2 flex-1">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-[#5C5852]">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#C9A89A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#C9A89A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#C9A89A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#E5E2DE]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-[#B8C4A3]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      <span className="text-sm text-[#5C5852]">
                        {event.currentAttendees}
                        {event.maxAttendees && ` / ${event.maxAttendees}`} 人已报名
                      </span>
                    </div>
                    {event.maxAttendees && event.currentAttendees >= event.maxAttendees && (
                      <Badge variant="warning">已满员</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/events"
            className="inline-flex items-center text-[#C9A89A] hover:text-[#B89789] font-medium transition-colors"
          >
            查看全部活动
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}

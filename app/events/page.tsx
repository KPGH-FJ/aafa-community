import { getUpcomingEvents, getPastEvents } from '@/data/events';
import { Card, CardImage, CardContent, CardTitle } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: '活动中心 - AAFA',
  description: '最酷炫最好玩的AI线下活动。真实的连接，有趣的灵魂，期待与你相遇。',
};

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-[#E5E2DE]">
        <Container className="py-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2C2C2C] mb-4">
            活动中心
          </h1>
          <p className="text-lg text-[#7A7670] max-w-2xl">
            真实的连接，有趣的灵魂，期待与你相遇
          </p>
        </Container>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding bg-white">
        <Container>
          <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-8">
            即将开始
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} href={`/events/${event.id}`} className="h-full flex flex-col">
                <CardImage src={event.coverImage} alt={event.title} aspectRatio="video" />
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={event.price === 0 ? 'success' : 'default'}>
                      {event.price === 0 ? '免费' : `¥${event.price}`}
                    </Badge>
                    <Badge variant="info">即将开始</Badge>
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Past Events */}
      <section className="section-padding bg-[#F0EEEB]">
        <Container>
          <h2 className="text-2xl font-serif font-bold text-[#2C2C2C] mb-8">
            往期活动
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <Card key={event.id} href={`/events/${event.id}`} className="h-full flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <CardImage src={event.coverImage} alt={event.title} aspectRatio="video" className="md:aspect-auto md:h-full" />
                </div>
                <CardContent className="flex-1 flex flex-col justify-center">
                  <Badge variant="default" className="w-fit mb-2">已结束</Badge>
                  <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                  <p className="text-sm text-[#7A7670] mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex items-center text-sm text-[#5C5852]">
                    <svg className="w-4 h-4 mr-2 text-[#C9A89A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

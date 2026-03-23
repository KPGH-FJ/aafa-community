import { HeroSection } from '@/components/home/HeroSection';
import { WhatWeCare } from '@/components/home/WhatWeCare';
import { FeaturedArticles } from '@/components/home/FeaturedArticles';
import { UpcomingEvents } from '@/components/home/UpcomingEvents';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatWeCare />
      <FeaturedArticles />
      <UpcomingEvents />
      <CTASection />
    </>
  );
}

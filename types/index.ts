// 文章类型
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  readTime: number;
  featured?: boolean;
}

// 作者类型
export interface Author {
  name: string;
  avatar: string;
  bio?: string;
}

// 活动类型
export interface Event {
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

// 导航项
export interface NavItem {
  label: string;
  href: string;
}

// 统计数据
export interface Stats {
  articles: number;
  events: number;
  members: number;
  views: number;
}

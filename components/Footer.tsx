import Link from 'next/link';
import { stats } from '@/data/nav';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    探索: [
      { label: '内容中心', href: '/articles' },
      { label: '活动中心', href: '/events' },
      { label: '产品推荐', href: '/tools' },
    ],
    关于: [
      { label: '关于我们', href: '/about' },
      { label: '加入社区', href: '/join' },
      { label: '联系我们', href: '/contact' },
    ],
    关注: [
      { label: '公众号', href: '#' },
      { label: '即刻', href: '#' },
      { label: '小宇宙', href: '#' },
    ],
  };

  return (
    <footer className="bg-[#2C2C2C] text-white">
      {/* Stats Section */}
      <div className="border-b border-[#3D3A36]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-[#C9A89A]">{stats.articles}+</div>
              <div className="text-sm text-[#A8A49D] mt-1">原创文章</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-[#C9A89A]">{stats.events}+</div>
              <div className="text-sm text-[#A8A49D] mt-1">线下活动</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-[#C9A89A]">{stats.members}+</div>
              <div className="text-sm text-[#A8A49D] mt-1">社区成员</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-[#C9A89A]">{stats.views}+</div>
              <div className="text-sm text-[#A8A49D] mt-1">内容阅读</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-serif font-bold">AAFA</span>
            </Link>
            <p className="text-sm text-[#A8A49D] mb-4">
              为了AGI的降临，<br />构建最真实的AI世界。
            </p>
            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">订阅 Newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 text-sm bg-[#3D3A36] border border-[#4A4A4A] rounded-l-lg focus:outline-none focus:border-[#C9A89A] text-white placeholder-[#7A7670]"
                />
                <button className="px-4 py-2 text-sm font-medium bg-[#C9A89A] text-white rounded-r-lg hover:bg-[#B89789] transition-colors">
                  订阅
                </button>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-[#E5E2DE] mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#A8A49D] hover:text-[#C9A89A] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#3D3A36] flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-[#7A7670]">
            © {currentYear} AAFA. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-[#7A7670] hover:text-[#C9A89A]">
              隐私政策
            </Link>
            <Link href="/terms" className="text-sm text-[#7A7670] hover:text-[#C9A89A]">
              使用条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 注释掉静态导出，让Vercel使用默认的服务端渲染
  // output: 'export',
  // distDir: 'dist',
  
  // 图片优化（Vercel支持）
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // 其他配置
  trailingSlash: true,
  
  // 添加 CSP 配置，允许 eval（某些依赖需要）
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self'; connect-src 'self' https:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

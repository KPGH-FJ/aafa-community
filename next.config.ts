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
};

export default nextConfig;

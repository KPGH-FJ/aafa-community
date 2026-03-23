# 部署指南

## Vercel 自动部署（推荐）

Vercel 原生支持 Next.js，并且与 GitHub 集成非常好。

### 配置步骤

#### 1. 在 Vercel 创建项目

1. 登录 [Vercel](https://vercel.com)
2. 点击 **Add New Project**
3. 导入 GitHub 仓库 `KPGH-FJ/aafa-community`
4. 配置项目（使用默认即可）：
   - **Framework Preset**: `Next.js`
   - **Build Command**: `next build`（默认）
   - **Output Directory**: 留空（默认）
   - **Install Command**: `npm install`（默认）
5. 点击 **Deploy**

#### 2. 自动部署

配置完成后，每次推送到 `main` 分支，Vercel 会自动：
- 拉取最新代码
- 运行 `npm install`
- 运行 `next build`
- 部署到生产环境

无需额外的 GitHub Actions 配置！

#### 3. 预览部署

对于 Pull Request，Vercel 会自动创建预览链接，方便在合并前预览更改。

---

### 常见问题

#### 部署失败

如果看到 `routes-manifest.json` 错误，这是因为项目之前配置了静态导出（`output: 'export'`）。

**解决方案**：确保 `next.config.ts` 中没有设置 `output: 'export'`，让 Vercel 使用默认的 Next.js 服务端渲染模式。

当前配置已修复，直接使用默认配置即可。

---

## 手动部署

### 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

### 部署到 Netlify

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 登录
netlify login

# 部署
netlify deploy --prod --dir=dist
```

### 部署到 GitHub Pages

1. 修改 `next.config.ts`：
```typescript
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/aafa-community', // 仓库名
  images: {
    unoptimized: true,
  },
}
```

2. 创建 `.github/workflows/pages.yml` 用于 GitHub Pages 部署

---

## 部署配置

### next.config.ts 说明

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',      // 静态导出
  distDir: 'dist',       // 输出目录
  trailingSlash: true,   // URL 末尾加斜杠
  images: {
    unoptimized: true,   // 静态导出需要禁用图片优化
  },
};

export default nextConfig;
```

---

## 常见问题

### 构建失败

检查 Node.js 版本是否 >= 18

### 图片不显示

静态导出需要设置 `images.unoptimized: true`

### 路由 404

确保 `trailingSlash: true` 已配置

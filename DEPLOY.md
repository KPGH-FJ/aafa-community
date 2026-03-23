# 部署指南

## Vercel 自动部署

本项目配置了 GitHub Actions，支持推送到 `main` 分支时自动部署到 Vercel。

### 配置步骤

#### 1. 在 Vercel 创建项目

1. 登录 [Vercel](https://vercel.com)
2. 点击 **Add New Project**
3. 导入 GitHub 仓库 `KPGH-FJ/aafa-community`
4. 配置项目：
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. 点击 **Deploy**

#### 2. 获取 Vercel Token

1. 进入 [Vercel Settings > Tokens](https://vercel.com/account/tokens)
2. 点击 **Create Token**
3. 输入名称（如 `GitHub Actions`）
4. 复制生成的 Token

#### 3. 配置 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets：

1. 打开仓库页面 → **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**，添加：

| Secret Name | 获取方式 |
|------------|---------|
| `VERCEL_TOKEN` | 上一步创建的 Vercel Token |
| `VERCEL_ORG_ID` | Vercel 项目设置中的 Organization ID |
| `VERCEL_PROJECT_ID` | Vercel 项目设置中的 Project ID |

获取 Org ID 和 Project ID：
- 在项目根目录运行：`vercel link`
- 或查看 Vercel 项目设置页面 URL

#### 4. 测试自动部署

配置完成后，推送到 main 分支将自动触发部署：

```bash
git add .
git commit -m "Add GitHub Actions workflow"
git push origin main
```

在 GitHub 仓库的 **Actions** 标签页可以查看部署状态。

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

# AAFA 社区网站

> 为了AGI的降临，构建最真实的AI世界。

## 项目简介

AAFA（Anti-AI for AGI）社区官方网站，帮普通人看清AI真相，了解真实的AI世界、用好AI工具的社区。

## 技术栈

- **框架**: Next.js 16 + React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **构建**: 静态导出 (Static Export)

## 页面结构

| 页面 | 路径 | 说明 |
|-----|------|------|
| 首页 | `/` | 价值主张、精选内容、即将开始的活动 |
| 内容中心 | `/articles/` | 文章列表、分类筛选 |
| 文章详情 | `/articles/[id]/` | 文章详情页 |
| 活动中心 | `/events/` | 活动列表、往期回顾 |
| 活动详情 | `/events/[id]/` | 活动详情、报名入口 |
| 关于我们 | `/about/` | 社区愿景、目标、价值观 |
| 加入社区 | `/join/` | Newsletter订阅、联系方式 |

## 视觉规范

- **主色调**: 莫兰迪色系
  - 暖米色: `#E8DED4`
  - 鼠尾草绿: `#B8C4A3`
  - 赤陶色: `#C9A89A`
  - 石板灰: `#9BA4AD`
- **基底**: 米白色 `#FAFAF8`
- **字体**: Inter + 系统字体
- **风格**: 明亮通透、人文深度、杂志排版

## 开发命令

```bash
# 安装依赖
npm install

# 开发服务器
npm run dev

# 生产构建
npm run build

# 代码检查
npm run lint
```

## 部署

构建输出位于 `dist/` 目录，可直接部署到任何静态托管服务：

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## 项目结构

```
aafa-website/
├── app/                 # Next.js App Router
│   ├── (pages)/        # 页面目录
│   ├── articles/       # 内容中心
│   ├── events/         # 活动中心
│   ├── about/          # 关于我们
│   ├── join/           # 加入社区
│   ├── globals.css     # 全局样式
│   ├── layout.tsx      # 根布局
│   └── page.tsx        # 首页
├── components/         # React组件
│   ├── ui/            # UI组件库
│   └── home/          # 首页区块
├── data/              # 数据文件
├── types/             # TypeScript类型
├── lib/               # 工具函数
├── public/            # 静态资源
└── dist/              # 构建输出
```

## 许可证

MIT

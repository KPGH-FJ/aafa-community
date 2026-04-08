# ============================================
# 阶段 1: 依赖安装阶段
# ============================================
FROM node:20-alpine AS deps

# 安装依赖工具
RUN apk add --no-cache libc6-compat

# 设置工作目录
WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm ci

# ============================================
# 阶段 2: 构建阶段
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# 从 deps 阶段复制依赖
COPY --from=deps /app/node_modules ./node_modules

# 复制源代码
COPY . .

# 构建参数
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# 禁用遥测
ENV NEXT_TELEMETRY_DISABLED 1

# 构建应用
RUN npm run build

# ============================================
# 阶段 3: 生产阶段
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

# 安全：创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 设置环境变量
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 复制构建产物
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换到非 root 用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

# 启动命令
CMD ["node", "server.js"]

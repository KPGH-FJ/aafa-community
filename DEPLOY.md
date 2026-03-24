# AAFA 网站部署指南

## 📋 项目结构

```
D:\网站\
├── aafa-website\          # 前端 Next.js 项目
└── aafa-website-backend\   # 后端 Express 项目
```

## 🚀 本地开发

### 1. 启动后端服务

```powershell
cd "D:\网站\aafa-website-backend"
npm run dev
```

后端服务运行在: http://localhost:3001

### 2. 启动前端服务

```powershell
cd "D:\网站\aafa-website"
npm run dev
```

前端服务运行在: http://localhost:3000

### 3. 访问管理后台

- 管理后台: http://localhost:3000/admin
- 默认账号: `admin@aafa.com` / `admin123456`

## 🌐 生产部署

### 方案一：Vercel + Railway/Render

#### 前端部署到 Vercel

1. 在 [Vercel](https://vercel.com) 创建账号
2. 导入 GitHub 仓库
3. 配置环境变量:
   ```
   NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
   ```
4. 自动部署

#### 后端部署到 Railway/Render

1. 在 [Railway](https://railway.app) 或 [Render](https://render.com) 创建账号
2. 导入后端代码
3. 配置环境变量:
   ```env
   PORT=3001
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-secret-key
   FRONTEND_URL=https://your-frontend-domain.com
   ```
4. 部署

### 方案二：自有服务器部署

#### 使用 Docker Compose

创建 `docker-compose.yml`:

```yaml
version: '3.8'

services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: aafa
      POSTGRES_PASSWORD: your-password
      POSTGRES_DB: aafa_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./aafa-website-backend
    environment:
      PORT: 3001
      DATABASE_URL: postgresql://aafa:your-password@db:5432/aafa_db?schema=public
      JWT_SECRET: your-super-secret-key
      FRONTEND_URL: http://localhost:3000
    ports:
      - "3001:3001"
    depends_on:
      - db

  frontend:
    build: ./aafa-website
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001/api/v1
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

运行:
```bash
docker-compose up -d
```

## 🔧 环境变量配置

### 后端 (.env)

```env
# 服务器配置
PORT=3001
NODE_ENV=production

# 数据库配置
DATABASE_URL="postgresql://username:password@localhost:5432/aafa_db?schema=public"

# JWT 配置
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# 前端地址（用于 CORS）
FRONTEND_URL=https://your-domain.com

# 文件上传配置
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
```

### 前端 (.env.local)

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
```

## 📦 构建生产版本

### 构建后端

```powershell
cd "D:\网站\aafa-website-backend"
npm run build
npm start
```

### 构建前端

```powershell
cd "D:\网站\aafa-website"
npm run build
```

构建输出在 `dist/` 目录。

## 🔐 安全配置

1. **修改默认密码**
   - 首次登录后立即修改管理员密码

2. **设置强 JWT_SECRET**
   - 使用随机生成的长字符串
   - 可以使用: `openssl rand -base64 32`

3. **配置 HTTPS**
   - 生产环境必须使用 HTTPS
   - 使用 Let's Encrypt 免费证书

4. **数据库安全**
   - 使用强密码
   - 限制数据库访问 IP
   - 定期备份

## 🔄 数据库迁移

### 从 SQLite 迁移到 PostgreSQL

1. 安装 PostgreSQL
2. 创建数据库:
   ```sql
   CREATE DATABASE aafa_db;
   ```
3. 更新后端 `.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/aafa_db?schema=public"
   ```
4. 恢复 PostgreSQL 版本的 schema:
   ```powershell
   cd "D:\网站\aafa-website-backend"
   Copy-Item prisma/schema-postgresql.prisma prisma/schema.prisma -Force
   Copy-Item .env.postgresql .env -Force
   ```
5. 重新生成 Prisma Client 并迁移:
   ```powershell
   npx prisma generate
   npx prisma migrate dev
   npm run db:seed
   ```

## 📞 技术支持

如有问题，请检查:
1. 后端服务是否正常运行: `http://localhost:3001/health`
2. 数据库连接是否正确
3. 环境变量是否配置正确
4. CORS 配置是否允许前端域名

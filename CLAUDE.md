  
# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 项目概述

这是一个基于 **vue-pure-admin** 的项目 - 使用现代技术构建的 Vue 3 + TypeScript 管理后台模板。这是一个功能完善的管理系统模板，具有丰富的功能和组件。

**技术栈:**

- Vue 3.5+ 使用 Composition API
- TypeScript (严格模式已禁用)
- Vite 7+ 作为构建工具
- Element Plus UI 框架
- Pinia 用于状态管理
- Vue Router 4+ 支持动态路由
- TailwindCSS 4+ 用于样式
- ESLint + Prettier + Stylelint 用于代码质量

## 开发命令

### 核心命令

```bash
# 安装依赖 (需要使用 pnpm)
pnpm install

# 启动开发服务器
pnpm dev
# 或者
pnpm serve

# 生产环境构建
pnpm build

# 预发布环境构建
pnpm build:staging

# 类型检查
pnpm typecheck

# 代码检查和格式化
pnpm lint                 # 运行所有检查工具 (ESLint, Prettier, Stylelint)
pnpm lint:eslint         # 仅 ESLint
pnpm lint:prettier       # 仅 Prettier
pnpm lint:stylelint      # 仅 Stylelint

# 预览生产构建
pnpm preview

# 清理缓存并重新安装
pnpm clean:cache
```

### Node.js 要求

- Node.js: ^20.19.0 || >=22.13.0
- pnpm: >=9

## 架构概览

### 目录结构

```
src/
├── api/           # API 服务层
├── assets/        # 静态资源 (图片、字体、图标)
├── components/    # 可复用的 Vue 组件
├── config/        # 应用配置
├── directives/    # 自定义 Vue 指令
├── layout/        # 布局组件 (侧边栏、头部等)
├── plugins/       # Vue 插件设置 (i18n、echarts 等)
├── router/        # Vue Router 配置和模块
├── store/         # Pinia 状态存储
├── style/         # 全局样式和 SCSS 文件
├── utils/         # 工具函数和助手
└── views/         # 页面组件 (基于路由)
```

### 核心架构模式

**动态路由系统:**

- 静态路由从 `src/router/modules/**/*.ts` 自动导入
- 动态路由基于用户权限加载
- 路由被扁平化为最多 2 层以保证 UI 一致性
- 路由权限通过 `usePermissionStore` 处理

**状态管理:**

- Pinia 存储位于 `src/store/modules/`
- 核心存储: `permission`、`multiTags`、`user`、`device`
- 响应式存储集成用于持久化

**组件架构:**

- 使用 Composition API 和 `<script setup>` 语法
- 组件遵循原子设计原则
- 全局组件在 `main.ts` 中自动注册
- 自定义指令用于通用功能

**插件系统:**

- 模块化插件设置位于 `src/plugins/`
- 支持 Element Plus、ECharts、VXE Table、i18n
- 懒加载以提升性能

### 构建配置

**Vite 配置 (`vite.config.ts`):**

- 路径别名: `@/` → `src/`, `@build/` → `build/`
- 支持外部库的 CDN
- 代码分割和压缩
- 支持热重载的开发服务器

**TypeScript 配置:**

- 目标: ESNext 支持现代浏览器
- 严格模式已禁用 (项目配置选择)
- 路径映射用于清晰导入
- 全局变量的类型定义

### 代码质量工具

**ESLint 配置:**

- TypeScript + Vue 3 支持
- Prettier 集成
- Vue 响应式 API 的全局类型
- Vue 组合模式的自定义规则

**Lint-staged:**

- 通过 Husky 在预提交时运行
- 使用 Prettier 格式化所有文件
- 修复 ESLint 和 Stylelint 问题
- 确保一致的代码风格

## 开发指南

### 文件命名

- 组件: PascalCase (例如 `UserProfile.vue`)
- 工具: camelCase (例如 `formatDate.ts`)
- 页面: kebab-case 目录 (例如 `user-management/`)

### 导入模式

- 使用带 `@/` 前缀的绝对导入
- TypeScript 类型导入: `import type { ... }`
- 自动导入: Vue 响应式 API、组合式函数

### 样式

- TailwindCSS 用于实用优先的样式
- SCSS 用于组件特定样式
- 全局样式位于 `src/style/`
- CSS 变量用于主题

### API 集成

- API 服务位于 `src/api/`
- 使用 Axios 进行 HTTP 请求
- 请求/响应拦截器位于工具函数中
- 通过 `mock/` 目录支持模拟数据

## 环境配置

**环境文件:**

- `.env` - 基础配置
- `.env.development` - 开发环境变量
- `.env.production` - 生产环境变量
- `.env.staging` - 预发布环境

**关键变量:**

- `VITE_PORT` - 开发服务器端口
- `VITE_PUBLIC_PATH` - 部署的公共路径
- `VITE_CDN` - CDN 配置
- `VITE_ROUTER_HISTORY` - 路由历史模式

## 特殊功能

**国际化:**

- Vue I18n 集成
- 语言文件位于 `locales/`
- 动态语言切换

**主题:**

- 明暗模式支持
- Element Plus 主题
- CSS 自定义属性

**权限系统:**

- 基于角色的访问控制
- 路由守卫和组件权限
- 动态菜单生成

**多标签页支持:**

- 基于标签页的导航
- 组件状态的 Keep-alive
- 标签页在存储中持久化

## 特殊功能模块

### 3D运维监控系统

- **位置**: `src/views/monitoring/index.vue`
- **技术栈**: Vue 3 + Three.js + Canvas API
- **功能特性**:
  - 5个监控区域：DMZ、大数据MRS、中台、应用、云平台
  - 3D视觉效果和交互式卡片
  - 实时数据模拟（每5秒更新）
  - Canvas粒子背景动画
  - 响应式设计适配不同屏幕
- **组件架构**:
  - 主组件: `src/views/monitoring/index.vue`
  - 业务逻辑: `src/views/monitoring/composables/useMonitoring.ts`
  - 样式文件: `src/views/monitoring/styles/monitoring.css`
  - 路由配置: `src/router/modules/monitoring.ts`
- **访问路径**: `/monitoring/index`
- **依赖项**: Three.js（项目已包含）

# ViewBoard — Jira-like View Management Demo

类 Jira 的「筛选视图」管理 Web Demo，嵌入 soybean-admin 式后台布局。

## 核心概念

| 层级 | 作用 |
| --- | --- |
| 侧栏 + 多标签 | 页面导航（工作台 / 工作项 / 项目 / 设置） |
| 工作项页「视图」chips | 已保存的筛选预设（我的待办、冲刺焦点…） |
| 可展开筛选表单 | 传统后台查询项：状态 / 经办人 / 优先级… |
| 布局切换 | 看板 / 列表 / 时间线（与筛选正交） |

## 本地运行

```bash
npm install
npm run dev    # 0.0.0.0:8080
npm run build
npm run typecheck
```

## 技术栈

React 19 · TypeScript · Vite · TanStack Start · Tailwind v4 · Zustand

## 产品取舍（摘要）

- **视图**用横向 chips 全览，不埋进单一下拉
- **筛选**用可展开表单 + 字段 chips，贴近后台「查询项」习惯
- **布局**与视图/筛选分离，避免混进导航

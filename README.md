# ViewBoard — 视图管理 Demo

类 Jira 的**筛选视图管理**演示：在工作项工作区内，将筛选、分组、排序与布局固化为可切换的视图，并区分系统视图与个人私有视图。

## 在线体验

**GitHub Pages：** https://codeweiz.github.io/jira-like-view-management/

## 文档

| 文档 | 说明 |
| --- | --- |
| [**研发文档**](./docs/dev.md) | 目的、架构、用户故事、概要/详细设计、流程与时序、前后端规划、生命周期与闭环判定（技术栈无关） |

建议评审与开发以 `docs/dev.md` 为契约基线。

## 能力一览（Demo）

- **视图条**：系统/私有视图切换、拖拽排序、收藏标记、私有颜色
- **筛选**：状态 / 优先级 / 类型 chips；经办人与标签可搜索多选
- **生效条件**：合并展示已选条件，支持单项清除与清空
- **布局**：看板 · 列表 · 时间线
- **保存闭环**：脏状态条上更新（私有）/ 另存为私有 / 放弃；系统视图只读

## 本地运行

```bash
npm install
npm run dev          # 开发预览
npm run build        # 生产构建
npm run build:pages  # 静态站点（GitHub Pages）
npm run typecheck
```

推送到 `main` 后，CI 会自动更新 GitHub Pages。

## 仓库

https://github.com/codeweiz/jira-like-view-management

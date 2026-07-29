export type IssueType = "story" | "task" | "bug" | "epic";
export type Priority = "highest" | "high" | "medium" | "low" | "lowest";
export type StatusId = "backlog" | "todo" | "in_progress" | "review" | "done";
export type ViewType = "board" | "list" | "timeline";
export type GroupBy = "none" | "status" | "assignee" | "priority" | "type";
export type SortBy = "key" | "priority" | "updated" | "created" | "title";

export interface User {
  id: string;
  name: string;
  initials: string;
  color: string;
}

export interface Status {
  id: StatusId;
  name: string;
  category: "todo" | "inprogress" | "done";
  color: string;
}

export interface Issue {
  id: string;
  key: string;
  title: string;
  description: string;
  type: IssueType;
  priority: Priority;
  status: StatusId;
  assigneeId: string | null;
  reporterId: string;
  labels: string[];
  storyPoints: number | null;
  createdAt: string;
  updatedAt: string;
  dueDate: string | null;
}

export interface ViewFilters {
  search: string;
  statuses: StatusId[];
  assignees: string[];
  priorities: Priority[];
  types: IssueType[];
  labels: string[];
}

export interface SavedView {
  id: string;
  name: string;
  description?: string;
  type: ViewType;
  starred: boolean;
  isDefault?: boolean;
  groupBy: GroupBy;
  sortBy: SortBy;
  sortDir: "asc" | "desc";
  filters: ViewFilters;
  visibleColumns: string[];
  createdAt: string;
  updatedAt: string;
}

export const STATUSES: Status[] = [
  { id: "backlog", name: "待办池", category: "todo", color: "#626f86" },
  { id: "todo", name: "待处理", category: "todo", color: "#44546f" },
  { id: "in_progress", name: "进行中", category: "inprogress", color: "#0c66e4" },
  { id: "review", name: "评审中", category: "inprogress", color: "#1d7a8c" },
  { id: "done", name: "已完成", category: "done", color: "#216e4e" },
];

export const USERS: User[] = [
  { id: "u1", name: "陈思远", initials: "陈", color: "#0c66e4" },
  { id: "u2", name: "林婉清", initials: "林", color: "#216e4e" },
  { id: "u3", name: "赵明轩", initials: "赵", color: "#c9372c" },
  { id: "u4", name: "周雨桐", initials: "周", color: "#974f0c" },
  { id: "u5", name: "吴启航", initials: "吴", color: "#227d9b" },
];

export const PRIORITY_META: Record<
  Priority,
  { label: string; rank: number; color: string }
> = {
  highest: { label: "最高", rank: 5, color: "#ae2e24" },
  high: { label: "高", rank: 4, color: "#e56910" },
  medium: { label: "中", rank: 3, color: "#9a7b0c" },
  low: { label: "低", rank: 2, color: "#0c66e4" },
  lowest: { label: "最低", rank: 1, color: "#626f86" },
};

export const TYPE_META: Record<
  IssueType,
  { label: string; color: string; bg: string }
> = {
  epic: { label: "史诗", color: "#1d7a8c", bg: "#e6f6f8" },
  story: { label: "故事", color: "#216e4e", bg: "#dcfff1" },
  task: { label: "任务", color: "#0c66e4", bg: "#e9f2ff" },
  bug: { label: "缺陷", color: "#ae2e24", bg: "#ffeceb" },
};

export const ALL_LABELS = [
  "前端",
  "后端",
  "设计",
  "性能",
  "安全",
  "基础设施",
  "移动端",
  "文档",
];

export const DEFAULT_COLUMNS = [
  "key",
  "type",
  "title",
  "status",
  "assignee",
  "priority",
  "labels",
  "updated",
];

export const COLUMN_LABELS: Record<string, string> = {
  key: "键值",
  type: "类型",
  title: "摘要",
  status: "状态",
  assignee: "经办人",
  priority: "优先级",
  labels: "标签",
  storyPoints: "故事点",
  created: "创建时间",
  updated: "更新时间",
  dueDate: "截止日期",
};

function emptyFilters(): ViewFilters {
  return {
    search: "",
    statuses: [],
    assignees: [],
    priorities: [],
    types: [],
    labels: [],
  };
}

export const SEED_ISSUES: Issue[] = [
  {
    id: "i1",
    key: "VB-101",
    title: "实现自定义视图保存与分享",
    description: "用户可保存筛选、分组、排序配置为命名视图，并在团队内共享。",
    type: "epic",
    priority: "highest",
    status: "in_progress",
    assigneeId: "u1",
    reporterId: "u2",
    labels: ["前端", "后端"],
    storyPoints: 13,
    createdAt: "2026-06-01T09:00:00Z",
    updatedAt: "2026-07-28T08:00:00Z",
    dueDate: "2026-08-15",
  },
  {
    id: "i2",
    key: "VB-102",
    title: "看板拖拽更新状态",
    description: "支持在看板列之间拖拽卡片，实时同步状态字段。",
    type: "story",
    priority: "high",
    status: "in_progress",
    assigneeId: "u2",
    reporterId: "u1",
    labels: ["前端"],
    storyPoints: 5,
    createdAt: "2026-06-02T10:00:00Z",
    updatedAt: "2026-07-27T14:20:00Z",
    dueDate: "2026-08-01",
  },
  {
    id: "i3",
    key: "VB-103",
    title: "列表视图列显示配置",
    description: "允许用户选择显示/隐藏列，并持久化到视图配置。",
    type: "story",
    priority: "medium",
    status: "todo",
    assigneeId: "u3",
    reporterId: "u1",
    labels: ["前端", "设计"],
    storyPoints: 3,
    createdAt: "2026-06-03T11:00:00Z",
    updatedAt: "2026-07-26T09:10:00Z",
    dueDate: null,
  },
  {
    id: "i4",
    key: "VB-104",
    title: "筛选器：经办人 / 优先级 / 标签",
    description: "多条件筛选与搜索框联动，结果实时刷新。",
    type: "task",
    priority: "high",
    status: "review",
    assigneeId: "u1",
    reporterId: "u4",
    labels: ["前端"],
    storyPoints: 5,
    createdAt: "2026-06-04T08:00:00Z",
    updatedAt: "2026-07-28T06:00:00Z",
    dueDate: "2026-07-30",
  },
  {
    id: "i5",
    key: "VB-105",
    title: "修复移动端看板横向滚动溢出",
    description: "在 390px 视口下看板列不应导致页面整体水平溢出。",
    type: "bug",
    priority: "highest",
    status: "todo",
    assigneeId: "u2",
    reporterId: "u5",
    labels: ["前端", "移动端"],
    storyPoints: 2,
    createdAt: "2026-06-05T12:00:00Z",
    updatedAt: "2026-07-25T16:40:00Z",
    dueDate: "2026-07-29",
  },
  {
    id: "i6",
    key: "VB-106",
    title: "时间线视图基础排期",
    description: "按截止日期将工作项展示在简易时间轴上。",
    type: "story",
    priority: "medium",
    status: "backlog",
    assigneeId: "u4",
    reporterId: "u1",
    labels: ["前端", "设计"],
    storyPoints: 8,
    createdAt: "2026-06-06T09:30:00Z",
    updatedAt: "2026-07-20T11:00:00Z",
    dueDate: "2026-09-01",
  },
  {
    id: "i7",
    key: "VB-107",
    title: "视图星标与默认视图",
    description: "支持收藏视图并设置项目默认打开的视图。",
    type: "task",
    priority: "low",
    status: "done",
    assigneeId: "u5",
    reporterId: "u2",
    labels: ["前端"],
    storyPoints: 3,
    createdAt: "2026-06-07T10:00:00Z",
    updatedAt: "2026-07-18T15:00:00Z",
    dueDate: null,
  },
  {
    id: "i8",
    key: "VB-108",
    title: "API：视图 CRUD 接口",
    description: "提供创建、读取、更新、删除自定义视图的 REST 接口。",
    type: "task",
    priority: "high",
    status: "in_progress",
    assigneeId: "u3",
    reporterId: "u1",
    labels: ["后端"],
    storyPoints: 5,
    createdAt: "2026-06-08T14:00:00Z",
    updatedAt: "2026-07-27T10:30:00Z",
    dueDate: "2026-08-05",
  },
  {
    id: "i9",
    key: "VB-109",
    title: "搜索高亮与键盘导航",
    description: "快捷键 / 聚焦搜索，结果列表支持方向键选择。",
    type: "story",
    priority: "low",
    status: "backlog",
    assigneeId: null,
    reporterId: "u4",
    labels: ["前端", "性能"],
    storyPoints: 5,
    createdAt: "2026-06-09T09:00:00Z",
    updatedAt: "2026-07-15T08:00:00Z",
    dueDate: null,
  },
  {
    id: "i10",
    key: "VB-110",
    title: "权限：仅所有者可删除私有视图",
    description: "区分个人视图与共享视图的编辑权限。",
    type: "task",
    priority: "medium",
    status: "todo",
    assigneeId: "u5",
    reporterId: "u3",
    labels: ["后端", "安全"],
    storyPoints: 3,
    createdAt: "2026-06-10T11:00:00Z",
    updatedAt: "2026-07-22T13:20:00Z",
    dueDate: "2026-08-10",
  },
  {
    id: "i11",
    key: "VB-111",
    title: "导出当前视图为 CSV",
    description: "按当前筛选与列配置导出工作项列表。",
    type: "task",
    priority: "lowest",
    status: "backlog",
    assigneeId: "u4",
    reporterId: "u2",
    labels: ["后端"],
    storyPoints: 2,
    createdAt: "2026-06-11T16:00:00Z",
    updatedAt: "2026-07-10T09:00:00Z",
    dueDate: null,
  },
  {
    id: "i12",
    key: "VB-112",
    title: "缺陷：筛选后看板计数错误",
    description: "应用多标签筛选时，列头计数未同步更新。",
    type: "bug",
    priority: "high",
    status: "review",
    assigneeId: "u2",
    reporterId: "u1",
    labels: ["前端"],
    storyPoints: 1,
    createdAt: "2026-06-12T08:30:00Z",
    updatedAt: "2026-07-28T05:00:00Z",
    dueDate: "2026-07-28",
  },
  {
    id: "i13",
    key: "VB-113",
    title: "分组：按经办人折叠面板",
    description: "列表/看板支持按经办人分组并折叠空组。",
    type: "story",
    priority: "medium",
    status: "todo",
    assigneeId: "u1",
    reporterId: "u5",
    labels: ["前端", "设计"],
    storyPoints: 5,
    createdAt: "2026-06-13T10:00:00Z",
    updatedAt: "2026-07-24T17:00:00Z",
    dueDate: "2026-08-08",
  },
  {
    id: "i14",
    key: "VB-114",
    title: "性能：虚拟滚动大列表",
    description: "当工作项超过 500 条时启用列表虚拟化。",
    type: "task",
    priority: "medium",
    status: "backlog",
    assigneeId: null,
    reporterId: "u3",
    labels: ["前端", "性能"],
    storyPoints: 8,
    createdAt: "2026-06-14T12:00:00Z",
    updatedAt: "2026-07-12T10:00:00Z",
    dueDate: null,
  },
  {
    id: "i15",
    key: "VB-115",
    title: "登录态下同步视图偏好",
    description: "将最近使用的视图与星标状态同步到账号。",
    type: "story",
    priority: "low",
    status: "done",
    assigneeId: "u3",
    reporterId: "u1",
    labels: ["后端", "基础设施"],
    storyPoints: 5,
    createdAt: "2026-06-15T09:00:00Z",
    updatedAt: "2026-07-08T14:00:00Z",
    dueDate: null,
  },
  {
    id: "i16",
    key: "VB-116",
    title: "设计系统：状态与优先级色板",
    description: "统一语义色 token，保证亮色主题对比度。",
    type: "task",
    priority: "low",
    status: "done",
    assigneeId: "u4",
    reporterId: "u2",
    labels: ["设计"],
    storyPoints: 2,
    createdAt: "2026-06-16T11:00:00Z",
    updatedAt: "2026-07-05T16:00:00Z",
    dueDate: null,
  },
  {
    id: "i17",
    key: "VB-117",
    title: "复制视图并作为模板",
    description: "从现有视图快速复制配置，修改后另存。",
    type: "story",
    priority: "medium",
    status: "in_progress",
    assigneeId: "u5",
    reporterId: "u1",
    labels: ["前端"],
    storyPoints: 3,
    createdAt: "2026-06-17T13:00:00Z",
    updatedAt: "2026-07-27T18:00:00Z",
    dueDate: "2026-08-02",
  },
  {
    id: "i18",
    key: "VB-118",
    title: "安全扫描：视图名称 XSS",
    description: "视图名称与描述需做转义，防止存储型 XSS。",
    type: "bug",
    priority: "highest",
    status: "todo",
    assigneeId: "u3",
    reporterId: "u5",
    labels: ["安全", "后端"],
    storyPoints: 2,
    createdAt: "2026-06-18T15:00:00Z",
    updatedAt: "2026-07-26T12:00:00Z",
    dueDate: "2026-07-31",
  },
];

export const SEED_VIEWS: SavedView[] = [
  {
    id: "v-board",
    name: "项目看板",
    description: "按状态分列的默认看板",
    type: "board",
    starred: true,
    isDefault: true,
    groupBy: "none",
    sortBy: "priority",
    sortDir: "desc",
    filters: emptyFilters(),
    visibleColumns: [...DEFAULT_COLUMNS],
    createdAt: "2026-06-01T00:00:00Z",
    updatedAt: "2026-07-01T00:00:00Z",
  },
  {
    id: "v-my",
    name: "我的待办",
    description: "指派给我且未完成的工作项",
    type: "list",
    starred: true,
    groupBy: "status",
    sortBy: "priority",
    sortDir: "desc",
    filters: {
      ...emptyFilters(),
      assignees: ["u1"],
      statuses: ["backlog", "todo", "in_progress", "review"],
    },
    visibleColumns: ["key", "type", "title", "status", "priority", "dueDate", "updated"],
    createdAt: "2026-06-05T00:00:00Z",
    updatedAt: "2026-07-20T00:00:00Z",
  },
  {
    id: "v-bugs",
    name: "缺陷跟踪",
    description: "所有缺陷按优先级排序",
    type: "list",
    starred: false,
    groupBy: "none",
    sortBy: "priority",
    sortDir: "desc",
    filters: {
      ...emptyFilters(),
      types: ["bug"],
    },
    visibleColumns: ["key", "title", "status", "assignee", "priority", "updated"],
    createdAt: "2026-06-10T00:00:00Z",
    updatedAt: "2026-07-15T00:00:00Z",
  },
  {
    id: "v-sprint",
    name: "冲刺焦点",
    description: "进行中与评审中的高优先级事项",
    type: "board",
    starred: true,
    groupBy: "none",
    sortBy: "updated",
    sortDir: "desc",
    filters: {
      ...emptyFilters(),
      statuses: ["in_progress", "review"],
      priorities: ["highest", "high", "medium"],
    },
    visibleColumns: [...DEFAULT_COLUMNS],
    createdAt: "2026-06-12T00:00:00Z",
    updatedAt: "2026-07-22T00:00:00Z",
  },
  {
    id: "v-timeline",
    name: "交付时间线",
    description: "按截止日期查看排期",
    type: "timeline",
    starred: false,
    groupBy: "assignee",
    sortBy: "created",
    sortDir: "asc",
    filters: emptyFilters(),
    visibleColumns: [...DEFAULT_COLUMNS],
    createdAt: "2026-06-18T00:00:00Z",
    updatedAt: "2026-07-18T00:00:00Z",
  },
  {
    id: "v-backend",
    name: "后端工作流",
    description: "带后端标签的任务看板",
    type: "board",
    starred: false,
    groupBy: "none",
    sortBy: "key",
    sortDir: "asc",
    filters: {
      ...emptyFilters(),
      labels: ["后端"],
    },
    visibleColumns: [...DEFAULT_COLUMNS],
    createdAt: "2026-06-20T00:00:00Z",
    updatedAt: "2026-07-10T00:00:00Z",
  },
];

export function createEmptyFilters(): ViewFilters {
  return emptyFilters();
}

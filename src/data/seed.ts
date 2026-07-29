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
  /** Full pinyin without tones (lowercase, spaced) */
  pinyin: string;
  /** Initials e.g. csy */
  py: string;
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

/** Demo logged-in user — 「当前用户」 shortcut */
export const CURRENT_USER_ID = "u1";

const USERS_RAW: User[] = [
  {
    id: "u1",
    name: "陈思远",
    initials: "陈",
    color: "#0c66e4",
    pinyin: "chen siyuan",
    py: "csy",
  },
  {
    id: "u2",
    name: "林婉清",
    initials: "林",
    color: "#216e4e",
    pinyin: "lin wanqing",
    py: "lwq",
  },
  {
    id: "u3",
    name: "赵明轩",
    initials: "赵",
    color: "#c9372c",
    pinyin: "zhao mingxuan",
    py: "zmx",
  },
  {
    id: "u4",
    name: "周雨桐",
    initials: "周",
    color: "#974f0c",
    pinyin: "zhou yutong",
    py: "zyt",
  },
  {
    id: "u5",
    name: "吴启航",
    initials: "吴",
    color: "#227d9b",
    pinyin: "wu qihang",
    py: "wqh",
  },
];

/** Sorted by pinyin initials for faster scanning */
export const USERS: User[] = [...USERS_RAW].sort((a, b) =>
  a.py.localeCompare(b.py),
);

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
  updated: "更新",
  created: "创建",
  dueDate: "截止日期",
  storyPoints: "故事点",
};

export function createEmptyFilters(): ViewFilters {
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
    title: "实现筛选视图的保存与切换",
    description: "支持将当前筛选条件存为命名视图，并一键切换。",
    type: "story",
    priority: "highest",
    status: "in_progress",
    assigneeId: "u1",
    reporterId: "u2",
    labels: ["前端", "设计"],
    storyPoints: 5,
    createdAt: "2026-07-10T08:00:00.000Z",
    updatedAt: "2026-07-28T10:00:00.000Z",
    dueDate: "2026-07-30",
  },
  {
    id: "i2",
    key: "VB-102",
    title: "看板拖拽变更状态",
    description: "卡片在列间拖拽时更新状态。",
    type: "task",
    priority: "high",
    status: "review",
    assigneeId: "u2",
    reporterId: "u1",
    labels: ["前端"],
    storyPoints: 3,
    createdAt: "2026-07-11T08:00:00.000Z",
    updatedAt: "2026-07-27T14:00:00.000Z",
    dueDate: "2026-07-29",
  },
  {
    id: "i3",
    key: "VB-103",
    title: "列表视图列配置",
    description: "允许显示/隐藏列。",
    type: "story",
    priority: "medium",
    status: "todo",
    assigneeId: "u1",
    reporterId: "u3",
    labels: ["前端", "设计"],
    storyPoints: 3,
    createdAt: "2026-07-12T08:00:00.000Z",
    updatedAt: "2026-07-26T09:00:00.000Z",
    dueDate: null,
  },
  {
    id: "i4",
    key: "VB-104",
    title: "时间线甘特渲染",
    description: "按 dueDate 展示时间线。",
    type: "story",
    priority: "high",
    status: "in_progress",
    assigneeId: "u3",
    reporterId: "u1",
    labels: ["前端"],
    storyPoints: 8,
    createdAt: "2026-07-08T08:00:00.000Z",
    updatedAt: "2026-07-28T08:00:00.000Z",
    dueDate: "2026-08-05",
  },
  {
    id: "i5",
    key: "VB-105",
    title: "筛选条件重置异常",
    description: "清空筛选后部分状态残留。",
    type: "bug",
    priority: "highest",
    status: "todo",
    assigneeId: "u1",
    reporterId: "u4",
    labels: ["前端"],
    storyPoints: 2,
    createdAt: "2026-07-20T08:00:00.000Z",
    updatedAt: "2026-07-28T11:00:00.000Z",
    dueDate: "2026-07-28",
  },
  {
    id: "i6",
    key: "VB-106",
    title: "视图 API 持久化设计",
    description: "定义视图 CRUD 与权限模型。",
    type: "epic",
    priority: "high",
    status: "backlog",
    assigneeId: "u4",
    reporterId: "u1",
    labels: ["后端", "文档"],
    storyPoints: null,
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-22T08:00:00.000Z",
    dueDate: null,
  },
  {
    id: "i7",
    key: "VB-107",
    title: "经办人拼音搜索",
    description: "支持按拼音首字母快速定位用户。",
    type: "task",
    priority: "medium",
    status: "todo",
    assigneeId: "u5",
    reporterId: "u2",
    labels: ["前端"],
    storyPoints: 2,
    createdAt: "2026-07-15T08:00:00.000Z",
    updatedAt: "2026-07-25T08:00:00.000Z",
    dueDate: "2026-08-01",
  },
  {
    id: "i8",
    key: "VB-108",
    title: "权限校验遗漏",
    description: "未登录可读取私有视图。",
    type: "bug",
    priority: "high",
    status: "in_progress",
    assigneeId: "u4",
    reporterId: "u5",
    labels: ["后端", "安全"],
    storyPoints: 3,
    createdAt: "2026-07-18T08:00:00.000Z",
    updatedAt: "2026-07-27T16:00:00.000Z",
    dueDate: "2026-07-31",
  },
  {
    id: "i9",
    key: "VB-109",
    title: "移动端侧栏抽屉",
    description: "小屏用抽屉代替固定侧栏。",
    type: "task",
    priority: "low",
    status: "done",
    assigneeId: "u2",
    reporterId: "u1",
    labels: ["前端", "移动端"],
    storyPoints: 2,
    createdAt: "2026-07-05T08:00:00.000Z",
    updatedAt: "2026-07-20T08:00:00.000Z",
    dueDate: null,
  },
  {
    id: "i10",
    key: "VB-110",
    title: "性能：大列表虚拟滚动",
    description: "超过 500 条时启用虚拟列表。",
    type: "task",
    priority: "medium",
    status: "backlog",
    assigneeId: null,
    reporterId: "u3",
    labels: ["前端", "性能"],
    storyPoints: 5,
    createdAt: "2026-07-14T08:00:00.000Z",
    updatedAt: "2026-07-21T08:00:00.000Z",
    dueDate: null,
  },
  {
    id: "i11",
    key: "VB-111",
    title: "导出 CSV",
    description: "按当前筛选导出工作项。",
    type: "story",
    priority: "low",
    status: "todo",
    assigneeId: "u5",
    reporterId: "u4",
    labels: ["后端"],
    storyPoints: 3,
    createdAt: "2026-07-16T08:00:00.000Z",
    updatedAt: "2026-07-24T08:00:00.000Z",
    dueDate: "2026-08-10",
  },
  {
    id: "i12",
    key: "VB-112",
    title: "标签管理后台",
    description: "增删改标签与颜色。",
    type: "story",
    priority: "medium",
    status: "review",
    assigneeId: "u3",
    reporterId: "u2",
    labels: ["后端", "设计"],
    storyPoints: 5,
    createdAt: "2026-07-09T08:00:00.000Z",
    updatedAt: "2026-07-26T12:00:00.000Z",
    dueDate: "2026-07-28",
  },
  {
    id: "i13",
    key: "VB-113",
    title: "暗色主题 token",
    description: "补齐暗色模式下的语义色。",
    type: "task",
    priority: "lowest",
    status: "backlog",
    assigneeId: "u2",
    reporterId: "u1",
    labels: ["设计", "前端"],
    storyPoints: 2,
    createdAt: "2026-07-17T08:00:00.000Z",
    updatedAt: "2026-07-19T08:00:00.000Z",
    dueDate: null,
  },
  {
    id: "i14",
    key: "VB-114",
    title: "重复保存视图导致覆盖",
    description: "同名视图保存时未提示。",
    type: "bug",
    priority: "medium",
    status: "todo",
    assigneeId: "u1",
    reporterId: "u5",
    labels: ["前端"],
    storyPoints: 1,
    createdAt: "2026-07-25T08:00:00.000Z",
    updatedAt: "2026-07-28T09:00:00.000Z",
    dueDate: "2026-07-29",
  },
  {
    id: "i15",
    key: "VB-115",
    title: "工作流状态机校验",
    description: "限制非法状态跳转。",
    type: "task",
    priority: "high",
    status: "in_progress",
    assigneeId: "u4",
    reporterId: "u3",
    labels: ["后端", "基础设施"],
    storyPoints: 5,
    createdAt: "2026-07-13T08:00:00.000Z",
    updatedAt: "2026-07-27T10:00:00.000Z",
    dueDate: "2026-08-02",
  },
  {
    id: "i16",
    key: "VB-116",
    title: "文档：视图权限说明",
    description: "补充私有/共享视图文档。",
    type: "task",
    priority: "low",
    status: "done",
    assigneeId: "u5",
    reporterId: "u1",
    labels: ["文档"],
    storyPoints: 1,
    createdAt: "2026-07-06T08:00:00.000Z",
    updatedAt: "2026-07-15T08:00:00.000Z",
    dueDate: null,
  },
  {
    id: "i17",
    key: "VB-117",
    title: "看板空状态引导",
    description: "无数据时展示创建引导。",
    type: "story",
    priority: "lowest",
    status: "backlog",
    assigneeId: null,
    reporterId: "u2",
    labels: ["设计", "前端"],
    storyPoints: 2,
    createdAt: "2026-07-19T08:00:00.000Z",
    updatedAt: "2026-07-23T08:00:00.000Z",
    dueDate: null,
  },
  {
    id: "i18",
    key: "VB-118",
    title: "接口超时重试",
    description: "视图加载失败时自动重试。",
    type: "bug",
    priority: "high",
    status: "review",
    assigneeId: "u3",
    reporterId: "u4",
    labels: ["后端", "性能"],
    storyPoints: 2,
    createdAt: "2026-07-21T08:00:00.000Z",
    updatedAt: "2026-07-28T07:00:00.000Z",
    dueDate: "2026-07-30",
  },
];

export const SEED_VIEWS: SavedView[] = [
  {
    id: "v-board",
    name: "项目看板",
    description: "全部工作项 · 看板布局",
    type: "board",
    starred: true,
    isDefault: true,
    groupBy: "none",
    sortBy: "priority",
    sortDir: "desc",
    filters: createEmptyFilters(),
    visibleColumns: [...DEFAULT_COLUMNS],
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-01T08:00:00.000Z",
  },
  {
    id: "v-mine",
    name: "我的待办",
    description: "指派给我且未完成的工作项",
    type: "list",
    starred: true,
    groupBy: "status",
    sortBy: "priority",
    sortDir: "desc",
    filters: {
      ...createEmptyFilters(),
      assignees: [CURRENT_USER_ID],
      statuses: ["backlog", "todo", "in_progress", "review"],
    },
    visibleColumns: [...DEFAULT_COLUMNS],
    createdAt: "2026-07-02T08:00:00.000Z",
    updatedAt: "2026-07-02T08:00:00.000Z",
  },
  {
    id: "v-sprint",
    name: "冲刺焦点",
    description: "高优先级进行中事项",
    type: "board",
    starred: true,
    groupBy: "none",
    sortBy: "priority",
    sortDir: "desc",
    filters: {
      ...createEmptyFilters(),
      priorities: ["highest", "high"],
      statuses: ["todo", "in_progress", "review"],
    },
    visibleColumns: [...DEFAULT_COLUMNS],
    createdAt: "2026-07-03T08:00:00.000Z",
    updatedAt: "2026-07-03T08:00:00.000Z",
  },
  {
    id: "v-bugs",
    name: "缺陷跟踪",
    description: "所有缺陷 · 按状态分组",
    type: "list",
    starred: false,
    groupBy: "status",
    sortBy: "priority",
    sortDir: "desc",
    filters: {
      ...createEmptyFilters(),
      types: ["bug"],
    },
    visibleColumns: [...DEFAULT_COLUMNS],
    createdAt: "2026-07-04T08:00:00.000Z",
    updatedAt: "2026-07-04T08:00:00.000Z",
  },
  {
    id: "v-timeline",
    name: "交付时间线",
    description: "有截止日期的工作项",
    type: "timeline",
    starred: false,
    groupBy: "none",
    sortBy: "updated",
    sortDir: "desc",
    filters: createEmptyFilters(),
    visibleColumns: [...DEFAULT_COLUMNS],
    createdAt: "2026-07-05T08:00:00.000Z",
    updatedAt: "2026-07-05T08:00:00.000Z",
  },
  {
    id: "v-backend",
    name: "后端工作流",
    description: "后端相关 · 列表",
    type: "list",
    starred: false,
    groupBy: "assignee",
    sortBy: "updated",
    sortDir: "desc",
    filters: {
      ...createEmptyFilters(),
      labels: ["后端"],
    },
    visibleColumns: [...DEFAULT_COLUMNS],
    createdAt: "2026-07-06T08:00:00.000Z",
    updatedAt: "2026-07-06T08:00:00.000Z",
  },
];

import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { r as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as ArrowUpDown, C as ChevronUp, D as ChartNoAxesGantt, E as Check, O as Bug, S as ChevronsDown, T as ChevronDown, _ as Equal, a as SquareCheckBig, b as Columns3, c as RotateCcw, d as PanelLeft, f as PanelLeftClose, g as Funnel, h as Layers, i as StarOff, k as Bookmark, l as Plus, m as LayoutDashboard, n as Trash2, o as Search, p as List, r as Star, s as Save, t as X, u as Pencil, v as Ellipsis, w as ChevronRight, x as ChevronsUp, y as Copy } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as DropdownMenuItemIndicator, c as DropdownMenuSeparator$1, d as DropdownMenuTrigger$1, i as DropdownMenuItem$1, l as DropdownMenuSubContent$1, n as DropdownMenuCheckboxItem$1, o as DropdownMenuLabel$1, r as DropdownMenuContent$1, s as DropdownMenuPortal, t as DropdownMenu$1, u as DropdownMenuSubTrigger$1 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as TooltipPortal, r as TooltipProvider$1, t as TooltipContent$1 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CSRwie9A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
			secondary: "bg-secondary text-secondary-foreground hover:bg-muted border border-border",
			outline: "border border-border bg-card text-foreground hover:bg-secondary",
			ghost: "hover:bg-muted text-foreground",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-3 py-2",
			sm: "h-8 rounded-md px-2.5 text-xs",
			lg: "h-10 rounded-lg px-4",
			icon: "h-9 w-9",
			"icon-sm": "h-8 w-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border border-border bg-card p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "关闭"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col space-y-1.5 text-left", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var DropdownMenu = DropdownMenu$1;
var DropdownMenuTrigger = DropdownMenuTrigger$1;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger$1, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-muted data-[state=open]:bg-muted [&_svg]:size-4", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = DropdownMenuSubTrigger$1.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubContent$1, {
	ref,
	className: cn("z-50 min-w-40 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md", className),
	...props
}));
DropdownMenuSubContent.displayName = DropdownMenuSubContent$1.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent$1, {
	ref,
	sideOffset,
	className: cn("z-50 min-w-44 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md", className),
	...props
}) }));
DropdownMenuContent.displayName = DropdownMenuContent$1.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem$1, {
	ref,
	className: cn("relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = DropdownMenuItem$1.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuCheckboxItem$1, {
	ref,
	className: cn("relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = DropdownMenuCheckboxItem$1.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = DropdownMenuLabel$1.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-border", className),
	...props
}));
DropdownMenuSeparator.displayName = DropdownMenuSeparator$1.displayName;
var STATUSES = [
	{
		id: "backlog",
		name: "待办池",
		category: "todo",
		color: "#626f86"
	},
	{
		id: "todo",
		name: "待处理",
		category: "todo",
		color: "#44546f"
	},
	{
		id: "in_progress",
		name: "进行中",
		category: "inprogress",
		color: "#0c66e4"
	},
	{
		id: "review",
		name: "评审中",
		category: "inprogress",
		color: "#1d7a8c"
	},
	{
		id: "done",
		name: "已完成",
		category: "done",
		color: "#216e4e"
	}
];
var USERS = [
	{
		id: "u1",
		name: "陈思远",
		initials: "陈",
		color: "#0c66e4"
	},
	{
		id: "u2",
		name: "林婉清",
		initials: "林",
		color: "#216e4e"
	},
	{
		id: "u3",
		name: "赵明轩",
		initials: "赵",
		color: "#c9372c"
	},
	{
		id: "u4",
		name: "周雨桐",
		initials: "周",
		color: "#974f0c"
	},
	{
		id: "u5",
		name: "吴启航",
		initials: "吴",
		color: "#227d9b"
	}
];
var PRIORITY_META = {
	highest: {
		label: "最高",
		rank: 5,
		color: "#ae2e24"
	},
	high: {
		label: "高",
		rank: 4,
		color: "#e56910"
	},
	medium: {
		label: "中",
		rank: 3,
		color: "#9a7b0c"
	},
	low: {
		label: "低",
		rank: 2,
		color: "#0c66e4"
	},
	lowest: {
		label: "最低",
		rank: 1,
		color: "#626f86"
	}
};
var TYPE_META = {
	epic: {
		label: "史诗",
		color: "#1d7a8c",
		bg: "#e6f6f8"
	},
	story: {
		label: "故事",
		color: "#216e4e",
		bg: "#dcfff1"
	},
	task: {
		label: "任务",
		color: "#0c66e4",
		bg: "#e9f2ff"
	},
	bug: {
		label: "缺陷",
		color: "#ae2e24",
		bg: "#ffeceb"
	}
};
var ALL_LABELS = [
	"前端",
	"后端",
	"设计",
	"性能",
	"安全",
	"基础设施",
	"移动端",
	"文档"
];
var DEFAULT_COLUMNS = [
	"key",
	"type",
	"title",
	"status",
	"assignee",
	"priority",
	"labels",
	"updated"
];
var COLUMN_LABELS = {
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
	dueDate: "截止日期"
};
function emptyFilters() {
	return {
		search: "",
		statuses: [],
		assignees: [],
		priorities: [],
		types: [],
		labels: []
	};
}
var SEED_ISSUES = [
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
		dueDate: "2026-08-15"
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
		dueDate: "2026-08-01"
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
		dueDate: null
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
		dueDate: "2026-07-30"
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
		dueDate: "2026-07-29"
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
		dueDate: "2026-09-01"
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
		dueDate: null
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
		dueDate: "2026-08-05"
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
		dueDate: null
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
		dueDate: "2026-08-10"
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
		dueDate: null
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
		dueDate: "2026-07-28"
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
		dueDate: "2026-08-08"
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
		dueDate: null
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
		dueDate: null
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
		dueDate: null
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
		dueDate: "2026-08-02"
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
		dueDate: "2026-07-31"
	}
];
var SEED_VIEWS = [
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
		updatedAt: "2026-07-01T00:00:00Z"
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
			statuses: [
				"backlog",
				"todo",
				"in_progress",
				"review"
			]
		},
		visibleColumns: [
			"key",
			"type",
			"title",
			"status",
			"priority",
			"dueDate",
			"updated"
		],
		createdAt: "2026-06-05T00:00:00Z",
		updatedAt: "2026-07-20T00:00:00Z"
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
			types: ["bug"]
		},
		visibleColumns: [
			"key",
			"title",
			"status",
			"assignee",
			"priority",
			"updated"
		],
		createdAt: "2026-06-10T00:00:00Z",
		updatedAt: "2026-07-15T00:00:00Z"
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
			priorities: [
				"highest",
				"high",
				"medium"
			]
		},
		visibleColumns: [...DEFAULT_COLUMNS],
		createdAt: "2026-06-12T00:00:00Z",
		updatedAt: "2026-07-22T00:00:00Z"
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
		updatedAt: "2026-07-18T00:00:00Z"
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
			labels: ["后端"]
		},
		visibleColumns: [...DEFAULT_COLUMNS],
		createdAt: "2026-06-20T00:00:00Z",
		updatedAt: "2026-07-10T00:00:00Z"
	}
];
function createEmptyFilters() {
	return emptyFilters();
}
function nowIso() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
function deepCloneView(view) {
	return {
		...view,
		filters: {
			...view.filters,
			statuses: [...view.filters.statuses],
			assignees: [...view.filters.assignees],
			priorities: [...view.filters.priorities],
			types: [...view.filters.types],
			labels: [...view.filters.labels]
		},
		visibleColumns: [...view.visibleColumns]
	};
}
function countActiveFilters(filters) {
	let n = 0;
	if (filters.search.trim()) n += 1;
	n += filters.statuses.length > 0 ? 1 : 0;
	n += filters.assignees.length > 0 ? 1 : 0;
	n += filters.priorities.length > 0 ? 1 : 0;
	n += filters.types.length > 0 ? 1 : 0;
	n += filters.labels.length > 0 ? 1 : 0;
	return n;
}
function filterIssues(issues, filters) {
	const q = filters.search.trim().toLowerCase();
	return issues.filter((issue) => {
		if (q) {
			if (!`${issue.key} ${issue.title} ${issue.description} ${issue.labels.join(" ")}`.toLowerCase().includes(q)) return false;
		}
		if (filters.statuses.length && !filters.statuses.includes(issue.status)) return false;
		if (filters.priorities.length && !filters.priorities.includes(issue.priority)) return false;
		if (filters.types.length && !filters.types.includes(issue.type)) return false;
		if (filters.labels.length && !filters.labels.some((l) => issue.labels.includes(l))) return false;
		if (filters.assignees.length) {
			const aid = issue.assigneeId ?? "unassigned";
			if (!filters.assignees.includes(aid)) return false;
		}
		return true;
	});
}
function sortIssues(issues, sortBy, sortDir) {
	const mul = sortDir === "asc" ? 1 : -1;
	return [...issues].sort((a, b) => {
		let cmp = 0;
		switch (sortBy) {
			case "key":
				cmp = a.key.localeCompare(b.key);
				break;
			case "title":
				cmp = a.title.localeCompare(b.title, "zh");
				break;
			case "priority":
				cmp = PRIORITY_META[a.priority].rank - PRIORITY_META[b.priority].rank;
				break;
			case "created":
				cmp = a.createdAt.localeCompare(b.createdAt);
				break;
			default:
				cmp = a.updatedAt.localeCompare(b.updatedAt);
				break;
		}
		return cmp * mul;
	});
}
function initialDraft() {
	return deepCloneView(SEED_VIEWS[0]);
}
var useViewStore = create()((set, get) => ({
	issues: SEED_ISSUES.map((i) => ({
		...i,
		labels: [...i.labels]
	})),
	views: SEED_VIEWS.map(deepCloneView),
	activeViewId: "v-board",
	selectedIssueId: null,
	sidebarOpen: false,
	dirty: false,
	draft: initialDraft(),
	selectView: (id) => {
		const view = get().views.find((v) => v.id === id);
		if (!view) return;
		set({
			activeViewId: id,
			draft: deepCloneView(view),
			dirty: false,
			selectedIssueId: null,
			sidebarOpen: false
		});
	},
	setViewType: (type) => set((s) => ({
		draft: {
			...s.draft,
			type,
			updatedAt: nowIso()
		},
		dirty: true
	})),
	setGroupBy: (groupBy) => set((s) => ({
		draft: {
			...s.draft,
			groupBy,
			updatedAt: nowIso()
		},
		dirty: true
	})),
	setSort: (sortBy, sortDir) => set((s) => ({
		draft: {
			...s.draft,
			sortBy,
			sortDir: sortDir ?? s.draft.sortDir,
			updatedAt: nowIso()
		},
		dirty: true
	})),
	setSearch: (search) => set((s) => ({
		draft: {
			...s.draft,
			filters: {
				...s.draft.filters,
				search
			},
			updatedAt: nowIso()
		},
		dirty: true
	})),
	toggleFilterValue: (key, value) => set((s) => {
		const list = s.draft.filters[key];
		const next = list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
		return {
			draft: {
				...s.draft,
				filters: {
					...s.draft.filters,
					[key]: next
				},
				updatedAt: nowIso()
			},
			dirty: true
		};
	}),
	clearFilters: () => set((s) => ({
		draft: {
			...s.draft,
			filters: createEmptyFilters(),
			updatedAt: nowIso()
		},
		dirty: true
	})),
	setVisibleColumns: (cols) => set((s) => ({
		draft: {
			...s.draft,
			visibleColumns: cols,
			updatedAt: nowIso()
		},
		dirty: true
	})),
	toggleColumn: (col) => set((s) => {
		const next = s.draft.visibleColumns.includes(col) ? s.draft.visibleColumns.filter((c) => c !== col) : [...s.draft.visibleColumns, col];
		if (!next.includes("title")) next.push("title");
		return {
			draft: {
				...s.draft,
				visibleColumns: next,
				updatedAt: nowIso()
			},
			dirty: true
		};
	}),
	moveIssue: (issueId, status) => set((s) => ({ issues: s.issues.map((i) => i.id === issueId ? {
		...i,
		status,
		updatedAt: nowIso()
	} : i) })),
	selectIssue: (id) => set({ selectedIssueId: id }),
	updateIssue: (id, patch) => set((s) => ({ issues: s.issues.map((i) => i.id === id ? {
		...i,
		...patch,
		updatedAt: nowIso()
	} : i) })),
	createView: ({ name, description, type }) => {
		const id = `v-${Date.now()}`;
		const base = get().draft;
		const view = {
			id,
			name,
			description,
			type,
			starred: false,
			groupBy: base.groupBy,
			sortBy: base.sortBy,
			sortDir: base.sortDir,
			filters: {
				...base.filters,
				statuses: [...base.filters.statuses],
				assignees: [...base.filters.assignees],
				priorities: [...base.filters.priorities],
				types: [...base.filters.types],
				labels: [...base.filters.labels]
			},
			visibleColumns: [...base.visibleColumns],
			createdAt: nowIso(),
			updatedAt: nowIso()
		};
		set((s) => ({
			views: [...s.views, view],
			activeViewId: id,
			draft: deepCloneView(view),
			dirty: false,
			sidebarOpen: false
		}));
		return id;
	},
	saveDraftToView: () => {
		const { activeViewId, draft, views } = get();
		const existing = views.find((v) => v.id === activeViewId);
		const updated = deepCloneView({
			...draft,
			id: activeViewId,
			name: existing?.name ?? draft.name,
			description: existing?.description ?? draft.description,
			starred: existing?.starred ?? draft.starred,
			isDefault: existing?.isDefault,
			updatedAt: nowIso()
		});
		set({
			views: views.map((v) => v.id === activeViewId ? updated : v),
			draft: updated,
			dirty: false
		});
	},
	renameView: (id, name) => set((s) => ({
		views: s.views.map((v) => v.id === id ? {
			...v,
			name,
			updatedAt: nowIso()
		} : v),
		draft: s.activeViewId === id ? {
			...s.draft,
			name,
			updatedAt: nowIso()
		} : s.draft
	})),
	deleteView: (id) => {
		const { views, activeViewId } = get();
		if (views.length <= 1) return;
		const next = views.filter((v) => v.id !== id);
		const nextActive = activeViewId === id ? next[0] : views.find((v) => v.id === activeViewId) ?? next[0];
		set({
			views: next,
			activeViewId: nextActive.id,
			draft: deepCloneView(nextActive),
			dirty: false
		});
	},
	duplicateView: (id) => {
		const src = get().views.find((v) => v.id === id);
		if (!src) return id;
		const newId = `v-${Date.now()}`;
		const copy = deepCloneView({
			...src,
			id: newId,
			name: `${src.name} (副本)`,
			starred: false,
			isDefault: false,
			createdAt: nowIso(),
			updatedAt: nowIso()
		});
		set((s) => ({
			views: [...s.views, copy],
			activeViewId: newId,
			draft: deepCloneView(copy),
			dirty: false,
			sidebarOpen: false
		}));
		return newId;
	},
	toggleStar: (id) => set((s) => ({
		views: s.views.map((v) => v.id === id ? {
			...v,
			starred: !v.starred
		} : v),
		draft: s.activeViewId === id ? {
			...s.draft,
			starred: !s.draft.starred
		} : s.draft
	})),
	setDefaultView: (id) => set((s) => ({ views: s.views.map((v) => ({
		...v,
		isDefault: v.id === id
	})) })),
	setSidebarOpen: (open) => set({ sidebarOpen: open }),
	resetDemo: () => set({
		issues: SEED_ISSUES.map((i) => ({
			...i,
			labels: [...i.labels]
		})),
		views: SEED_VIEWS.map(deepCloneView),
		activeViewId: "v-board",
		selectedIssueId: null,
		dirty: false,
		draft: initialDraft()
	})
}));
var typeIcon = {
	board: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "size-3.5" }),
	list: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-3.5" }),
	timeline: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesGantt, { className: "size-3.5" })
};
var typeLabel = {
	board: "看板",
	list: "列表",
	timeline: "时间线"
};
function Sidebar() {
	const views = useViewStore((s) => s.views);
	const activeViewId = useViewStore((s) => s.activeViewId);
	const selectView = useViewStore((s) => s.selectView);
	const toggleStar = useViewStore((s) => s.toggleStar);
	const deleteView = useViewStore((s) => s.deleteView);
	const duplicateView = useViewStore((s) => s.duplicateView);
	const renameView = useViewStore((s) => s.renameView);
	const setDefaultView = useViewStore((s) => s.setDefaultView);
	const createView = useViewStore((s) => s.createView);
	const setSidebarOpen = useViewStore((s) => s.setSidebarOpen);
	const resetDemo = useViewStore((s) => s.resetDemo);
	const [query, setQuery] = (0, import_react.useState)("");
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [newName, setNewName] = (0, import_react.useState)("");
	const [newDesc, setNewDesc] = (0, import_react.useState)("");
	const [newType, setNewType] = (0, import_react.useState)("board");
	const [renameId, setRenameId] = (0, import_react.useState)(null);
	const [renameValue, setRenameValue] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		const list = q ? views.filter((v) => v.name.toLowerCase().includes(q) || (v.description ?? "").toLowerCase().includes(q)) : views;
		return {
			starred: list.filter((v) => v.starred),
			rest: list.filter((v) => !v.starred)
		};
	}, [views, query]);
	function handleCreate() {
		const name = newName.trim() || "未命名视图";
		createView({
			name,
			description: newDesc.trim() || void 0,
			type: newType
		});
		setCreateOpen(false);
		setNewName("");
		setNewDesc("");
		setNewType("board");
	}
	function openRename(id, name) {
		setRenameId(id);
		setRenameValue(name);
	}
	function commitRename() {
		if (renameId && renameValue.trim()) renameView(renameId, renameValue.trim());
		setRenameId(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex h-full w-[260px] shrink-0 flex-col border-r border-border/40 bg-sidebar text-sidebar-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-8 items-center justify-center rounded-md bg-sidebar-active font-bold text-white",
						children: "V"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-sm font-semibold text-white",
							children: "ViewBoard"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-[11px] text-sidebar-muted",
							children: "视图管理 Demo"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					className: "text-sidebar-muted hover:bg-sidebar-hover hover:text-white lg:hidden",
					onClick: () => setSidebarOpen(false),
					"aria-label": "关闭侧栏",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-sidebar-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "搜索视图…",
						className: "h-8 w-full rounded-md border border-transparent bg-sidebar-hover pl-8 pr-2 text-sm text-white placeholder:text-sidebar-muted focus:border-sidebar-active focus:outline-none"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-3 py-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide text-sidebar-muted",
					children: "已保存视图"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					className: "text-sidebar-muted hover:bg-sidebar-hover hover:text-white",
					onClick: () => setCreateOpen(true),
					"aria-label": "新建视图",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "scrollbar-thin flex-1 overflow-y-auto px-2 pb-3",
				children: [filtered.starred.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 py-1 text-[11px] font-medium text-sidebar-muted",
						children: "星标"
					}), filtered.starred.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewRow, {
						id: v.id,
						name: v.name,
						type: v.type,
						starred: v.starred,
						isDefault: v.isDefault,
						active: v.id === activeViewId,
						onSelect: () => selectView(v.id),
						onStar: () => toggleStar(v.id),
						onDuplicate: () => duplicateView(v.id),
						onDelete: () => deleteView(v.id),
						onRename: () => openRename(v.id, v.name),
						onDefault: () => setDefaultView(v.id)
					}, v.id))]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					filtered.starred.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 py-1 text-[11px] font-medium text-sidebar-muted",
						children: "全部"
					}) : null,
					filtered.rest.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewRow, {
						id: v.id,
						name: v.name,
						type: v.type,
						starred: v.starred,
						isDefault: v.isDefault,
						active: v.id === activeViewId,
						onSelect: () => selectView(v.id),
						onStar: () => toggleStar(v.id),
						onDuplicate: () => duplicateView(v.id),
						onDelete: () => deleteView(v.id),
						onRename: () => openRename(v.id, v.name),
						onDefault: () => setDefaultView(v.id)
					}, v.id)),
					filtered.starred.length === 0 && filtered.rest.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 py-6 text-center text-xs text-sidebar-muted",
						children: "没有匹配的视图"
					}) : null
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-white/10 p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					className: "w-full justify-start gap-2 text-sidebar-muted hover:bg-sidebar-hover hover:text-white",
					onClick: () => resetDemo(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "重置演示数据"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: createOpen,
				onOpenChange: setCreateOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "新建视图" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "基于当前筛选与配置创建命名视图，之后可随时切换。" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-xs font-medium text-muted-foreground",
								children: "名称"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: newName,
								onChange: (e) => setNewName(e.target.value),
								placeholder: "例如：本周缺陷",
								autoFocus: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-xs font-medium text-muted-foreground",
								children: "描述（可选）"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: newDesc,
								onChange: (e) => setNewDesc(e.target.value),
								placeholder: "简要说明此视图用途"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-xs font-medium text-muted-foreground",
								children: "视图类型"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [
									"board",
									"list",
									"timeline"
								].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setNewType(t),
									className: cn("flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-xs font-medium transition-colors", newType === t ? "border-primary bg-accent text-accent-foreground" : "border-border bg-card text-muted-foreground hover:bg-secondary"),
									children: [typeIcon[t], typeLabel[t]]
								}, t))
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => setCreateOpen(false),
						children: "取消"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleCreate,
						children: "创建"
					})] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!renameId,
				onOpenChange: (o) => !o && setRenameId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "重命名视图" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: renameValue,
						onChange: (e) => setRenameValue(e.target.value),
						onKeyDown: (e) => e.key === "Enter" && commitRename(),
						autoFocus: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => setRenameId(null),
						children: "取消"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: commitRename,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), "保存"]
					})] })
				] })
			})
		]
	});
}
function ViewRow({ name, type, starred, isDefault, active, onSelect, onStar, onDuplicate, onDelete, onRename, onDefault }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group mb-0.5 flex items-center gap-0.5 rounded-md pr-1", active ? "bg-sidebar-hover" : "hover:bg-sidebar-hover/70"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onSelect,
				className: cn("flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm", active ? "text-white" : "text-sidebar-foreground"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn(active ? "text-sidebar-active" : "text-sidebar-muted"),
						children: typeIcon[type]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-medium",
						children: name
					}),
					isDefault ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 rounded bg-white/10 px-1 py-0.5 text-[10px] text-sidebar-muted",
						children: "默认"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: (e) => {
					e.stopPropagation();
					onStar();
				},
				className: cn("rounded p-1 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100", starred ? "text-amber-400 opacity-100" : "text-sidebar-muted hover:text-white"),
				"aria-label": starred ? "取消星标" : "加星标",
				children: starred ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarOff, { className: "size-3.5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rounded p-1 text-sidebar-muted opacity-0 hover:text-white group-hover:opacity-100 focus:opacity-100 data-[state=open]:opacity-100",
					"aria-label": "更多操作",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-3.5" })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
				align: "end",
				className: "w-44",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						onClick: onRename,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), " 重命名"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						onClick: onDuplicate,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), " 复制视图"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						onClick: onStar,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {}),
							" ",
							starred ? "取消星标" : "加星标"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						onClick: onDefault,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}), " 设为默认"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						className: "text-destructive focus:text-destructive",
						onClick: onDelete,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), " 删除"]
					})
				]
			})] })
		]
	});
}
var badgeVariants = cva("inline-flex items-center rounded-sm border px-1.5 py-0.5 text-xs font-medium transition-colors", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground",
		secondary: "border-transparent bg-secondary text-secondary-foreground",
		outline: "border-border text-foreground bg-card",
		success: "border-transparent bg-success-bg text-success",
		warning: "border-transparent bg-warning-bg text-warning",
		danger: "border-transparent bg-danger-bg text-danger",
		info: "border-transparent bg-info-bg text-info"
	} },
	defaultVariants: { variant: "secondary" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function useFilteredIssues() {
	const issues = useViewStore((s) => s.issues);
	const filters = useViewStore((s) => s.draft.filters);
	const sortBy = useViewStore((s) => s.draft.sortBy);
	const sortDir = useViewStore((s) => s.draft.sortDir);
	return (0, import_react.useMemo)(() => {
		return sortIssues(filterIssues(issues, filters), sortBy, sortDir);
	}, [
		issues,
		filters,
		sortBy,
		sortDir
	]);
}
var viewTypes = [
	{
		id: "board",
		label: "看板",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "size-3.5" })
	},
	{
		id: "list",
		label: "列表",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-3.5" })
	},
	{
		id: "timeline",
		label: "时间线",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesGantt, { className: "size-3.5" })
	}
];
var groupOptions = [
	{
		id: "none",
		label: "不分组"
	},
	{
		id: "status",
		label: "状态"
	},
	{
		id: "assignee",
		label: "经办人"
	},
	{
		id: "priority",
		label: "优先级"
	},
	{
		id: "type",
		label: "类型"
	}
];
var sortOptions = [
	{
		id: "priority",
		label: "优先级"
	},
	{
		id: "updated",
		label: "更新时间"
	},
	{
		id: "created",
		label: "创建时间"
	},
	{
		id: "key",
		label: "键值"
	},
	{
		id: "title",
		label: "摘要"
	}
];
function Toolbar() {
	const draft = useViewStore((s) => s.draft);
	const dirty = useViewStore((s) => s.dirty);
	const totalCount = useViewStore((s) => s.issues.length);
	const setViewType = useViewStore((s) => s.setViewType);
	const setSearch = useViewStore((s) => s.setSearch);
	const setGroupBy = useViewStore((s) => s.setGroupBy);
	const setSort = useViewStore((s) => s.setSort);
	const toggleFilterValue = useViewStore((s) => s.toggleFilterValue);
	const clearFilters = useViewStore((s) => s.clearFilters);
	const toggleColumn = useViewStore((s) => s.toggleColumn);
	const saveDraftToView = useViewStore((s) => s.saveDraftToView);
	const setSidebarOpen = useViewStore((s) => s.setSidebarOpen);
	const sidebarOpen = useViewStore((s) => s.sidebarOpen);
	const filteredCount = useFilteredIssues().length;
	const activeFilters = countActiveFilters(draft.filters);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-border bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 px-3 py-2.5 sm:px-4",
				children: [
					!sidebarOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						onClick: () => setSidebarOpen(true),
						"aria-label": "打开侧栏",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, {})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "truncate text-base font-semibold tracking-tight sm:text-lg",
									children: draft.name
								}),
								dirty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "warning",
									className: "shrink-0",
									children: "未保存"
								}) : null,
								draft.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden truncate text-xs text-muted-foreground md:inline",
									children: draft.description
								}) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: [
								"显示 ",
								filteredCount,
								" / ",
								totalCount,
								" 个工作项"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center rounded-md border border-border bg-secondary p-0.5",
						children: viewTypes.map((vt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setViewType(vt.id),
							className: cn("inline-flex h-7 items-center gap-1.5 rounded-[5px] px-2.5 text-xs font-medium transition-colors", draft.type === vt.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"),
							children: [vt.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: vt.label
							})]
						}, vt.id))
					}),
					dirty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => saveDraftToView(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), "保存视图"]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 border-t border-border/70 px-3 py-2 sm:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-[160px] flex-1 sm:max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.filters.search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "搜索键值、摘要…",
							className: "h-8 pl-8"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "h-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-3.5" }),
								"筛选",
								activeFilters > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-0.5 inline-flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground",
									children: activeFilters
								}) : null
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "start",
						className: "max-h-80 w-56 overflow-y-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "状态" }),
							STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuCheckboxItem, {
								checked: draft.filters.statuses.includes(s.id),
								onCheckedChange: () => toggleFilterValue("statuses", s.id),
								onSelect: (e) => e.preventDefault(),
								children: s.name
							}, s.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "经办人" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuCheckboxItem, {
								checked: draft.filters.assignees.includes("unassigned"),
								onCheckedChange: () => toggleFilterValue("assignees", "unassigned"),
								onSelect: (e) => e.preventDefault(),
								children: "未分配"
							}),
							USERS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuCheckboxItem, {
								checked: draft.filters.assignees.includes(u.id),
								onCheckedChange: () => toggleFilterValue("assignees", u.id),
								onSelect: (e) => e.preventDefault(),
								children: u.name
							}, u.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "优先级" }),
							Object.keys(PRIORITY_META).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuCheckboxItem, {
								checked: draft.filters.priorities.includes(p),
								onCheckedChange: () => toggleFilterValue("priorities", p),
								onSelect: (e) => e.preventDefault(),
								children: PRIORITY_META[p].label
							}, p)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "类型" }),
							Object.keys(TYPE_META).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuCheckboxItem, {
								checked: draft.filters.types.includes(t),
								onCheckedChange: () => toggleFilterValue("types", t),
								onSelect: (e) => e.preventDefault(),
								children: TYPE_META[t].label
							}, t)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "标签" }),
							ALL_LABELS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuCheckboxItem, {
								checked: draft.filters.labels.includes(l),
								onCheckedChange: () => toggleFilterValue("labels", l),
								onSelect: (e) => e.preventDefault(),
								children: l
							}, l)),
							activeFilters > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => clearFilters(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), " 清除全部筛选"]
							})] }) : null
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "h-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "分组"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: groupOptions.find((g) => g.id === draft.groupBy)?.label
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
						align: "start",
						children: groupOptions.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							onClick: () => setGroupBy(g.id),
							className: cn(draft.groupBy === g.id && "bg-accent text-accent-foreground"),
							children: g.label
						}, g.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "h-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "size-3.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "排序"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: sortOptions.find((s) => s.id === draft.sortBy)?.label
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "start",
						children: [
							sortOptions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onClick: () => setSort(s.id),
								className: cn(draft.sortBy === s.id && "bg-accent text-accent-foreground"),
								children: s.label
							}, s.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => setSort(draft.sortBy, "asc"),
								children: ["升序 ", draft.sortDir === "asc" ? "✓" : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => setSort(draft.sortBy, "desc"),
								children: ["降序 ", draft.sortDir === "desc" ? "✓" : ""]
							})
						]
					})] }),
					draft.type === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "h-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Columns3, { className: "size-3.5" }), "列"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "start",
						className: "w-48",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "显示列" }), Object.entries(COLUMN_LABELS).map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuCheckboxItem, {
							checked: draft.visibleColumns.includes(key),
							onCheckedChange: () => toggleColumn(key),
							onSelect: (e) => e.preventDefault(),
							disabled: key === "title",
							children: label
						}, key))]
					})] }) : null,
					activeFilters > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						className: "h-8 text-muted-foreground",
						onClick: () => clearFilters(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), "清除筛选"]
					}) : null
				]
			}),
			activeFilters > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-1.5 border-t border-border/50 px-3 py-2 sm:px-4",
				children: [
					draft.filters.statuses.map((id) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
							label: `状态: ${STATUSES.find((x) => x.id === id).name}`,
							onRemove: () => toggleFilterValue("statuses", id)
						}, `st-${id}`);
					}),
					draft.filters.assignees.map((id) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
							label: `经办人: ${id === "unassigned" ? "未分配" : USERS.find((u) => u.id === id)?.name ?? id}`,
							onRemove: () => toggleFilterValue("assignees", id)
						}, `as-${id}`);
					}),
					draft.filters.priorities.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						label: `优先级: ${PRIORITY_META[p].label}`,
						onRemove: () => toggleFilterValue("priorities", p)
					}, `pr-${p}`)),
					draft.filters.types.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						label: `类型: ${TYPE_META[t].label}`,
						onRemove: () => toggleFilterValue("types", t)
					}, `ty-${t}`)),
					draft.filters.labels.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						label: `标签: ${l}`,
						onRemove: () => toggleFilterValue("labels", l)
					}, `lb-${l}`)),
					draft.filters.search.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						label: `搜索: ${draft.filters.search}`,
						onRemove: () => setSearch("")
					}) : null
				]
			}) : null
		]
	});
}
function FilterChip({ label, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onRemove,
		className: "inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground transition-colors hover:bg-muted",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3 opacity-60" })]
	});
}
var typeIcons = {
	epic: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }),
	story: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-3.5" }),
	task: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, { className: "size-3.5" }),
	bug: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bug, { className: "size-3.5" })
};
var priorityIcons = {
	highest: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUp, { className: "size-3.5" }),
	high: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-3.5" }),
	medium: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Equal, { className: "size-3.5" }),
	low: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" }),
	lowest: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsDown, { className: "size-3.5" })
};
function TypeIcon({ type, className }) {
	const meta = TYPE_META[type];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex size-5 items-center justify-center rounded-sm", className),
		style: {
			color: meta.color,
			background: meta.bg
		},
		title: meta.label,
		children: typeIcons[type]
	});
}
function PriorityIcon({ priority, showLabel }) {
	const meta = PRIORITY_META[priority];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 text-xs font-medium",
		style: { color: meta.color },
		title: meta.label,
		children: [priorityIcons[priority], showLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: meta.label }) : null]
	});
}
function StatusBadge({ status }) {
	const s = STATUSES.find((x) => x.id === status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 rounded-sm bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground",
		title: s.name,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-1.5 rounded-full",
			style: { background: s.color }
		}), s.name]
	});
}
function Avatar({ userId, size = "md" }) {
	const user = userId ? USERS.find((u) => u.id === userId) : null;
	const dim = size === "sm" ? "size-6 text-[10px]" : "size-7 text-xs";
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center justify-center rounded-full border border-dashed border-border bg-muted font-medium text-muted-foreground", dim),
		title: "未分配",
		children: "—"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center justify-center rounded-full font-semibold text-white", dim),
		style: { background: user.color },
		title: user.name,
		children: user.initials
	});
}
function LabelChips({ labels, max = 3 }) {
	const shown = labels.slice(0, max);
	const rest = labels.length - shown.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-1",
		children: [shown.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded-sm bg-secondary px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground",
			children: l
		}, l)), rest > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "rounded-sm bg-secondary px-1.5 py-0.5 text-[11px] text-muted-foreground",
			children: ["+", rest]
		}) : null]
	});
}
function formatRelative(iso) {
	const d = new Date(iso);
	const diff = Date.now() - d.getTime();
	const mins = Math.floor(diff / 6e4);
	if (mins < 60) return `${Math.max(1, mins)} 分钟前`;
	const hours = Math.floor(mins / 60);
	if (hours < 48) return `${hours} 小时前`;
	const days = Math.floor(hours / 24);
	if (days < 30) return `${days} 天前`;
	return d.toLocaleDateString("zh-CN", {
		month: "short",
		day: "numeric"
	});
}
function IssueKey({ issue }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "font-mono text-xs font-medium text-muted-foreground",
		children: issue.key
	});
}
function BoardView() {
	const statusFilter = useViewStore((s) => s.draft.filters.statuses);
	const issues = useFilteredIssues();
	const moveIssue = useViewStore((s) => s.moveIssue);
	const selectIssue = useViewStore((s) => s.selectIssue);
	const selectedIssueId = useViewStore((s) => s.selectedIssueId);
	const [dragId, setDragId] = (0, import_react.useState)(null);
	const [overStatus, setOverStatus] = (0, import_react.useState)(null);
	const columns = (0, import_react.useMemo)(() => {
		return (statusFilter.length > 0 ? STATUSES.filter((s) => statusFilter.includes(s.id)) : STATUSES).map((status) => ({
			status,
			issues: issues.filter((i) => i.status === status.id)
		}));
	}, [issues, statusFilter]);
	function onDrop(status) {
		if (dragId) moveIssue(dragId, status);
		setDragId(null);
		setOverStatus(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "scrollbar-thin flex h-full gap-3 overflow-x-auto p-3 sm:p-4",
		children: columns.map(({ status, issues: colIssues }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex w-[280px] shrink-0 flex-col rounded-xl bg-muted/60 transition-colors", overStatus === status.id && dragId ? "bg-accent/40 ring-2 ring-primary/40" : ""),
			onDragOver: (e) => {
				e.preventDefault();
				setOverStatus(status.id);
			},
			onDragLeave: () => setOverStatus((s) => s === status.id ? null : s),
			onDrop: (e) => {
				e.preventDefault();
				onDrop(status.id);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 px-3 py-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-2 rounded-full",
						style: { background: status.color }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: status.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-card px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground shadow-sm",
						children: colIssues.length
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scrollbar-thin flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-3",
				children: [colIssues.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueCard, {
					issue,
					selected: selectedIssueId === issue.id,
					dragging: dragId === issue.id,
					onDragStart: () => setDragId(issue.id),
					onDragEnd: () => {
						setDragId(null);
						setOverStatus(null);
					},
					onClick: () => selectIssue(issue.id)
				}, issue.id)), colIssues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-dashed border-border px-3 py-8 text-center text-xs text-muted-foreground",
					children: "拖入工作项"
				}) : null]
			})]
		}, status.id))
	});
}
function IssueCard({ issue, selected, dragging, onDragStart, onDragEnd, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		draggable: true,
		onDragStart: (e) => {
			e.dataTransfer.effectAllowed = "move";
			e.dataTransfer.setData("text/plain", issue.id);
			onDragStart();
		},
		onDragEnd,
		onClick,
		className: cn("cursor-grab rounded-lg border border-border bg-card p-3 shadow-sm transition-all active:cursor-grabbing", "hover:border-primary/30 hover:shadow-md", selected && "border-primary ring-2 ring-primary/20", dragging && "opacity-50"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium leading-snug text-foreground",
					children: issue.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityIcon, { priority: issue.priority })]
			}),
			issue.labels.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelChips, {
					labels: issue.labels,
					max: 2
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeIcon, { type: issue.type }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueKey, { issue })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [issue.storyPoints != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground",
						children: issue.storyPoints
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
						userId: issue.assigneeId,
						size: "sm"
					})]
				})]
			})
		]
	});
}
function ListView() {
	const groupBy = useViewStore((s) => s.draft.groupBy);
	const visibleColumns = useViewStore((s) => s.draft.visibleColumns);
	const issues = useFilteredIssues();
	const selectIssue = useViewStore((s) => s.selectIssue);
	const selectedIssueId = useViewStore((s) => s.selectedIssueId);
	const columns = visibleColumns.filter((c) => COLUMN_LABELS[c]);
	const groups = (0, import_react.useMemo)(() => groupIssues(issues, groupBy), [issues, groupBy]);
	if (issues.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full items-center justify-center p-8 text-sm text-muted-foreground",
		children: "没有匹配的工作项。试试调整筛选条件。"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "scrollbar-thin h-full overflow-auto p-3 sm:p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[720px] border-collapse text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "sticky top-0 z-10 bg-secondary/90 backdrop-blur",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b border-border",
						children: columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: cn("px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground", col === "title" && "min-w-[200px]"),
							children: COLUMN_LABELS[col]
						}, col))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupRows, {
					label: group.label,
					issues: group.issues,
					columns,
					showHeader: groupBy !== "none",
					selectedIssueId,
					onSelect: selectIssue
				}, group.key)) })]
			})
		})
	});
}
function GroupRows({ label, issues, columns, showHeader, selectedIssueId, onSelect }) {
	const [open, setOpen] = (0, import_react.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [showHeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
		className: "bg-muted/50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			colSpan: columns.length,
			className: "px-3 py-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen((v) => !v),
				className: "inline-flex items-center gap-1.5 text-xs font-semibold text-foreground",
				children: [
					open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" }),
					label,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-normal text-muted-foreground",
						children: [
							"(",
							issues.length,
							")"
						]
					})
				]
			})
		})
	}) : null, open ? issues.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
		onClick: () => onSelect(issue.id),
		className: cn("cursor-pointer border-b border-border/70 transition-colors last:border-0 hover:bg-accent/40", selectedIssueId === issue.id && "bg-accent/60"),
		children: columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: "px-3 py-2.5 align-middle",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
				issue,
				col
			})
		}, col))
	}, issue.id)) : null] });
}
function Cell({ issue, col }) {
	switch (col) {
		case "key": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueKey, { issue });
		case "type": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeIcon, { type: issue.type }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted-foreground",
				children: TYPE_META[issue.type].label
			})]
		});
		case "title": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: issue.title
		});
		case "status": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: issue.status });
		case "assignee": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
				userId: issue.assigneeId,
				size: "sm"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted-foreground",
				children: issue.assigneeId ? USERS.find((u) => u.id === issue.assigneeId)?.name : "未分配"
			})]
		});
		case "priority": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityIcon, {
			priority: issue.priority,
			showLabel: true
		});
		case "labels": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelChips, {
			labels: issue.labels,
			max: 2
		});
		case "storyPoints": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-xs text-muted-foreground",
			children: issue.storyPoints ?? "—"
		});
		case "created": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted-foreground",
			children: formatRelative(issue.createdAt)
		});
		case "updated": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted-foreground",
			children: formatRelative(issue.updatedAt)
		});
		case "dueDate": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted-foreground",
			children: issue.dueDate ?? "—"
		});
		default: return null;
	}
}
function groupIssues(issues, groupBy) {
	if (groupBy === "none") return [{
		key: "all",
		label: "全部",
		issues
	}];
	const map = /* @__PURE__ */ new Map();
	for (const issue of issues) {
		let key = "";
		if (groupBy === "status") key = issue.status;
		else if (groupBy === "assignee") key = issue.assigneeId ?? "unassigned";
		else if (groupBy === "priority") key = issue.priority;
		else if (groupBy === "type") key = issue.type;
		const list = map.get(key) ?? [];
		list.push(issue);
		map.set(key, list);
	}
	return Array.from(map.entries()).map(([key, list]) => {
		let label = key;
		if (groupBy === "status") label = STATUSES.find((s) => s.id === key)?.name ?? key;
		else if (groupBy === "assignee") label = key === "unassigned" ? "未分配" : USERS.find((u) => u.id === key)?.name ?? key;
		else if (groupBy === "priority") label = PRIORITY_META[key]?.label ?? key;
		else if (groupBy === "type") label = TYPE_META[key]?.label ?? key;
		return {
			key,
			label,
			issues: list
		};
	});
}
function TimelineView() {
	const issues = useFilteredIssues();
	const selectIssue = useViewStore((s) => s.selectIssue);
	const selectedIssueId = useViewStore((s) => s.selectedIssueId);
	const { rangeStart, rangeEnd, rows, ticks } = (0, import_react.useMemo)(() => {
		const withDates = issues.map((issue) => {
			const start = new Date(issue.createdAt);
			return {
				issue,
				start,
				end: issue.dueDate ? /* @__PURE__ */ new Date(issue.dueDate + "T23:59:59Z") : new Date(start.getTime() + 14 * 864e5)
			};
		});
		if (withDates.length === 0) {
			const now = /* @__PURE__ */ new Date();
			return {
				rangeStart: now,
				rangeEnd: new Date(now.getTime() + 30 * 864e5),
				rows: [],
				ticks: []
			};
		}
		let min = Math.min(...withDates.map((r) => r.start.getTime()));
		let max = Math.max(...withDates.map((r) => r.end.getTime()));
		min -= 3 * 864e5;
		max += 3 * 864e5;
		const rangeStart = new Date(min);
		const rangeEnd = new Date(max);
		const span = max - min || 1;
		const ticks = [];
		const step = Math.max(span / 6, 7 * 864e5);
		for (let t = min; t <= max; t += step) ticks.push(new Date(t));
		return {
			rangeStart,
			rangeEnd,
			rows: withDates.sort((a, b) => a.start.getTime() - b.start.getTime()).map((r) => {
				const left = (r.start.getTime() - min) / span * 100;
				const width = Math.max((r.end.getTime() - r.start.getTime()) / span * 100, 2);
				return {
					...r,
					left,
					width
				};
			}),
			ticks
		};
	}, [issues]);
	if (issues.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full items-center justify-center p-8 text-sm text-muted-foreground",
		children: "没有匹配的工作项。"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "scrollbar-thin h-full overflow-auto p-3 sm:p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex border-b border-border bg-secondary/60 px-3 py-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-[220px] shrink-0 font-semibold sm:w-[280px]",
					children: "工作项"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative min-h-6 flex-1",
					children: ticks.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-0 -translate-x-1/2 font-medium",
						style: { left: `${(t.getTime() - rangeStart.getTime()) / (rangeEnd.getTime() - rangeStart.getTime() || 1) * 100}%` },
						children: t.toLocaleDateString("zh-CN", {
							month: "short",
							day: "numeric"
						})
					}, i))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-border",
				children: rows.map(({ issue, left, width }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => selectIssue(issue.id),
					className: cn("flex w-full items-center px-3 py-2.5 text-left transition-colors hover:bg-accent/40", selectedIssueId === issue.id && "bg-accent/50"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-[220px] shrink-0 items-center gap-2 sm:w-[280px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeIcon, { type: issue.type }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-medium",
									children: issue.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueKey, { issue }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityIcon, { priority: issue.priority })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative h-8 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-1/2 h-6 -translate-y-1/2 rounded-md bg-primary/15 ring-1 ring-primary/30",
								style: {
									left: `${left}%`,
									width: `${width}%`
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-full items-center gap-1.5 overflow-hidden px-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
										userId: issue.assigneeId,
										size: "sm"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden truncate text-[11px] font-medium text-primary sm:inline",
										children: issue.dueDate ?? "无截止日期"
									})]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ml-2 hidden shrink-0 md:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: issue.status })
						})
					]
				}, issue.id))
			})]
		})
	});
}
function IssuePanel() {
	const selectedIssueId = useViewStore((s) => s.selectedIssueId);
	const issues = useViewStore((s) => s.issues);
	const selectIssue = useViewStore((s) => s.selectIssue);
	const updateIssue = useViewStore((s) => s.updateIssue);
	const moveIssue = useViewStore((s) => s.moveIssue);
	const issue = issues.find((i) => i.id === selectedIssueId);
	if (!issue) return null;
	const reporter = USERS.find((u) => u.id === issue.reporterId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex h-full w-full flex-col border-l border-border bg-card sm:w-[360px] sm:shrink-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-2 border-b border-border px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeIcon, { type: issue.type }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs font-medium text-muted-foreground",
							children: issue.key
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: TYPE_META[issue.type].label
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold leading-snug",
					children: issue.title
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				onClick: () => selectIssue(null),
				"aria-label": "关闭",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scrollbar-thin flex-1 space-y-5 overflow-y-auto p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
					children: "描述"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-foreground/90",
					children: issue.description
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "状态",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-8 w-full rounded-md border border-input bg-card px-2 text-sm",
								value: issue.status,
								onChange: (e) => moveIssue(issue.id, e.target.value),
								children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: s.name
								}, s.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "优先级",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-8 w-full rounded-md border border-input bg-card px-2 text-sm",
								value: issue.priority,
								onChange: (e) => updateIssue(issue.id, { priority: e.target.value }),
								children: Object.keys(PRIORITY_META).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: p,
									children: PRIORITY_META[p].label
								}, p))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "经办人",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "h-8 w-full rounded-md border border-input bg-card px-2 text-sm",
								value: issue.assigneeId ?? "",
								onChange: (e) => updateIssue(issue.id, { assigneeId: e.target.value || null }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "未分配"
								}), USERS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: u.id,
									children: u.name
								}, u.id))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "故事点",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-8 items-center rounded-md border border-border bg-secondary px-2 font-mono text-sm",
								children: issue.storyPoints ?? "—"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
					children: "标签"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelChips, {
					labels: issue.labels,
					max: 10
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-2 rounded-lg border border-border bg-secondary/40 p-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
							label: "报告人",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
									userId: issue.reporterId,
									size: "sm"
								}), reporter?.name]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
							label: "优先级",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityIcon, {
								priority: issue.priority,
								showLabel: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
							label: "截止日期",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: issue.dueDate ?? "无"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
							label: "创建",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: formatRelative(issue.createdAt)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
							label: "更新",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: formatRelative(issue.updatedAt)
							})
						})
					]
				})
			]
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-1 text-[11px] font-medium text-muted-foreground",
		children: label
	}), children] });
}
function MetaRow({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm",
			children
		})]
	});
}
var TooltipProvider = TooltipProvider$1;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent$1, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md bg-sidebar px-2.5 py-1.5 text-xs text-sidebar-foreground shadow-md animate-in fade-in-0 zoom-in-95", className),
	...props
}) }));
TooltipContent.displayName = TooltipContent$1.displayName;
function AppShell() {
	const draft = useViewStore((s) => s.draft);
	const selectedIssueId = useViewStore((s) => s.selectedIssueId);
	const sidebarOpen = useViewStore((s) => s.sidebarOpen);
	const setSidebarOpen = useViewStore((s) => s.setSidebarOpen);
	const selectIssue = useViewStore((s) => s.selectIssue);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.key === "Escape") selectIssue(null);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [selectIssue]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
		delayDuration: 300,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-dvh overflow-hidden bg-background",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden h-full lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
				}),
				sidebarOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fixed inset-0 z-40 flex lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute inset-0 bg-foreground/40",
						"aria-label": "关闭侧栏",
						onClick: () => setSidebarOpen(false)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative z-10 h-full shadow-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
							className: "min-w-0 flex-1 overflow-hidden",
							children: [
								draft.type === "board" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardView, {}) : null,
								draft.type === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListView, {}) : null,
								draft.type === "timeline" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineView, {}) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("hidden h-full transition-all md:block", selectedIssueId ? "md:w-[360px]" : "md:w-0 overflow-hidden"),
							children: selectedIssueId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssuePanel, {}) : null
						})]
					})]
				}),
				selectedIssueId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 flex flex-col bg-card md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssuePanel, {})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "bottom-right",
					richColors: true,
					closeButton: true
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };

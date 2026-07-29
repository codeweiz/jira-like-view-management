import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Columns3,
  Copy,
  Eraser,
  Filter,
  GanttChart,
  LayoutDashboard,
  List,
  Pencil,
  Plus,
  Save,
  Search,
  ArrowUpDown,
  Layers,
  LayoutList,
  Lock,
  Star,
  Trash2,
  UserRound,
  WrapText,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ALL_LABELS,
  COLUMN_LABELS,
  CURRENT_USER_ID,
  PRIORITY_META,
  STATUSES,
  TYPE_META,
  USERS,
  type GroupBy,
  type Priority,
  type SortBy,
  type StatusId,
  type ViewType,
  type IssueType,
} from "@/data/seed";
import { countActiveFilters, isSystemView, useViewStore } from "@/store/view-store";
import { useFilteredIssues } from "@/hooks/use-filtered-issues";
import { cn } from "@/lib/utils";

const layoutModes: { id: ViewType; label: string; icon: ReactNode }[] = [
  { id: "board", label: "看板", icon: <LayoutDashboard className="size-3.5" /> },
  { id: "list", label: "列表", icon: <List className="size-3.5" /> },
  { id: "timeline", label: "时间线", icon: <GanttChart className="size-3.5" /> },
];

const groupOptions: { id: GroupBy; label: string }[] = [
  { id: "none", label: "不分组" },
  { id: "status", label: "状态" },
  { id: "assignee", label: "经办人" },
  { id: "priority", label: "优先级" },
  { id: "type", label: "类型" },
];

const sortOptions: { id: SortBy; label: string }[] = [
  { id: "priority", label: "优先级" },
  { id: "updated", label: "更新时间" },
  { id: "created", label: "创建时间" },
  { id: "key", label: "键值" },
  { id: "title", label: "摘要" },
];

type ViewOverflowMode = "scroll" | "wrap";
const VIEW_OVERFLOW_KEY = "vb-view-overflow";

export function Toolbar() {
  const views = useViewStore((s) => s.views);
  const activeViewId = useViewStore((s) => s.activeViewId);
  const draft = useViewStore((s) => s.draft);
  const dirty = useViewStore((s) => s.dirty);
  const totalCount = useViewStore((s) => s.issues.length);
  const setViewType = useViewStore((s) => s.setViewType);
  const setSearch = useViewStore((s) => s.setSearch);
  const setGroupBy = useViewStore((s) => s.setGroupBy);
  const setSort = useViewStore((s) => s.setSort);
  const toggleFilterValue = useViewStore((s) => s.toggleFilterValue);
  const setFilterField = useViewStore((s) => s.setFilterField);
  const clearFilters = useViewStore((s) => s.clearFilters);
  const toggleColumn = useViewStore((s) => s.toggleColumn);
  const selectView = useViewStore((s) => s.selectView);
  const createView = useViewStore((s) => s.createView);
  const saveDraftToView = useViewStore((s) => s.saveDraftToView);
  const renameView = useViewStore((s) => s.renameView);
  const deleteView = useViewStore((s) => s.deleteView);
  const duplicateView = useViewStore((s) => s.duplicateView);
  const toggleStar = useViewStore((s) => s.toggleStar);
  const setDefaultView = useViewStore((s) => s.setDefaultView);
  const reorderViews = useViewStore((s) => s.reorderViews);

  const filteredCount = useFilteredIssues().length;
  const activeFilters = countActiveFilters(draft.filters);
  const activeView = views.find((v) => v.id === activeViewId);
  const systemActive = isSystemView(activeView);

  const [filterOpen, setFilterOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [viewQuery, setViewQuery] = useState("");
  const [assigneeQuery, setAssigneeQuery] = useState("");
  const [labelQuery, setLabelQuery] = useState("");
  const [overflowMode, setOverflowMode] = useState<ViewOverflowMode>("scroll");
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(VIEW_OVERFLOW_KEY) as ViewOverflowMode | null;
      if (saved === "scroll" || saved === "wrap") setOverflowMode(saved);
    } catch {
      /* ignore */
    }
  }, []);

  function setOverflow(mode: ViewOverflowMode) {
    setOverflowMode(mode);
    try {
      localStorage.setItem(VIEW_OVERFLOW_KEY, mode);
    } catch {
      /* ignore */
    }
  }

  /** Display order = array order (manual drag). Star is badge only. */
  const orderedViews = views;

  const filteredViewList = useMemo(() => {
    const q = viewQuery.trim().toLowerCase();
    if (!q) return orderedViews;
    return orderedViews.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        (v.description ?? "").toLowerCase().includes(q),
    );
  }, [orderedViews, viewQuery]);

  const assigneesSorted = useMemo(() => {
    const q = assigneeQuery.trim().toLowerCase().replace(/\s+/g, "");
    return USERS.filter((u) => {
      if (!q) return true;
      return (
        u.name.includes(assigneeQuery.trim()) ||
        u.pinyin.replace(/\s+/g, "").includes(q) ||
        u.py.includes(q) ||
        u.initials.includes(q)
      );
    });
  }, [assigneeQuery]);

  const labelsFiltered = useMemo(() => {
    const q = labelQuery.trim().toLowerCase();
    if (!q) return ALL_LABELS;
    return ALL_LABELS.filter((l) => l.toLowerCase().includes(q));
  }, [labelQuery]);

  const currentUser = USERS.find((u) => u.id === CURRENT_USER_ID)!;

  const activeGroups = useMemo(() => {
    const groups: { key: string; label: string; onClear: () => void }[] = [];
    if (draft.filters.statuses.length) {
      groups.push({
        key: "statuses",
        label: `状态：${draft.filters.statuses
          .map((id) => STATUSES.find((s) => s.id === id)?.name ?? id)
          .join("、")}`,
        onClear: () => setFilterField("statuses", []),
      });
    }
    if (draft.filters.priorities.length) {
      groups.push({
        key: "priorities",
        label: `优先级：${draft.filters.priorities
          .map((p) => PRIORITY_META[p].label)
          .join("、")}`,
        onClear: () => setFilterField("priorities", []),
      });
    }
    if (draft.filters.types.length) {
      groups.push({
        key: "types",
        label: `类型：${draft.filters.types.map((t) => TYPE_META[t].label).join("、")}`,
        onClear: () => setFilterField("types", []),
      });
    }
    if (draft.filters.assignees.length) {
      groups.push({
        key: "assignees",
        label: `经办人：${draft.filters.assignees
          .map((id) => {
            if (id === "unassigned") return "未分配";
            if (id === CURRENT_USER_ID) return `当前用户(${currentUser.name})`;
            return USERS.find((u) => u.id === id)?.name ?? id;
          })
          .join("、")}`,
        onClear: () => setFilterField("assignees", []),
      });
    }
    if (draft.filters.labels.length) {
      groups.push({
        key: "labels",
        label: `标签：${draft.filters.labels.join("、")}`,
        onClear: () => setFilterField("labels", []),
      });
    }
    if (draft.filters.search.trim()) {
      groups.push({
        key: "search",
        label: `关键字：${draft.filters.search.trim()}`,
        onClear: () => setSearch(""),
      });
    }
    return groups;
  }, [draft.filters, currentUser.name, setFilterField, setSearch]);

  function handleCreate() {
    createView({ name: newName.trim() || "未命名视图", type: draft.type });
    setCreateOpen(false);
    setNewName("");
  }

  function assigneeSummary() {
    const n = draft.filters.assignees.length;
    if (n === 0) return "全部";
    if (n === 1) {
      const id = draft.filters.assignees[0]!;
      if (id === "unassigned") return "未分配";
      if (id === CURRENT_USER_ID) return "当前用户";
      return USERS.find((u) => u.id === id)?.name ?? "1 人";
    }
    return `已选 ${n}`;
  }

  function labelSummary() {
    const n = draft.filters.labels.length;
    if (n === 0) return "全部";
    if (n === 1) return draft.filters.labels[0]!;
    return `已选 ${n}`;
  }

  const toolBtn =
    "h-7 gap-1 px-2.5 text-xs border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground";

  return (
    <div className="border-b border-border bg-card">
      {/* ── Layer 1: views (no label) + fixed 总览 ── */}
      <div className="flex items-start gap-1.5 border-b border-border/70 px-2.5 py-1.5 sm:px-3">
        <div
          className={cn(
            "min-w-0 flex-1 gap-1.5",
            overflowMode === "scroll"
              ? "scrollbar-thin flex items-center overflow-x-auto"
              : "flex flex-wrap items-center",
          )}
          role="tablist"
          aria-label="筛选视图"
        >
          {orderedViews.map((v) => {
            const active = v.id === activeViewId;
            const system = v.scope === "system";
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={active}
                draggable
                title={
                  system
                    ? "系统视图 · 只读 · 可拖拽排序 · 可另存为私有"
                    : "私有视图 · 可编辑 · 可拖拽排序"
                }
                onDragStart={(e) => {
                  setDragId(v.id);
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData("text/plain", v.id);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverId(v.id);
                }}
                onDragLeave={() =>
                  setDragOverId((cur) => (cur === v.id ? null : cur))
                }
                onDrop={(e) => {
                  e.preventDefault();
                  const from = e.dataTransfer.getData("text/plain") || dragId;
                  if (from) reorderViews(from, v.id);
                  setDragId(null);
                  setDragOverId(null);
                }}
                onDragEnd={() => {
                  setDragId(null);
                  setDragOverId(null);
                }}
                onClick={() => selectView(v.id)}
                className={cn(
                  "inline-flex h-7 max-w-[180px] shrink-0 cursor-grab items-center gap-1 rounded-md border px-2.5 text-xs font-medium transition-colors active:cursor-grabbing",
                  active
                    ? "border-primary/30 bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
                  dragOverId === v.id && dragId !== v.id && "ring-2 ring-primary/30",
                  dragId === v.id && "opacity-50",
                )}
              >
                {v.starred ? (
                  <Star className="size-3 shrink-0 fill-current text-amber-500" />
                ) : null}
                {system ? (
                  <Lock className="size-3 shrink-0 text-muted-foreground/70" />
                ) : null}
                <span className="truncate">{v.name}</span>
                {system ? (
                  <span
                    className={cn(
                      "shrink-0 rounded px-1 py-px text-[10px] font-normal",
                      active
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    系统
                  </span>
                ) : (
                  <span
                    className={cn(
                      "shrink-0 rounded px-1 py-px text-[10px] font-normal",
                      active
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    私有
                  </span>
                )}
                {active && dirty ? (
                  <span className="size-1.5 shrink-0 rounded-full bg-warning" />
                ) : null}
              </button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            className={cn(toolBtn, "shrink-0")}
            onClick={() => setCreateOpen(true)}
          >
            <Plus className="size-3.5" />
            另存
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {dirty && !systemActive ? (
            <Button size="sm" className="h-7 px-2.5 text-xs" onClick={() => saveDraftToView()}>
              <Save className="size-3.5" />
              更新
            </Button>
          ) : null}
          {dirty && systemActive ? (
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2.5 text-xs"
              onClick={() => setCreateOpen(true)}
              title="系统视图不可修改，请另存为私有"
            >
              <Plus className="size-3.5" />
              另存为私有
            </Button>
          ) : null}
          <span className="hidden text-[11px] tabular-nums text-muted-foreground sm:inline">
            {filteredCount}/{totalCount}
          </span>

          <DropdownMenu
            open={overviewOpen}
            onOpenChange={(open) => {
              setOverviewOpen(open);
              if (!open) setViewQuery("");
            }}
          >
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={cn(toolBtn, "shrink-0")}>
                <LayoutList className="size-3.5" />
                总览
                <ChevronDown className="size-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-0">
              <div className="border-b border-border p-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={viewQuery}
                    onChange={(e) => setViewQuery(e.target.value)}
                    placeholder="搜索视图名称 / 描述…"
                    className="h-8 pl-7 text-xs"
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto py-1">
                {filteredViewList.length === 0 ? (
                  <div className="px-3 py-6 text-center text-xs text-muted-foreground">
                    无匹配视图
                  </div>
                ) : (
                  filteredViewList.map((v) => (
                    <div
                      key={v.id}
                      className={cn(
                        "group flex items-center gap-0.5 px-1",
                        v.id === activeViewId && "bg-accent/50",
                      )}
                    >
                      <button
                        type="button"
                        className="flex min-w-0 flex-1 items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent"
                        onClick={() => {
                          selectView(v.id);
                          setOverviewOpen(false);
                        }}
                      >
                        {v.scope === "system" ? (
                          <Lock className="size-3.5 shrink-0 text-muted-foreground" />
                        ) : (
                          <UserRound className="size-3.5 shrink-0 text-muted-foreground" />
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1">
                            <span className="truncate font-medium">{v.name}</span>
                            {v.starred ? (
                              <Star className="size-3 fill-current text-amber-500" />
                            ) : null}
                          </span>
                          <span className="block truncate text-[11px] text-muted-foreground">
                            {v.scope === "system" ? "系统" : "私有"}
                            {v.description ? ` · ${v.description}` : ""}
                          </span>
                        </span>
                        {v.id === activeViewId ? (
                          <Check className="size-3.5 shrink-0 text-primary" />
                        ) : null}
                      </button>
                      <button
                        type="button"
                        className="rounded p-1 text-muted-foreground opacity-0 hover:bg-muted group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(v.id);
                        }}
                      >
                        <Star
                          className={cn(
                            "size-3.5",
                            v.starred && "fill-current text-amber-500",
                          )}
                        />
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div className="space-y-0.5 border-t border-border p-1">
                <DropdownMenuLabel className="text-[10px] font-normal text-muted-foreground">
                  视图条超出时 · 收藏仅作标记，顺序以拖拽为准
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => setOverflow("scroll")}
                  className={cn(overflowMode === "scroll" && "bg-accent")}
                >
                  <LayoutList /> 横向滚动
                  {overflowMode === "scroll" ? (
                    <Check className="ml-auto size-3.5" />
                  ) : null}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setOverflow("wrap")}
                  className={cn(overflowMode === "wrap" && "bg-accent")}
                >
                  <WrapText /> 自动换行
                  {overflowMode === "wrap" ? (
                    <Check className="ml-auto size-3.5" />
                  ) : null}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setCreateOpen(true)}>
                  <Plus /> 另存为私有视图…
                </DropdownMenuItem>
                {dirty && !systemActive ? (
                  <DropdownMenuItem onClick={() => saveDraftToView()}>
                    <Save /> 更新当前视图
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem onClick={() => duplicateView(activeViewId)}>
                  <Copy /> 复制为私有
                </DropdownMenuItem>
                {!systemActive ? (
                  <DropdownMenuItem
                    onClick={() => {
                      setRenameId(activeViewId);
                      setRenameValue(draft.name);
                    }}
                  >
                    <Pencil /> 重命名
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem onClick={() => setDefaultView(activeViewId)}>
                  <Check /> 设为默认
                </DropdownMenuItem>
                {!systemActive ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => deleteView(activeViewId)}
                    >
                      <Trash2 /> 删除
                    </DropdownMenuItem>
                  </>
                ) : null}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ── Layer 2: search | 筛选  ……  分组 排序 列 布局 ── */}
      <div className="flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 sm:px-3">
        <div className="relative min-w-[140px] flex-1 sm:max-w-[240px]">
          <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={draft.filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索键值 / 摘要…"
            className="h-7 pl-7 text-xs"
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          className={cn(
            toolBtn,
            (filterOpen || activeFilters > 0) &&
              "border-primary/30 bg-accent/50 text-accent-foreground",
          )}
          onClick={() => setFilterOpen((o) => !o)}
        >
          <Filter className="size-3.5" />
          筛选
          {activeFilters > 0 ? (
            <span className="inline-flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {activeFilters}
            </span>
          ) : null}
          {filterOpen ? (
            <ChevronUp className="size-3.5 opacity-60" />
          ) : (
            <ChevronDown className="size-3.5 opacity-60" />
          )}
        </Button>

        <div className="ml-auto flex flex-wrap items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={toolBtn}>
                <Layers className="size-3.5" />
                <span className="hidden sm:inline">
                  {groupOptions.find((g) => g.id === draft.groupBy)?.label}
                </span>
                <span className="sm:hidden">分组</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {groupOptions.map((g) => (
                <DropdownMenuItem
                  key={g.id}
                  onClick={() => setGroupBy(g.id)}
                  className={cn(draft.groupBy === g.id && "bg-accent")}
                >
                  {g.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={toolBtn}>
                <ArrowUpDown className="size-3.5" />
                <span className="hidden sm:inline">
                  {sortOptions.find((s) => s.id === draft.sortBy)?.label}
                </span>
                <span className="sm:hidden">排序</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sortOptions.map((s) => (
                <DropdownMenuItem
                  key={s.id}
                  onClick={() => setSort(s.id)}
                  className={cn(draft.sortBy === s.id && "bg-accent")}
                >
                  {s.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSort(draft.sortBy, "asc")}>
                升序 {draft.sortDir === "asc" ? "✓" : ""}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort(draft.sortBy, "desc")}>
                降序 {draft.sortDir === "desc" ? "✓" : ""}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {draft.type === "list" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className={toolBtn}>
                  <Columns3 className="size-3.5" />
                  列
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {Object.entries(COLUMN_LABELS).map(([key, label]) => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    checked={draft.visibleColumns.includes(key)}
                    onCheckedChange={() => toggleColumn(key)}
                    onSelect={(e) => e.preventDefault()}
                    disabled={key === "title"}
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}

          {/* Layout as segmented outline buttons — same family as other tools */}
          <div className="inline-flex h-7 items-center rounded-md border border-border bg-card p-px">
            {layoutModes.map((m) => (
              <button
                key={m.id}
                type="button"
                title={m.label}
                onClick={() => setViewType(m.id)}
                className={cn(
                  "inline-flex h-6 items-center gap-1 rounded-[5px] px-2 text-xs font-medium transition-colors",
                  draft.type === m.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {m.icon}
                <span className="hidden lg:inline">{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Expanded filter panel ── */}
      {filterOpen ? (
        <div className="space-y-2.5 border-t border-border/70 bg-secondary/25 px-2.5 py-2.5 sm:px-3">
          {systemActive ? (
            <div className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-[11px] text-muted-foreground">
              <Lock className="size-3.5 shrink-0" />
              当前为系统视图（只读）。可改条件预览，但只能「另存为私有」，不能写回系统视图。
            </div>
          ) : null}

          <FilterRow label="状态">
            {STATUSES.map((s) => (
              <ToggleChip
                key={s.id}
                active={draft.filters.statuses.includes(s.id)}
                onClick={() => toggleFilterValue("statuses", s.id as StatusId)}
              >
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ background: s.color }}
                />
                {s.name}
              </ToggleChip>
            ))}
          </FilterRow>

          <FilterRow label="优先级">
            {(Object.keys(PRIORITY_META) as Priority[]).map((p) => (
              <ToggleChip
                key={p}
                active={draft.filters.priorities.includes(p)}
                onClick={() => toggleFilterValue("priorities", p)}
              >
                {PRIORITY_META[p].label}
              </ToggleChip>
            ))}
          </FilterRow>

          <FilterRow label="类型">
            {(Object.keys(TYPE_META) as IssueType[]).map((t) => (
              <ToggleChip
                key={t}
                active={draft.filters.types.includes(t)}
                onClick={() => toggleFilterValue("types", t)}
              >
                {TYPE_META[t].label}
              </ToggleChip>
            ))}
          </FilterRow>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <FilterRow label="经办人" compact>
              <DropdownMenu
                onOpenChange={(o) => {
                  if (!o) setAssigneeQuery("");
                }}
              >
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "inline-flex h-7 w-full min-w-[140px] items-center justify-between gap-1 rounded-md border bg-card px-2.5 text-left text-xs font-medium",
                      draft.filters.assignees.length > 0
                        ? "border-primary/30 text-foreground"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    <span className="truncate">{assigneeSummary()}</span>
                    <ChevronDown className="size-3.5 shrink-0 opacity-60" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-72 p-0">
                  <div className="border-b border-border p-2">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={assigneeQuery}
                        onChange={(e) => setAssigneeQuery(e.target.value)}
                        placeholder="姓名 / 拼音 / 首字母 csy"
                        className="h-8 pl-7 text-xs"
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1">
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-2.5 py-2 text-left text-sm hover:bg-accent"
                      onClick={() => setFilterField("assignees", [CURRENT_USER_ID])}
                    >
                      <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <UserRound className="size-3.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">当前用户</span>
                        <span className="block text-[11px] text-muted-foreground">
                          {currentUser.name} · {currentUser.py.toUpperCase()}
                        </span>
                      </span>
                    </button>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={draft.filters.assignees.includes("unassigned")}
                      onCheckedChange={() =>
                        toggleFilterValue("assignees", "unassigned")
                      }
                      onSelect={(e) => e.preventDefault()}
                    >
                      未分配
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuLabel className="text-[10px] font-normal text-muted-foreground">
                      按拼音首字母 · 可搜 py
                    </DropdownMenuLabel>
                    {assigneesSorted.map((u) => (
                      <DropdownMenuCheckboxItem
                        key={u.id}
                        checked={draft.filters.assignees.includes(u.id)}
                        onCheckedChange={() => toggleFilterValue("assignees", u.id)}
                        onSelect={(e) => e.preventDefault()}
                      >
                        <span
                          className="mr-1.5 inline-flex size-5 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                          style={{ background: u.color }}
                        >
                          {u.initials}
                        </span>
                        <span className="flex-1">{u.name}</span>
                        <span className="font-mono text-[10px] uppercase text-muted-foreground">
                          {u.py}
                        </span>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </FilterRow>

            <FilterRow label="标签" compact>
              <DropdownMenu
                onOpenChange={(o) => {
                  if (!o) setLabelQuery("");
                }}
              >
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "inline-flex h-7 w-full min-w-[140px] items-center justify-between gap-1 rounded-md border bg-card px-2.5 text-left text-xs font-medium",
                      draft.filters.labels.length > 0
                        ? "border-primary/30 text-foreground"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    <span className="truncate">{labelSummary()}</span>
                    <ChevronDown className="size-3.5 shrink-0 opacity-60" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 p-0">
                  <div className="border-b border-border p-2">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={labelQuery}
                        onChange={(e) => setLabelQuery(e.target.value)}
                        placeholder="搜索标签…"
                        className="h-8 pl-7 text-xs"
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="max-h-56 overflow-y-auto py-1">
                    {labelsFiltered.map((l) => (
                      <DropdownMenuCheckboxItem
                        key={l}
                        checked={draft.filters.labels.includes(l)}
                        onCheckedChange={() => toggleFilterValue("labels", l)}
                        onSelect={(e) => e.preventDefault()}
                      >
                        {l}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </FilterRow>

            <FilterRow label="关键字" compact>
              <Input
                value={draft.filters.search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="摘要、键值、描述…"
                className="h-7 text-xs"
              />
            </FilterRow>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-1.5 pt-0.5">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setFilterOpen(false)}
            >
              收起
            </Button>
            {activeFilters > 0 ? (
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => clearFilters()}
              >
                重置条件
              </Button>
            ) : null}
            {dirty && !systemActive ? (
              <Button size="sm" className="h-7 text-xs" onClick={() => saveDraftToView()}>
                更新视图
              </Button>
            ) : null}
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setCreateOpen(true)}
            >
              另存为私有
            </Button>
          </div>
        </div>
      ) : null}

      {/* ── Layer 3: merged active chips, clear icon at end ── */}
      {activeGroups.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1.5 border-t border-border/60 px-2.5 py-1.5 sm:px-3">
          {activeGroups.map((g) => (
            <ActiveChip key={g.key} label={g.label} onRemove={g.onClear} />
          ))}
          <button
            type="button"
            onClick={() => clearFilters()}
            className="ml-auto inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
            title="全部清除"
            aria-label="全部清除"
          >
            <Eraser className="size-3.5" />
          </button>
        </div>
      ) : null}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>另存为私有视图</DialogTitle>
            <DialogDescription>
              保存为你的私有视图（可编辑）。系统视图本身不会被修改。
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="例如：我的本周缺陷"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>
              取消
            </Button>
            <Button onClick={handleCreate}>保存为私有</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!renameId} onOpenChange={(o) => !o && setRenameId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>重命名视图</DialogTitle>
          </DialogHeader>
          <Input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && renameId && renameValue.trim()) {
                renameView(renameId, renameValue.trim());
                setRenameId(null);
              }
            }}
            autoFocus
          />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setRenameId(null)}>
              取消
            </Button>
            <Button
              onClick={() => {
                if (renameId && renameValue.trim()) {
                  renameView(renameId, renameValue.trim());
                }
                setRenameId(null);
              }}
            >
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FilterRow({
  label,
  children,
  compact,
}: {
  label: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex min-w-0 items-start gap-2", compact && "items-center")}>
      <div className="w-12 shrink-0 pt-1 text-right text-xs text-muted-foreground">
        {label}
      </div>
      <div className="flex min-w-0 flex-1 flex-wrap gap-1">{children}</div>
    </div>
  );
}

function ToggleChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-7 items-center gap-1 rounded-md border px-2 text-xs font-medium transition-colors",
        active
          ? "border-primary/30 bg-accent text-accent-foreground"
          : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex max-w-full items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 text-left text-[11px] font-medium leading-snug text-secondary-foreground transition-colors hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
      title="清除该组条件"
    >
      <span className="min-w-0 break-all">{label}</span>
      <X className="size-3 shrink-0 opacity-70" />
    </button>
  );
}

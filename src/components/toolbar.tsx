import { useMemo, useState, type ReactNode } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Columns3,
  Copy,
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
  Star,
  Trash2,
  UserRound,
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
import { countActiveFilters, useViewStore } from "@/store/view-store";
import { useFilteredIssues } from "@/hooks/use-filtered-issues";
import { cn } from "@/lib/utils";

const VISIBLE_VIEW_SLOTS = 4;

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

  const filteredCount = useFilteredIssues().length;
  const activeFilters = countActiveFilters(draft.filters);

  const [filterOpen, setFilterOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [viewQuery, setViewQuery] = useState("");
  const [assigneeQuery, setAssigneeQuery] = useState("");

  const orderedViews = useMemo(() => {
    const starred = views.filter((v) => v.starred);
    const rest = views.filter((v) => !v.starred);
    return [...starred, ...rest];
  }, [views]);

  const { pinViews, overflowCount } = useMemo(() => {
    const pins: typeof orderedViews = [];
    for (const v of orderedViews) {
      if (v.starred || v.id === activeViewId || v.isDefault) {
        if (!pins.some((p) => p.id === v.id) && pins.length < VISIBLE_VIEW_SLOTS) {
          pins.push(v);
        }
      }
    }
    // fill remaining slots with other views in order
    for (const v of orderedViews) {
      if (pins.length >= VISIBLE_VIEW_SLOTS) break;
      if (!pins.some((p) => p.id === v.id)) pins.push(v);
    }
    // ensure active always shown
    if (!pins.some((v) => v.id === activeViewId)) {
      const active = orderedViews.find((v) => v.id === activeViewId);
      if (active) {
        pins[pins.length - 1] = active;
      }
    }
    const pinIds = new Set(pins.map((p) => p.id));
    return {
      pinViews: pins,
      overflowCount: orderedViews.filter((v) => !pinIds.has(v.id)).length,
    };
  }, [orderedViews, activeViewId]);

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
      const py = u.pinyin.replace(/\s+/g, "");
      return (
        u.name.includes(assigneeQuery.trim()) ||
        py.includes(q) ||
        u.py.includes(q) ||
        u.initials.includes(q)
      );
    });
  }, [assigneeQuery]);

  const currentUser = USERS.find((u) => u.id === CURRENT_USER_ID)!;

  function handleCreate() {
    createView({ name: newName.trim() || "未命名视图", type: draft.type });
    setCreateOpen(false);
    setNewName("");
  }

  function summaryLabel(
    kind: "status" | "assignee" | "priority" | "type" | "label",
    count: number,
    empty: string,
  ) {
    if (count === 0) return empty;
    if (count === 1) {
      if (kind === "status") {
        const id = draft.filters.statuses[0]!;
        return STATUSES.find((s) => s.id === id)?.name ?? "1 项";
      }
      if (kind === "assignee") {
        const id = draft.filters.assignees[0]!;
        if (id === "unassigned") return "未分配";
        if (id === CURRENT_USER_ID) return `当前用户 · ${currentUser.name}`;
        return USERS.find((u) => u.id === id)?.name ?? "1 人";
      }
      if (kind === "priority") {
        return PRIORITY_META[draft.filters.priorities[0]!].label;
      }
      if (kind === "type") {
        return TYPE_META[draft.filters.types[0]!].label;
      }
      if (kind === "label") return draft.filters.labels[0]!;
    }
    return `已选 ${count} 项`;
  }

  return (
    <div className="border-b border-border bg-card">
      {/* Unified control row: views + search + filters + layout */}
      <div className="flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 sm:px-3">
        <span className="shrink-0 text-xs text-muted-foreground">视图</span>

        {pinViews.map((v) => {
          const active = v.id === activeViewId;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => selectView(v.id)}
              className={cn(
                "inline-flex h-7 max-w-[132px] shrink-0 items-center gap-1 rounded-md border px-2.5 text-xs font-medium transition-colors",
                active
                  ? "border-primary/30 bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {v.starred ? (
                <Star className="size-3 shrink-0 fill-current text-amber-500" />
              ) : null}
              <span className="truncate">{v.name}</span>
              {active && dirty ? (
                <span className="size-1.5 shrink-0 rounded-full bg-warning" />
              ) : null}
            </button>
          );
        })}

        <DropdownMenu
          onOpenChange={(open) => {
            if (!open) setViewQuery("");
          }}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 gap-1 px-2.5 text-xs">
              更多
              {overflowCount > 0 ? (
                <span className="text-muted-foreground">·{overflowCount}</span>
              ) : null}
              <ChevronDown className="size-3.5 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72 p-0">
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
                      onClick={() => selectView(v.id)}
                    >
                      <Star
                        className={cn(
                          "size-3.5 shrink-0",
                          v.starred
                            ? "fill-current text-amber-500"
                            : "text-muted-foreground/35",
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{v.name}</span>
                        {v.description ? (
                          <span className="block truncate text-[11px] text-muted-foreground">
                            {v.description}
                          </span>
                        ) : null}
                      </span>
                      {v.isDefault ? (
                        <span className="shrink-0 text-[10px] text-muted-foreground">
                          默认
                        </span>
                      ) : null}
                      {v.id === activeViewId ? (
                        <Check className="size-3.5 shrink-0 text-primary" />
                      ) : null}
                    </button>
                    <button
                      type="button"
                      className="rounded p-1 text-muted-foreground opacity-0 hover:bg-muted hover:text-foreground group-hover:opacity-100"
                      title={v.starred ? "取消星标" : "星标"}
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
              <DropdownMenuItem onClick={() => setCreateOpen(true)}>
                <Plus /> 另存为新视图…
              </DropdownMenuItem>
              {dirty ? (
                <DropdownMenuItem onClick={() => saveDraftToView()}>
                  <Save /> 更新当前视图
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuItem onClick={() => duplicateView(activeViewId)}>
                <Copy /> 复制当前视图
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setRenameId(activeViewId);
                  setRenameValue(draft.name);
                }}
              >
                <Pencil /> 重命名当前
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDefaultView(activeViewId)}>
                <Check /> 设为默认
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => deleteView(activeViewId)}
              >
                <Trash2 /> 删除当前
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1 px-2.5 text-xs"
          onClick={() => setCreateOpen(true)}
        >
          <Plus className="size-3.5" />
          另存
        </Button>

        <div className="mx-0.5 hidden h-4 w-px bg-border sm:block" />

        <div className="relative min-w-[120px] flex-1 sm:max-w-[200px]">
          <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={draft.filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="关键字 / 键值"
            className="h-7 pl-7 text-xs"
          />
        </div>

        <Button
          variant={filterOpen || activeFilters > 0 ? "secondary" : "outline"}
          size="sm"
          className="h-7 gap-1 px-2.5 text-xs"
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 gap-1 px-2.5 text-xs">
              <Layers className="size-3.5" />
              <span className="hidden md:inline">
                {groupOptions.find((g) => g.id === draft.groupBy)?.label}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
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
            <Button variant="outline" size="sm" className="h-7 gap-1 px-2.5 text-xs">
              <ArrowUpDown className="size-3.5" />
              <span className="hidden md:inline">
                {sortOptions.find((s) => s.id === draft.sortBy)?.label}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
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
              <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs">
                <Columns3 className="size-3.5" />
                列
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
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

        <div className="ml-auto flex items-center gap-1.5">
          <span className="hidden text-[11px] tabular-nums text-muted-foreground sm:inline">
            {filteredCount}/{totalCount}
          </span>
          <div className="flex h-7 items-center rounded-md border border-border bg-secondary p-0.5">
            {layoutModes.map((m) => (
              <button
                key={m.id}
                type="button"
                title={m.label}
                onClick={() => setViewType(m.id)}
                className={cn(
                  "inline-flex size-6 items-center justify-center rounded-[4px]",
                  draft.type === m.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {m.icon}
              </button>
            ))}
          </div>
          {dirty ? (
            <Button size="sm" className="h-7 px-2.5 text-xs" onClick={() => saveDraftToView()}>
              <Save className="size-3.5" />
              更新
            </Button>
          ) : null}
        </div>
      </div>

      {/* Expandable filter form — 2–3 columns, mixed controls */}
      {filterOpen ? (
        <div className="border-t border-border/70 bg-secondary/25 px-2.5 py-2.5 sm:px-3">
          <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2 xl:grid-cols-3">
            <Field label="状态">
              <MultiSelectTrigger
                summary={summaryLabel("status", draft.filters.statuses.length, "全部状态")}
                active={draft.filters.statuses.length > 0}
              >
                {STATUSES.map((s) => (
                  <DropdownMenuCheckboxItem
                    key={s.id}
                    checked={draft.filters.statuses.includes(s.id)}
                    onCheckedChange={() =>
                      toggleFilterValue("statuses", s.id as StatusId)
                    }
                    onSelect={(e) => e.preventDefault()}
                  >
                    <span
                      className="mr-1.5 inline-block size-1.5 rounded-full"
                      style={{ background: s.color }}
                    />
                    {s.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </MultiSelectTrigger>
            </Field>

            <Field label="经办人">
              <DropdownMenu
                onOpenChange={(o) => {
                  if (!o) setAssigneeQuery("");
                }}
              >
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "inline-flex h-7 w-full items-center justify-between gap-1 rounded-md border bg-card px-2.5 text-left text-xs font-medium",
                      draft.filters.assignees.length > 0
                        ? "border-primary/30 text-foreground"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    <span className="truncate">
                      {summaryLabel(
                        "assignee",
                        draft.filters.assignees.length,
                        "全部经办人",
                      )}
                    </span>
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
                      {draft.filters.assignees.length === 1 &&
                      draft.filters.assignees[0] === CURRENT_USER_ID ? (
                        <Check className="size-3.5 text-primary" />
                      ) : null}
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
                      按拼音首字母排序 · 支持 py 搜索
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
                        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                          {u.py}
                        </span>
                      </DropdownMenuCheckboxItem>
                    ))}
                    {assigneesSorted.length === 0 ? (
                      <div className="px-3 py-4 text-center text-xs text-muted-foreground">
                        无匹配用户
                      </div>
                    ) : null}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </Field>

            <Field label="优先级">
              <MultiSelectTrigger
                summary={summaryLabel(
                  "priority",
                  draft.filters.priorities.length,
                  "全部优先级",
                )}
                active={draft.filters.priorities.length > 0}
              >
                {(Object.keys(PRIORITY_META) as Priority[]).map((p) => (
                  <DropdownMenuCheckboxItem
                    key={p}
                    checked={draft.filters.priorities.includes(p)}
                    onCheckedChange={() => toggleFilterValue("priorities", p)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {PRIORITY_META[p].label}
                  </DropdownMenuCheckboxItem>
                ))}
              </MultiSelectTrigger>
            </Field>

            <Field label="类型">
              <MultiSelectTrigger
                summary={summaryLabel("type", draft.filters.types.length, "全部类型")}
                active={draft.filters.types.length > 0}
              >
                {(Object.keys(TYPE_META) as IssueType[]).map((t) => (
                  <DropdownMenuCheckboxItem
                    key={t}
                    checked={draft.filters.types.includes(t)}
                    onCheckedChange={() => toggleFilterValue("types", t)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {TYPE_META[t].label}
                  </DropdownMenuCheckboxItem>
                ))}
              </MultiSelectTrigger>
            </Field>

            <Field label="标签">
              <MultiSelectTrigger
                summary={summaryLabel("label", draft.filters.labels.length, "全部标签")}
                active={draft.filters.labels.length > 0}
              >
                {ALL_LABELS.map((l) => (
                  <DropdownMenuCheckboxItem
                    key={l}
                    checked={draft.filters.labels.includes(l)}
                    onCheckedChange={() => toggleFilterValue("labels", l)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {l}
                  </DropdownMenuCheckboxItem>
                ))}
              </MultiSelectTrigger>
            </Field>

            <Field label="关键字">
              <Input
                value={draft.filters.search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索摘要、键值、描述…"
                className="h-7 text-xs"
              />
            </Field>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center justify-end gap-1.5">
            <span className="mr-auto text-[11px] text-muted-foreground">
              生效条件显示在下方条带，点 × 可快速移除
            </span>
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
            {dirty ? (
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
              另存为视图
            </Button>
          </div>
        </div>
      ) : null}

      {/* Active filters strip */}
      {activeFilters > 0 ? (
        <div className="flex flex-wrap items-center gap-1.5 border-t border-border/60 px-2.5 py-1.5 sm:px-3">
          <span className="text-[11px] font-medium text-muted-foreground">已选</span>
          {draft.filters.statuses.map((id) => {
            const s = STATUSES.find((x) => x.id === id)!;
            return (
              <ActiveChip
                key={`st-${id}`}
                label={`状态: ${s.name}`}
                onRemove={() => toggleFilterValue("statuses", id)}
              />
            );
          })}
          {draft.filters.assignees.map((id) => {
            let name = "未分配";
            if (id === CURRENT_USER_ID) name = `当前用户(${currentUser.name})`;
            else if (id !== "unassigned") {
              name = USERS.find((u) => u.id === id)?.name ?? id;
            }
            return (
              <ActiveChip
                key={`as-${id}`}
                label={`经办人: ${name}`}
                onRemove={() => toggleFilterValue("assignees", id)}
              />
            );
          })}
          {draft.filters.priorities.map((p) => (
            <ActiveChip
              key={`pr-${p}`}
              label={`优先级: ${PRIORITY_META[p].label}`}
              onRemove={() => toggleFilterValue("priorities", p)}
            />
          ))}
          {draft.filters.types.map((t) => (
            <ActiveChip
              key={`ty-${t}`}
              label={`类型: ${TYPE_META[t].label}`}
              onRemove={() => toggleFilterValue("types", t)}
            />
          ))}
          {draft.filters.labels.map((l) => (
            <ActiveChip
              key={`lb-${l}`}
              label={`标签: ${l}`}
              onRemove={() => toggleFilterValue("labels", l)}
            />
          ))}
          {draft.filters.search.trim() ? (
            <ActiveChip
              label={`关键字: ${draft.filters.search}`}
              onRemove={() => setSearch("")}
            />
          ) : null}
          <button
            type="button"
            onClick={() => clearFilters()}
            className="ml-0.5 text-[11px] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            全部清除
          </button>
        </div>
      ) : null}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>另存为筛选视图</DialogTitle>
            <DialogDescription>
              保存当前筛选条件。之后可从视图条或「更多」中快速切换。
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="例如：我的待办、本周缺陷"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>
              取消
            </Button>
            <Button onClick={handleCreate}>保存</Button>
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

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <label className="w-12 shrink-0 text-right text-xs text-muted-foreground">
        {label}
      </label>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function MultiSelectTrigger({
  summary,
  active,
  children,
}: {
  summary: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex h-7 w-full items-center justify-between gap-1 rounded-md border bg-card px-2.5 text-left text-xs font-medium",
            active
              ? "border-primary/30 text-foreground"
              : "border-border text-muted-foreground",
          )}
        >
          <span className="truncate">{summary}</span>
          <ChevronDown className="size-3.5 shrink-0 opacity-60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-72 w-52 overflow-y-auto">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex h-6 items-center gap-1 rounded-md border border-border bg-secondary px-2 text-[11px] font-medium text-secondary-foreground transition-colors hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
      title="移除该条件"
    >
      {label}
      <X className="size-3 opacity-70" />
    </button>
  );
}

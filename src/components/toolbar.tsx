import { useState, type ReactNode } from "react";
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
  MoreHorizontal,
  Pencil,
  Plus,
  Save,
  Search,
  ArrowUpDown,
  Layers,
  Star,
  Trash2,
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

/**
 * Hybrid toolbar for lowest cognitive load:
 * 1) Views as scannable chips (overview) — not buried only in a dropdown
 * 2) Traditional multi-field filter form, collapsible (admin habit)
 * 3) Layout / save sit on the right of the same control plane
 *
 * Mental model:
 *   视图 = 已命名的条件快照（一键还原）
 *   筛选 = 当前临时条件（可展开编辑）
 *   布局 = 怎么看（正交）
 */
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

  // Expand filters by default when any filter is active (admin muscle memory)
  const [filterOpen, setFilterOpen] = useState(() => activeFilters > 0);
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const ordered = [
    ...views.filter((v) => v.starred),
    ...views.filter((v) => !v.starred),
  ];

  function handleCreate() {
    createView({ name: newName.trim() || "未命名视图", type: draft.type });
    setCreateOpen(false);
    setNewName("");
  }

  return (
    <div className="border-b border-border bg-card">
      {/* Row A: 视图全览 chips — scannable, low cost */}
      <div className="flex items-center gap-1.5 border-b border-border/70 px-2.5 py-1.5 sm:px-3">
        <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
          视图
        </span>
        <div
          className="scrollbar-thin flex min-w-0 flex-1 items-center gap-1 overflow-x-auto"
          role="tablist"
          aria-label="筛选视图"
        >
          {ordered.map((v) => {
            const active = v.id === activeViewId;
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectView(v.id)}
                className={cn(
                  "inline-flex h-6 shrink-0 items-center gap-1 rounded-md border px-2 text-[11px] font-medium transition-colors",
                  active
                    ? "border-primary/30 bg-accent text-accent-foreground"
                    : "border-transparent bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {v.starred ? (
                  <Star className="size-3 fill-current text-amber-500" />
                ) : null}
                <span className="max-w-[110px] truncate">{v.name}</span>
                {active && dirty ? (
                  <span className="size-1.5 rounded-full bg-warning" />
                ) : null}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex h-6 shrink-0 items-center gap-0.5 rounded-md px-1.5 text-[11px] text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Plus className="size-3" />
            另存
          </button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="size-6 shrink-0" aria-label="视图管理">
              <MoreHorizontal className="size-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              onClick={() => {
                setRenameId(activeViewId);
                setRenameValue(draft.name);
              }}
            >
              <Pencil /> 重命名
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => duplicateView(activeViewId)}>
              <Copy /> 复制
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleStar(activeViewId)}>
              <Star /> 星标切换
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
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden h-4 w-px bg-border sm:block" />

        <div className="flex items-center rounded border border-border bg-secondary p-px">
          {layoutModes.map((m) => (
            <button
              key={m.id}
              type="button"
              title={m.label}
              onClick={() => setViewType(m.id)}
              className={cn(
                "inline-flex size-6 items-center justify-center rounded-[3px]",
                draft.type === m.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m.icon}
            </button>
          ))}
        </div>

        <span className="hidden text-[11px] tabular-nums text-muted-foreground sm:inline">
          {filteredCount}/{totalCount}
        </span>

        {dirty ? (
          <Button size="sm" className="h-6 px-2 text-[11px]" onClick={() => saveDraftToView()}>
            <Save className="size-3" />
            更新
          </Button>
        ) : null}
      </div>

      {/* Row B: quick bar — search + toggle traditional filter form */}
      <div className="flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 sm:px-3">
        <div className="relative min-w-[140px] flex-1 sm:max-w-[220px]">
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
          className="h-7 gap-1 px-2 text-xs"
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
            <Button variant="outline" size="sm" className="h-7 gap-1 px-2 text-xs">
              <Layers className="size-3.5" />
              <span className="hidden md:inline">
                {groupOptions.find((g) => g.id === draft.groupBy)?.label}
              </span>
              <span className="md:hidden">分组</span>
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
            <Button variant="outline" size="sm" className="h-7 gap-1 px-2 text-xs">
              <ArrowUpDown className="size-3.5" />
              <span className="hidden md:inline">
                {sortOptions.find((s) => s.id === draft.sortBy)?.label}
              </span>
              <span className="md:hidden">排序</span>
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
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
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

        {activeFilters > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-muted-foreground"
            onClick={() => clearFilters()}
          >
            <X className="size-3.5" />
            重置
          </Button>
        ) : null}
      </div>

      {/* Row C: traditional filter form — label + multi-select chips per field */}
      {filterOpen ? (
        <div className="space-y-2 border-t border-border/70 bg-secondary/30 px-2.5 py-2 sm:px-3">
          <FilterField label="状态">
            {STATUSES.map((s) => (
              <ToggleChip
                key={s.id}
                active={draft.filters.statuses.includes(s.id)}
                onClick={() => toggleFilterValue("statuses", s.id as StatusId)}
              >
                <span
                  className="mr-1 inline-block size-1.5 rounded-full"
                  style={{ background: s.color }}
                />
                {s.name}
              </ToggleChip>
            ))}
          </FilterField>

          <FilterField label="经办人">
            <ToggleChip
              active={draft.filters.assignees.includes("unassigned")}
              onClick={() => toggleFilterValue("assignees", "unassigned")}
            >
              未分配
            </ToggleChip>
            {USERS.map((u) => (
              <ToggleChip
                key={u.id}
                active={draft.filters.assignees.includes(u.id)}
                onClick={() => toggleFilterValue("assignees", u.id)}
              >
                {u.name}
              </ToggleChip>
            ))}
          </FilterField>

          <FilterField label="优先级">
            {(Object.keys(PRIORITY_META) as Priority[]).map((p) => (
              <ToggleChip
                key={p}
                active={draft.filters.priorities.includes(p)}
                onClick={() => toggleFilterValue("priorities", p)}
              >
                {PRIORITY_META[p].label}
              </ToggleChip>
            ))}
          </FilterField>

          <FilterField label="类型">
            {(Object.keys(TYPE_META) as IssueType[]).map((t) => (
              <ToggleChip
                key={t}
                active={draft.filters.types.includes(t)}
                onClick={() => toggleFilterValue("types", t)}
              >
                {TYPE_META[t].label}
              </ToggleChip>
            ))}
          </FilterField>

          <FilterField label="标签">
            {ALL_LABELS.map((l) => (
              <ToggleChip
                key={l}
                active={draft.filters.labels.includes(l)}
                onClick={() => toggleFilterValue("labels", l)}
              >
                {l}
              </ToggleChip>
            ))}
          </FilterField>

          <div className="flex items-center justify-end gap-2 pt-0.5">
            <span className="mr-auto text-[11px] text-muted-foreground">
              改完后可「更新」当前视图，或「另存」为新视图
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-[11px]"
              onClick={() => setFilterOpen(false)}
            >
              收起
            </Button>
            {dirty ? (
              <Button size="sm" className="h-6 text-[11px]" onClick={() => saveDraftToView()}>
                更新视图
              </Button>
            ) : null}
            <Button
              variant="outline"
              size="sm"
              className="h-6 text-[11px]"
              onClick={() => setCreateOpen(true)}
            >
              另存为视图
            </Button>
          </div>
        </div>
      ) : null}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>另存为筛选视图</DialogTitle>
            <DialogDescription>
              把当前筛选条件存成命名视图，之后在顶栏一点即可切换，不必重新点选。
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

function FilterField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start gap-x-2 gap-y-1.5">
      <div className="w-12 shrink-0 pt-0.5 text-right text-[11px] font-medium text-muted-foreground sm:w-14">
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
        "inline-flex h-6 items-center rounded border px-2 text-[11px] font-medium transition-colors",
        active
          ? "border-primary/35 bg-accent text-accent-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/20 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

import type { ReactNode } from "react";
import {
  Columns3,
  Filter,
  GanttChart,
  LayoutDashboard,
  List,
  PanelLeft,
  Save,
  Search,
  ArrowUpDown,
  Layers,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
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

const viewTypes: { id: ViewType; label: string; icon: ReactNode }[] = [
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
  const filteredIssues = useFilteredIssues();
  const filteredCount = filteredIssues.length;

  const activeFilters = countActiveFilters(draft.filters);

  return (
    <div className="border-b border-border bg-card">
      <div className="flex flex-wrap items-center gap-2 px-3 py-2.5 sm:px-4">
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="打开侧栏"
        >
          <PanelLeft />
        </Button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">
              {draft.name}
            </h1>
            {dirty ? (
              <Badge variant="warning" className="shrink-0">
                未保存
              </Badge>
            ) : null}
            {draft.description ? (
              <span className="hidden truncate text-xs text-muted-foreground md:inline">
                {draft.description}
              </span>
            ) : null}
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            显示 {filteredCount} / {totalCount} 个工作项
          </div>
        </div>

        <div className="flex items-center rounded-md border border-border bg-secondary p-0.5">
          {viewTypes.map((vt) => (
            <button
              key={vt.id}
              type="button"
              onClick={() => setViewType(vt.id)}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 rounded-[5px] px-2.5 text-xs font-medium transition-colors",
                draft.type === vt.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {vt.icon}
              <span className="hidden sm:inline">{vt.label}</span>
            </button>
          ))}
        </div>

        {dirty ? (
          <Button size="sm" onClick={() => saveDraftToView()}>
            <Save className="size-3.5" />
            保存视图
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border/70 px-3 py-2 sm:px-4">
        <div className="relative min-w-[160px] flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={draft.filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索键值、摘要…"
            className="h-8 pl-8"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="size-3.5" />
              筛选
              {activeFilters > 0 ? (
                <span className="ml-0.5 inline-flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {activeFilters}
                </span>
              ) : null}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-h-80 w-56 overflow-y-auto">
            <DropdownMenuLabel>状态</DropdownMenuLabel>
            {STATUSES.map((s) => (
              <DropdownMenuCheckboxItem
                key={s.id}
                checked={draft.filters.statuses.includes(s.id)}
                onCheckedChange={() => toggleFilterValue("statuses", s.id as StatusId)}
                onSelect={(e) => e.preventDefault()}
              >
                {s.name}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>经办人</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={draft.filters.assignees.includes("unassigned")}
              onCheckedChange={() => toggleFilterValue("assignees", "unassigned")}
              onSelect={(e) => e.preventDefault()}
            >
              未分配
            </DropdownMenuCheckboxItem>
            {USERS.map((u) => (
              <DropdownMenuCheckboxItem
                key={u.id}
                checked={draft.filters.assignees.includes(u.id)}
                onCheckedChange={() => toggleFilterValue("assignees", u.id)}
                onSelect={(e) => e.preventDefault()}
              >
                {u.name}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>优先级</DropdownMenuLabel>
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
            <DropdownMenuSeparator />
            <DropdownMenuLabel>类型</DropdownMenuLabel>
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
            <DropdownMenuSeparator />
            <DropdownMenuLabel>标签</DropdownMenuLabel>
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
            {activeFilters > 0 ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => clearFilters()}>
                  <X className="size-3.5" /> 清除全部筛选
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Layers className="size-3.5" />
              <span className="hidden sm:inline">分组</span>
              <span className="text-muted-foreground">
                {groupOptions.find((g) => g.id === draft.groupBy)?.label}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {groupOptions.map((g) => (
              <DropdownMenuItem
                key={g.id}
                onClick={() => setGroupBy(g.id)}
                className={cn(draft.groupBy === g.id && "bg-accent text-accent-foreground")}
              >
                {g.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <ArrowUpDown className="size-3.5" />
              <span className="hidden sm:inline">排序</span>
              <span className="text-muted-foreground">
                {sortOptions.find((s) => s.id === draft.sortBy)?.label}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {sortOptions.map((s) => (
              <DropdownMenuItem
                key={s.id}
                onClick={() => setSort(s.id)}
                className={cn(draft.sortBy === s.id && "bg-accent text-accent-foreground")}
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
              <Button variant="outline" size="sm" className="h-8">
                <Columns3 className="size-3.5" />
                列
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>显示列</DropdownMenuLabel>
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
            className="h-8 text-muted-foreground"
            onClick={() => clearFilters()}
          >
            <X className="size-3.5" />
            清除筛选
          </Button>
        ) : null}
      </div>

      {activeFilters > 0 ? (
        <div className="flex flex-wrap gap-1.5 border-t border-border/50 px-3 py-2 sm:px-4">
          {draft.filters.statuses.map((id) => {
            const s = STATUSES.find((x) => x.id === id)!;
            return (
              <FilterChip
                key={`st-${id}`}
                label={`状态: ${s.name}`}
                onRemove={() => toggleFilterValue("statuses", id)}
              />
            );
          })}
          {draft.filters.assignees.map((id) => {
            const name =
              id === "unassigned"
                ? "未分配"
                : (USERS.find((u) => u.id === id)?.name ?? id);
            return (
              <FilterChip
                key={`as-${id}`}
                label={`经办人: ${name}`}
                onRemove={() => toggleFilterValue("assignees", id)}
              />
            );
          })}
          {draft.filters.priorities.map((p) => (
            <FilterChip
              key={`pr-${p}`}
              label={`优先级: ${PRIORITY_META[p].label}`}
              onRemove={() => toggleFilterValue("priorities", p)}
            />
          ))}
          {draft.filters.types.map((t) => (
            <FilterChip
              key={`ty-${t}`}
              label={`类型: ${TYPE_META[t].label}`}
              onRemove={() => toggleFilterValue("types", t)}
            />
          ))}
          {draft.filters.labels.map((l) => (
            <FilterChip
              key={`lb-${l}`}
              label={`标签: ${l}`}
              onRemove={() => toggleFilterValue("labels", l)}
            />
          ))}
          {draft.filters.search.trim() ? (
            <FilterChip
              label={`搜索: ${draft.filters.search}`}
              onRemove={() => setSearch("")}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground transition-colors hover:bg-muted"
    >
      {label}
      <X className="size-3 opacity-60" />
    </button>
  );
}

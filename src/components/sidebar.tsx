import { useMemo, useState, type ReactNode } from "react";
import {
  Copy,
  LayoutDashboard,
  List,
  MoreHorizontal,
  PanelLeftClose,
  Plus,
  Search,
  Star,
  StarOff,
  Trash2,
  GanttChart,
  Pencil,
  RotateCcw,
  Check,
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useViewStore } from "@/store/view-store";
import type { ViewType } from "@/data/seed";
import { cn } from "@/lib/utils";

const typeIcon: Record<ViewType, ReactNode> = {
  board: <LayoutDashboard className="size-3.5" />,
  list: <List className="size-3.5" />,
  timeline: <GanttChart className="size-3.5" />,
};

const typeLabel: Record<ViewType, string> = {
  board: "看板",
  list: "列表",
  timeline: "时间线",
};

export function Sidebar() {
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

  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newType, setNewType] = useState<ViewType>("board");
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? views.filter(
          (v) =>
            v.name.toLowerCase().includes(q) ||
            (v.description ?? "").toLowerCase().includes(q),
        )
      : views;
    const starred = list.filter((v) => v.starred);
    const rest = list.filter((v) => !v.starred);
    return { starred, rest };
  }, [views, query]);

  function handleCreate() {
    const name = newName.trim() || "未命名视图";
    createView({ name, description: newDesc.trim() || undefined, type: newType });
    setCreateOpen(false);
    setNewName("");
    setNewDesc("");
    setNewType("board");
  }

  function openRename(id: string, name: string) {
    setRenameId(id);
    setRenameValue(name);
  }

  function commitRename() {
    if (renameId && renameValue.trim()) {
      renameView(renameId, renameValue.trim());
    }
    setRenameId(null);
  }

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-border/40 bg-sidebar text-sidebar-foreground">
      <div className="flex items-center justify-between gap-2 px-3 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-sidebar-active font-bold text-white">
            V
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-white">ViewBoard</div>
            <div className="truncate text-[11px] text-sidebar-muted">视图管理 Demo</div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-sidebar-muted hover:bg-sidebar-hover hover:text-white lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="关闭侧栏"
        >
          <PanelLeftClose />
        </Button>
      </div>

      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-sidebar-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索视图…"
            className="h-8 w-full rounded-md border border-transparent bg-sidebar-hover pl-8 pr-2 text-sm text-white placeholder:text-sidebar-muted focus:border-sidebar-active focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-1">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-sidebar-muted">
          已保存视图
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-sidebar-muted hover:bg-sidebar-hover hover:text-white"
          onClick={() => setCreateOpen(true)}
          aria-label="新建视图"
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <nav className="scrollbar-thin flex-1 overflow-y-auto px-2 pb-3">
        {filtered.starred.length > 0 ? (
          <div className="mb-2">
            <div className="px-2 py-1 text-[11px] font-medium text-sidebar-muted">
              星标
            </div>
            {filtered.starred.map((v) => (
              <ViewRow
                key={v.id}
                id={v.id}
                name={v.name}
                type={v.type}
                starred={v.starred}
                isDefault={v.isDefault}
                active={v.id === activeViewId}
                onSelect={() => selectView(v.id)}
                onStar={() => toggleStar(v.id)}
                onDuplicate={() => duplicateView(v.id)}
                onDelete={() => deleteView(v.id)}
                onRename={() => openRename(v.id, v.name)}
                onDefault={() => setDefaultView(v.id)}
              />
            ))}
          </div>
        ) : null}

        <div>
          {filtered.starred.length > 0 ? (
            <div className="px-2 py-1 text-[11px] font-medium text-sidebar-muted">
              全部
            </div>
          ) : null}
          {filtered.rest.map((v) => (
            <ViewRow
              key={v.id}
              id={v.id}
              name={v.name}
              type={v.type}
              starred={v.starred}
              isDefault={v.isDefault}
              active={v.id === activeViewId}
              onSelect={() => selectView(v.id)}
              onStar={() => toggleStar(v.id)}
              onDuplicate={() => duplicateView(v.id)}
              onDelete={() => deleteView(v.id)}
              onRename={() => openRename(v.id, v.name)}
              onDefault={() => setDefaultView(v.id)}
            />
          ))}
          {filtered.starred.length === 0 && filtered.rest.length === 0 ? (
            <div className="px-3 py-6 text-center text-xs text-sidebar-muted">
              没有匹配的视图
            </div>
          ) : null}
        </div>
      </nav>

      <div className="border-t border-white/10 p-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-sidebar-muted hover:bg-sidebar-hover hover:text-white"
          onClick={() => resetDemo()}
        >
          <RotateCcw className="size-3.5" />
          重置演示数据
        </Button>
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新建视图</DialogTitle>
            <DialogDescription>
              基于当前筛选与配置创建命名视图，之后可随时切换。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                名称
              </label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="例如：本周缺陷"
                autoFocus
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                描述（可选）
              </label>
              <Input
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="简要说明此视图用途"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                视图类型
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["board", "list", "timeline"] as ViewType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setNewType(t)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-xs font-medium transition-colors",
                      newType === t
                        ? "border-primary bg-accent text-accent-foreground"
                        : "border-border bg-card text-muted-foreground hover:bg-secondary",
                    )}
                  >
                    {typeIcon[t]}
                    {typeLabel[t]}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>
              取消
            </Button>
            <Button onClick={handleCreate}>创建</Button>
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
            onKeyDown={(e) => e.key === "Enter" && commitRename()}
            autoFocus
          />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setRenameId(null)}>
              取消
            </Button>
            <Button onClick={commitRename}>
              <Check className="size-4" />
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}

function ViewRow({
  name,
  type,
  starred,
  isDefault,
  active,
  onSelect,
  onStar,
  onDuplicate,
  onDelete,
  onRename,
  onDefault,
}: {
  id: string;
  name: string;
  type: ViewType;
  starred: boolean;
  isDefault?: boolean;
  active: boolean;
  onSelect: () => void;
  onStar: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onRename: () => void;
  onDefault: () => void;
}) {
  return (
    <div
      className={cn(
        "group mb-0.5 flex items-center gap-0.5 rounded-md pr-1",
        active ? "bg-sidebar-hover" : "hover:bg-sidebar-hover/70",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm",
          active ? "text-white" : "text-sidebar-foreground",
        )}
      >
        <span className={cn(active ? "text-sidebar-active" : "text-sidebar-muted")}>
          {typeIcon[type]}
        </span>
        <span className="truncate font-medium">{name}</span>
        {isDefault ? (
          <span className="shrink-0 rounded bg-white/10 px-1 py-0.5 text-[10px] text-sidebar-muted">
            默认
          </span>
        ) : null}
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onStar();
        }}
        className={cn(
          "rounded p-1 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100",
          starred ? "text-amber-400 opacity-100" : "text-sidebar-muted hover:text-white",
        )}
        aria-label={starred ? "取消星标" : "加星标"}
      >
        {starred ? <Star className="size-3.5 fill-current" /> : <StarOff className="size-3.5" />}
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="rounded p-1 text-sidebar-muted opacity-0 hover:text-white group-hover:opacity-100 focus:opacity-100 data-[state=open]:opacity-100"
            aria-label="更多操作"
          >
            <MoreHorizontal className="size-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={onRename}>
            <Pencil /> 重命名
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDuplicate}>
            <Copy /> 复制视图
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onStar}>
            <Star /> {starred ? "取消星标" : "加星标"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDefault}>
            <Check /> 设为默认
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={onDelete}
          >
            <Trash2 /> 删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

import type { ReactNode } from "react";
import {
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type AppRoute,
  useLayoutStore,
} from "@/store/layout-store";

const navItems: {
  key: AppRoute;
  label: string;
  icon: ReactNode;
  group: string;
}[] = [
  { key: "workbench", label: "工作台", icon: <LayoutDashboard className="size-4" />, group: "概览" },
  { key: "issues", label: "工作项", icon: <ListTodo className="size-4" />, group: "项目" },
  { key: "projects", label: "项目", icon: <FolderKanban className="size-4" />, group: "项目" },
  { key: "settings", label: "系统设置", icon: <Settings className="size-4" />, group: "系统" },
];

export function GlobalSider() {
  const collapsed = useLayoutStore((s) => s.siderCollapsed);
  const activeRoute = useLayoutStore((s) => s.activeRoute);
  const openRoute = useLayoutStore((s) => s.openRoute);
  const toggleSider = useLayoutStore((s) => s.toggleSider);
  const mobileSiderOpen = useLayoutStore((s) => s.mobileSiderOpen);
  const setMobileSiderOpen = useLayoutStore((s) => s.setMobileSiderOpen);

  const groups = ["概览", "项目", "系统"];

  const siderInner = (
    <aside
      className={cn(
        "flex h-full flex-col bg-[#001428] text-white/85 transition-[width] duration-200",
        collapsed ? "w-16" : "w-56",
      )}
    >
      <div
        className={cn(
          "flex h-14 shrink-0 items-center border-b border-white/10 px-3",
          collapsed ? "justify-center" : "gap-2.5",
        )}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#0c6ebd] text-sm font-bold text-white">
          V
        </div>
        {!collapsed ? (
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold tracking-wide text-white">
              ViewBoard
            </div>
            <div className="truncate text-[10px] text-white/45">Admin Demo</div>
          </div>
        ) : null}
      </div>

      <nav className="scrollbar-thin flex-1 overflow-y-auto py-3">
        {groups.map((group) => {
          const items = navItems.filter((i) => i.group === group);
          return (
            <div key={group} className="mb-3">
              {!collapsed ? (
                <div className="px-4 pb-1 text-[11px] font-medium uppercase tracking-wider text-white/35">
                  {group}
                </div>
              ) : (
                <div className="mx-3 mb-1 border-t border-white/10" />
              )}
              {items.map((item) => {
                const active = activeRoute === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    title={collapsed ? item.label : undefined}
                    onClick={() => openRoute(item.key)}
                    className={cn(
                      "mx-2 mb-0.5 flex w-[calc(100%-1rem)] items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      collapsed && "justify-center px-0",
                      active
                        ? "bg-[#0c6ebd] text-white shadow-sm"
                        : "text-white/70 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    <span className={cn(active ? "text-white" : "text-white/55")}>
                      {item.icon}
                    </span>
                    {!collapsed ? (
                      <span className="truncate font-medium">{item.label}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => toggleSider()}
        className="hidden h-10 items-center justify-center border-t border-white/10 text-white/50 transition-colors hover:bg-white/5 hover:text-white lg:flex"
        aria-label={collapsed ? "展开侧栏" : "收起侧栏"}
      >
        {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
      </button>
    </aside>
  );

  return (
    <>
      <div className="hidden h-full shrink-0 lg:block">{siderInner}</div>

      {mobileSiderOpen ? (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            aria-label="关闭菜单"
            onClick={() => setMobileSiderOpen(false)}
          />
          <div className="relative z-10 h-full shadow-xl">
            <aside className="flex h-full w-56 flex-col bg-[#001428] text-white/85">
              <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-white/10 px-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#0c6ebd] text-sm font-bold text-white">
                  V
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-white">ViewBoard</div>
                  <div className="truncate text-[10px] text-white/45">Admin Demo</div>
                </div>
              </div>
              <nav className="flex-1 overflow-y-auto py-3">
                {navItems.map((item) => {
                  const active = activeRoute === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => openRoute(item.key)}
                      className={cn(
                        "mx-2 mb-0.5 flex w-[calc(100%-1rem)] items-center gap-3 rounded-md px-3 py-2 text-sm",
                        active
                          ? "bg-[#0c6ebd] text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>
          </div>
        </div>
      ) : null}
    </>
  );
}

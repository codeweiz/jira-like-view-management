import {
  Bell,
  ChevronRight,
  Menu,
  RefreshCw,
  Search,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTE_META, useLayoutStore } from "@/store/layout-store";
import { useViewStore } from "@/store/view-store";

export function GlobalHeader() {
  const activeRoute = useLayoutStore((s) => s.activeRoute);
  const setMobileSiderOpen = useLayoutStore((s) => s.setMobileSiderOpen);
  const toggleSider = useLayoutStore((s) => s.toggleSider);
  const resetDemo = useViewStore((s) => s.resetDemo);
  const meta = ROUTE_META[activeRoute];

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card px-3 sm:px-4">
      <Button
        variant="ghost"
        size="icon-sm"
        className="lg:hidden"
        onClick={() => setMobileSiderOpen(true)}
        aria-label="打开菜单"
      >
        <Menu className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="hidden lg:inline-flex"
        onClick={() => toggleSider()}
        aria-label="折叠侧栏"
      >
        <Menu className="size-4" />
      </Button>

      {/* Breadcrumb */}
      <nav className="flex min-w-0 flex-1 items-center gap-1 text-sm">
        <span className="hidden text-muted-foreground sm:inline">首页</span>
        <ChevronRight className="hidden size-3.5 text-muted-foreground/60 sm:block" />
        {meta.group ? (
          <>
            <span className="hidden text-muted-foreground md:inline">{meta.group}</span>
            <ChevronRight className="hidden size-3.5 text-muted-foreground/60 md:block" />
          </>
        ) : null}
        <span className="truncate font-medium text-foreground">{meta.title}</span>
      </nav>

      <div className="hidden items-center gap-1 sm:flex">
        <Button variant="ghost" size="icon-sm" aria-label="搜索" className="text-muted-foreground">
          <Search className="size-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="通知" className="text-muted-foreground">
          <Bell className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="重置演示"
          className="text-muted-foreground"
          onClick={() => resetDemo()}
          title="重置演示数据"
        >
          <RefreshCw className="size-4" />
        </Button>
        <div className="ml-1 flex items-center gap-2 rounded-full border border-border py-0.5 pl-0.5 pr-2.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            <User className="size-3.5" />
          </span>
          <span className="text-xs font-medium">演示用户</span>
        </div>
      </div>
    </header>
  );
}

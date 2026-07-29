import type { MouseEvent } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type AppRoute, useLayoutStore } from "@/store/layout-store";

/**
 * Soybean-style multi-tabs: open *pages*, not filter presets.
 * Saved issue views live inside the 工作项 page content.
 */
export function GlobalTabs() {
  const tabs = useLayoutStore((s) => s.tabs);
  const activeRoute = useLayoutStore((s) => s.activeRoute);
  const openRoute = useLayoutStore((s) => s.openRoute);
  const closeTab = useLayoutStore((s) => s.closeTab);
  const closeOtherTabs = useLayoutStore((s) => s.closeOtherTabs);
  const closeAllTabs = useLayoutStore((s) => s.closeAllTabs);

  function onClose(e: MouseEvent, key: AppRoute) {
    e.stopPropagation();
    closeTab(key);
  }

  return (
    <div className="flex h-10 shrink-0 items-center border-b border-border bg-[#f0f1f3]">
      <div
        className="scrollbar-thin flex min-w-0 flex-1 items-end gap-0.5 overflow-x-auto px-2 pt-1"
        role="tablist"
        aria-label="已打开页面"
      >
        {tabs.map((tab) => {
          const active = tab.key === activeRoute;
          return (
            <div
              key={tab.key}
              role="tab"
              aria-selected={active}
              onClick={() => openRoute(tab.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openRoute(tab.key);
              }}
              tabIndex={0}
              className={cn(
                "group relative mb-px flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-t-md border border-b-0 px-3 text-xs font-medium transition-colors",
                active
                  ? "border-border bg-card text-primary"
                  : "border-transparent bg-transparent text-muted-foreground hover:bg-white/80 hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  active ? "bg-primary" : "bg-border",
                )}
              />
              <span className="max-w-[120px] truncate">{tab.title}</span>
              {tab.closable ? (
                <button
                  type="button"
                  onClick={(e) => onClose(e, tab.key)}
                  className={cn(
                    "rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground",
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                  )}
                  aria-label={`关闭 ${tab.title}`}
                >
                  <X className="size-3" />
                </button>
              ) : null}
            </div>
          );
        })}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="mr-2 flex size-7 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="标签页操作"
          >
            <span className="text-lg leading-none">⋯</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => closeOtherTabs(activeRoute)}>
            关闭其他
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => closeAllTabs()}>关闭全部</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

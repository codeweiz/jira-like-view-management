import { useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Toolbar } from "@/components/toolbar";
import { BoardView } from "@/components/board-view";
import { ListView } from "@/components/list-view";
import { TimelineView } from "@/components/timeline-view";
import { IssuePanel } from "@/components/issue-panel";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useViewStore } from "@/store/view-store";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

export function AppShell() {
  const draft = useViewStore((s) => s.draft);
  const selectedIssueId = useViewStore((s) => s.selectedIssueId);
  const sidebarOpen = useViewStore((s) => s.sidebarOpen);
  const setSidebarOpen = useViewStore((s) => s.setSidebarOpen);
  const selectIssue = useViewStore((s) => s.selectIssue);

  // Close issue panel on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") selectIssue(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectIssue]);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-dvh overflow-hidden bg-background">
        {/* Desktop sidebar */}
        <div className="hidden h-full lg:block">
          <Sidebar />
        </div>

        {/* Mobile sidebar drawer */}
        {sidebarOpen ? (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-foreground/40"
              aria-label="关闭侧栏"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative z-10 h-full shadow-lg">
              <Sidebar />
            </div>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <Toolbar />
          <div className="flex min-h-0 flex-1">
            <main className="min-w-0 flex-1 overflow-hidden">
              {draft.type === "board" ? <BoardView /> : null}
              {draft.type === "list" ? <ListView /> : null}
              {draft.type === "timeline" ? <TimelineView /> : null}
            </main>

            {/* Desktop issue panel */}
            <div
              className={cn(
                "hidden h-full transition-all md:block",
                selectedIssueId ? "md:w-[360px]" : "md:w-0 overflow-hidden",
              )}
            >
              {selectedIssueId ? <IssuePanel /> : null}
            </div>
          </div>
        </div>

        {/* Mobile issue panel as bottom sheet-ish full overlay */}
        {selectedIssueId ? (
          <div className="fixed inset-0 z-50 flex flex-col bg-card md:hidden">
            <IssuePanel />
          </div>
        ) : null}

        <Toaster position="bottom-right" richColors closeButton />
      </div>
    </TooltipProvider>
  );
}

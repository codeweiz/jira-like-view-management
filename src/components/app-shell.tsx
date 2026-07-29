import { useEffect } from "react";
import { GlobalSider } from "@/components/layout/global-sider";
import { GlobalHeader } from "@/components/layout/global-header";
import { GlobalTabs } from "@/components/layout/global-tabs";
import { IssuesPage } from "@/components/pages/issues-page";
import { WorkbenchPage } from "@/components/pages/workbench-page";
import { PlaceholderPage } from "@/components/pages/placeholder-page";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLayoutStore } from "@/store/layout-store";
import { useViewStore } from "@/store/view-store";
import { Toaster } from "sonner";

export function AppShell() {
  const activeRoute = useLayoutStore((s) => s.activeRoute);
  const selectIssue = useViewStore((s) => s.selectIssue);

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
        <GlobalSider />

        <div className="flex min-w-0 flex-1 flex-col">
          <GlobalHeader />
          <GlobalTabs />

          <div className="min-h-0 flex-1 overflow-hidden bg-background">
            {activeRoute === "workbench" ? <WorkbenchPage /> : null}
            {activeRoute === "issues" ? <IssuesPage /> : null}
            {activeRoute === "projects" ? <PlaceholderPage route="projects" /> : null}
            {activeRoute === "settings" ? <PlaceholderPage route="settings" /> : null}
          </div>
        </div>

        <Toaster position="bottom-right" richColors closeButton />
      </div>
    </TooltipProvider>
  );
}

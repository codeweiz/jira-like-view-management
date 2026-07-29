import { BoardView } from "@/components/board-view";
import { ListView } from "@/components/list-view";
import { TimelineView } from "@/components/timeline-view";
import { Toolbar } from "@/components/toolbar";
import { IssuePanel } from "@/components/issue-panel";
import { useViewStore } from "@/store/view-store";
import { cn } from "@/lib/utils";

/**
 * 工作项 page — dense content under admin chrome.
 * Filter views live inside the toolbar (dropdown), not as a full-width band.
 */
export function IssuesPage() {
  const draft = useViewStore((s) => s.draft);
  const selectedIssueId = useViewStore((s) => s.selectedIssueId);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <Toolbar />

      <div className="flex min-h-0 flex-1">
        <div className="min-w-0 flex-1 overflow-hidden">
          {draft.type === "board" ? <BoardView /> : null}
          {draft.type === "list" ? <ListView /> : null}
          {draft.type === "timeline" ? <TimelineView /> : null}
        </div>
        <div
          className={cn(
            "hidden h-full border-l border-border md:block",
            selectedIssueId ? "md:w-[340px]" : "md:w-0 overflow-hidden border-0",
          )}
        >
          {selectedIssueId ? <IssuePanel /> : null}
        </div>
      </div>

      {selectedIssueId ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-card md:hidden">
          <IssuePanel />
        </div>
      ) : null}
    </div>
  );
}

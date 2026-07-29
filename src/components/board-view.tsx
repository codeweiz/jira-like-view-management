import { useMemo, useState } from "react";
import { STATUSES, type Issue, type StatusId } from "@/data/seed";
import { useViewStore } from "@/store/view-store";
import { useFilteredIssues } from "@/hooks/use-filtered-issues";
import {
  Avatar,
  IssueKey,
  LabelChips,
  PriorityIcon,
  TypeIcon,
} from "@/components/issue-meta";
import { cn } from "@/lib/utils";

export function BoardView() {
  const statusFilter = useViewStore((s) => s.draft.filters.statuses);
  const issues = useFilteredIssues();
  const moveIssue = useViewStore((s) => s.moveIssue);
  const selectIssue = useViewStore((s) => s.selectIssue);
  const selectedIssueId = useViewStore((s) => s.selectedIssueId);

  const [dragId, setDragId] = useState<string | null>(null);
  const [overStatus, setOverStatus] = useState<StatusId | null>(null);

  const columns = useMemo(() => {
    const cols =
      statusFilter.length > 0
        ? STATUSES.filter((s) => statusFilter.includes(s.id))
        : STATUSES;
    return cols.map((status) => ({
      status,
      issues: issues.filter((i) => i.status === status.id),
    }));
  }, [issues, statusFilter]);

  function onDrop(status: StatusId) {
    if (dragId) {
      moveIssue(dragId, status);
    }
    setDragId(null);
    setOverStatus(null);
  }

  return (
    <div className="scrollbar-thin flex h-full gap-3 overflow-x-auto p-3 sm:p-4">
      {columns.map(({ status, issues: colIssues }) => (
        <div
          key={status.id}
          className={cn(
            "flex w-[280px] shrink-0 flex-col rounded-xl bg-muted/60 transition-colors",
            overStatus === status.id && dragId
              ? "bg-accent/40 ring-2 ring-primary/40"
              : "",
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setOverStatus(status.id);
          }}
          onDragLeave={() => setOverStatus((s) => (s === status.id ? null : s))}
          onDrop={(e) => {
            e.preventDefault();
            onDrop(status.id);
          }}
        >
          <div className="flex items-center gap-2 px-3 py-2.5">
            <span
              className="size-2 rounded-full"
              style={{ background: status.color }}
            />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {status.name}
            </h2>
            <span className="rounded-full bg-card px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground shadow-sm">
              {colIssues.length}
            </span>
          </div>
          <div className="scrollbar-thin flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-3">
            {colIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                selected={selectedIssueId === issue.id}
                dragging={dragId === issue.id}
                onDragStart={() => setDragId(issue.id)}
                onDragEnd={() => {
                  setDragId(null);
                  setOverStatus(null);
                }}
                onClick={() => selectIssue(issue.id)}
              />
            ))}
            {colIssues.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border px-3 py-8 text-center text-xs text-muted-foreground">
                拖入工作项
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function IssueCard({
  issue,
  selected,
  dragging,
  onDragStart,
  onDragEnd,
  onClick,
}: {
  issue: Issue;
  selected: boolean;
  dragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onClick: () => void;
}) {
  return (
    <article
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", issue.id);
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={cn(
        "cursor-grab rounded-lg border border-border bg-card p-3 shadow-sm transition-all active:cursor-grabbing",
        "hover:border-primary/30 hover:shadow-md",
        selected && "border-primary ring-2 ring-primary/20",
        dragging && "opacity-50",
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="text-sm font-medium leading-snug text-foreground">{issue.title}</p>
        <PriorityIcon priority={issue.priority} />
      </div>
      {issue.labels.length > 0 ? (
        <div className="mb-2">
          <LabelChips labels={issue.labels} max={2} />
        </div>
      ) : null}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <TypeIcon type={issue.type} />
          <IssueKey issue={issue} />
        </div>
        <div className="flex items-center gap-1.5">
          {issue.storyPoints != null ? (
            <span className="rounded-full border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              {issue.storyPoints}
            </span>
          ) : null}
          <Avatar userId={issue.assigneeId} size="sm" />
        </div>
      </div>
    </article>
  );
}

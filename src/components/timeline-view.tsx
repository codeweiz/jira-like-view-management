import { useMemo } from "react";
import { useViewStore } from "@/store/view-store";
import { useFilteredIssues } from "@/hooks/use-filtered-issues";
import {
  Avatar,
  IssueKey,
  PriorityIcon,
  StatusBadge,
  TypeIcon,
} from "@/components/issue-meta";
import { cn } from "@/lib/utils";

export function TimelineView() {
  const issues = useFilteredIssues();
  const selectIssue = useViewStore((s) => s.selectIssue);
  const selectedIssueId = useViewStore((s) => s.selectedIssueId);

  const { rangeStart, rangeEnd, rows, ticks } = useMemo(() => {
    const withDates = issues.map((issue) => {
      const start = new Date(issue.createdAt);
      const end = issue.dueDate
        ? new Date(issue.dueDate + "T23:59:59Z")
        : new Date(start.getTime() + 14 * 86400000);
      return { issue, start, end };
    });

    if (withDates.length === 0) {
      const now = new Date();
      return {
        rangeStart: now,
        rangeEnd: new Date(now.getTime() + 30 * 86400000),
        rows: [] as {
          issue: (typeof issues)[0];
          start: Date;
          end: Date;
          left: number;
          width: number;
        }[],
        ticks: [] as Date[],
      };
    }

    let min = Math.min(...withDates.map((r) => r.start.getTime()));
    let max = Math.max(...withDates.map((r) => r.end.getTime()));
    min -= 3 * 86400000;
    max += 3 * 86400000;
    const rangeStart = new Date(min);
    const rangeEnd = new Date(max);
    const span = max - min || 1;

    const ticks: Date[] = [];
    const step = Math.max(span / 6, 7 * 86400000);
    for (let t = min; t <= max; t += step) {
      ticks.push(new Date(t));
    }

    const rows = withDates
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .map((r) => {
        const left = ((r.start.getTime() - min) / span) * 100;
        const width = Math.max(((r.end.getTime() - r.start.getTime()) / span) * 100, 2);
        return { ...r, left, width };
      });

    return { rangeStart, rangeEnd, rows, ticks };
  }, [issues]);

  if (issues.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-sm text-muted-foreground">
        没有匹配的工作项。
      </div>
    );
  }

  return (
    <div className="scrollbar-thin h-full overflow-auto p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex border-b border-border bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
          <div className="w-[220px] shrink-0 font-semibold sm:w-[280px]">工作项</div>
          <div className="relative min-h-6 flex-1">
            {ticks.map((t, i) => (
              <span
                key={i}
                className="absolute top-0 -translate-x-1/2 font-medium"
                style={{
                  left: `${
                    ((t.getTime() - rangeStart.getTime()) /
                      (rangeEnd.getTime() - rangeStart.getTime() || 1)) *
                    100
                  }%`,
                }}
              >
                {t.toLocaleDateString("zh-CN", { month: "short", day: "numeric" })}
              </span>
            ))}
          </div>
        </div>

        <div className="divide-y divide-border">
          {rows.map(({ issue, left, width }) => (
            <button
              key={issue.id}
              type="button"
              onClick={() => selectIssue(issue.id)}
              className={cn(
                "flex w-full items-center px-3 py-2.5 text-left transition-colors hover:bg-accent/40",
                selectedIssueId === issue.id && "bg-accent/50",
              )}
            >
              <div className="flex w-[220px] shrink-0 items-center gap-2 sm:w-[280px]">
                <TypeIcon type={issue.type} />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{issue.title}</div>
                  <div className="flex items-center gap-2">
                    <IssueKey issue={issue} />
                    <PriorityIcon priority={issue.priority} />
                  </div>
                </div>
              </div>
              <div className="relative h-8 flex-1">
                <div
                  className="absolute top-1/2 h-6 -translate-y-1/2 rounded-md bg-primary/15 ring-1 ring-primary/30"
                  style={{ left: `${left}%`, width: `${width}%` }}
                >
                  <div className="flex h-full items-center gap-1.5 overflow-hidden px-2">
                    <Avatar userId={issue.assigneeId} size="sm" />
                    <span className="hidden truncate text-[11px] font-medium text-primary sm:inline">
                      {issue.dueDate ?? "无截止日期"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-2 hidden shrink-0 md:block">
                <StatusBadge status={issue.status} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

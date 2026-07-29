import { useMemo, useState } from "react";
import {
  COLUMN_LABELS,
  PRIORITY_META,
  STATUSES,
  TYPE_META,
  USERS,
  type GroupBy,
  type Issue,
} from "@/data/seed";
import { useViewStore } from "@/store/view-store";
import { useFilteredIssues } from "@/hooks/use-filtered-issues";
import {
  Avatar,
  IssueKey,
  LabelChips,
  PriorityIcon,
  StatusBadge,
  TypeIcon,
  formatRelative,
} from "@/components/issue-meta";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";

export function ListView() {
  const groupBy = useViewStore((s) => s.draft.groupBy);
  const visibleColumns = useViewStore((s) => s.draft.visibleColumns);
  const issues = useFilteredIssues();
  const selectIssue = useViewStore((s) => s.selectIssue);
  const selectedIssueId = useViewStore((s) => s.selectedIssueId);

  const columns = visibleColumns.filter((c) => COLUMN_LABELS[c]);

  const groups = useMemo(() => groupIssues(issues, groupBy), [issues, groupBy]);

  if (issues.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-sm text-muted-foreground">
        没有匹配的工作项。试试调整筛选条件。
      </div>
    );
  }

  return (
    <div className="scrollbar-thin h-full overflow-auto p-3 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-secondary/90 backdrop-blur">
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col}
                  className={cn(
                    "px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                    col === "title" && "min-w-[200px]",
                  )}
                >
                  {COLUMN_LABELS[col]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <GroupRows
                key={group.key}
                label={group.label}
                issues={group.issues}
                columns={columns}
                showHeader={groupBy !== "none"}
                selectedIssueId={selectedIssueId}
                onSelect={selectIssue}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GroupRows({
  label,
  issues,
  columns,
  showHeader,
  selectedIssueId,
  onSelect,
}: {
  label: string;
  issues: Issue[];
  columns: string[];
  showHeader: boolean;
  selectedIssueId: string | null;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <>
      {showHeader ? (
        <tr className="bg-muted/50">
          <td colSpan={columns.length} className="px-3 py-2">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground"
            >
              {open ? (
                <ChevronDown className="size-3.5" />
              ) : (
                <ChevronRight className="size-3.5" />
              )}
              {label}
              <span className="font-normal text-muted-foreground">({issues.length})</span>
            </button>
          </td>
        </tr>
      ) : null}
      {open
        ? issues.map((issue) => (
            <tr
              key={issue.id}
              onClick={() => onSelect(issue.id)}
              className={cn(
                "cursor-pointer border-b border-border/70 transition-colors last:border-0 hover:bg-accent/40",
                selectedIssueId === issue.id && "bg-accent/60",
              )}
            >
              {columns.map((col) => (
                <td key={col} className="px-3 py-2.5 align-middle">
                  <Cell issue={issue} col={col} />
                </td>
              ))}
            </tr>
          ))
        : null}
    </>
  );
}

function Cell({ issue, col }: { issue: Issue; col: string }) {
  switch (col) {
    case "key":
      return <IssueKey issue={issue} />;
    case "type":
      return (
        <span className="inline-flex items-center gap-1.5">
          <TypeIcon type={issue.type} />
          <span className="text-xs text-muted-foreground">{TYPE_META[issue.type].label}</span>
        </span>
      );
    case "title":
      return <span className="font-medium">{issue.title}</span>;
    case "status":
      return <StatusBadge status={issue.status} />;
    case "assignee":
      return (
        <span className="inline-flex items-center gap-2">
          <Avatar userId={issue.assigneeId} size="sm" />
          <span className="text-xs text-muted-foreground">
            {issue.assigneeId
              ? USERS.find((u) => u.id === issue.assigneeId)?.name
              : "未分配"}
          </span>
        </span>
      );
    case "priority":
      return <PriorityIcon priority={issue.priority} showLabel />;
    case "labels":
      return <LabelChips labels={issue.labels} max={2} />;
    case "storyPoints":
      return (
        <span className="font-mono text-xs text-muted-foreground">
          {issue.storyPoints ?? "—"}
        </span>
      );
    case "created":
      return (
        <span className="text-xs text-muted-foreground">
          {formatRelative(issue.createdAt)}
        </span>
      );
    case "updated":
      return (
        <span className="text-xs text-muted-foreground">
          {formatRelative(issue.updatedAt)}
        </span>
      );
    case "dueDate":
      return (
        <span className="text-xs text-muted-foreground">{issue.dueDate ?? "—"}</span>
      );
    default:
      return null;
  }
}

function groupIssues(
  issues: Issue[],
  groupBy: GroupBy,
): { key: string; label: string; issues: Issue[] }[] {
  if (groupBy === "none") {
    return [{ key: "all", label: "全部", issues }];
  }

  const map = new Map<string, Issue[]>();
  for (const issue of issues) {
    let key = "";
    if (groupBy === "status") key = issue.status;
    else if (groupBy === "assignee") key = issue.assigneeId ?? "unassigned";
    else if (groupBy === "priority") key = issue.priority;
    else if (groupBy === "type") key = issue.type;
    const list = map.get(key) ?? [];
    list.push(issue);
    map.set(key, list);
  }

  return Array.from(map.entries()).map(([key, list]) => {
    let label = key;
    if (groupBy === "status") {
      label = STATUSES.find((s) => s.id === key)?.name ?? key;
    } else if (groupBy === "assignee") {
      label =
        key === "unassigned"
          ? "未分配"
          : (USERS.find((u) => u.id === key)?.name ?? key);
    } else if (groupBy === "priority") {
      label = PRIORITY_META[key as keyof typeof PRIORITY_META]?.label ?? key;
    } else if (groupBy === "type") {
      label = TYPE_META[key as keyof typeof TYPE_META]?.label ?? key;
    }
    return { key, label, issues: list };
  });
}

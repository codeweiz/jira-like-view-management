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
      <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
        没有匹配的工作项。试试调整筛选条件。
      </div>
    );
  }

  return (
    <div className="scrollbar-thin h-full overflow-auto p-2">
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-secondary/95 backdrop-blur">
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col}
                  className={cn(
                    "px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground",
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
                group={group}
                columns={columns}
                selectedIssueId={selectedIssueId}
                onSelect={selectIssue}
                showHeader={groupBy !== "none"}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GroupRows({
  group,
  columns,
  selectedIssueId,
  onSelect,
  showHeader,
}: {
  group: { key: string; label: string; issues: Issue[] };
  columns: string[];
  selectedIssueId: string | null;
  onSelect: (id: string) => void;
  showHeader: boolean;
}) {
  const [open, setOpen] = useState(true);

  return (
    <>
      {showHeader ? (
        <tr className="bg-muted/40">
          <td colSpan={columns.length} className="px-2.5 py-1">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground"
            >
              {open ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
              {group.label}
              <span className="font-normal tabular-nums">({group.issues.length})</span>
            </button>
          </td>
        </tr>
      ) : null}
      {open
        ? group.issues.map((issue) => (
            <tr
              key={issue.id}
              onClick={() => onSelect(issue.id)}
              className={cn(
                "cursor-pointer border-b border-border/60 hover:bg-accent/40",
                selectedIssueId === issue.id && "bg-accent/60",
              )}
            >
              {columns.map((col) => (
                <td key={col} className="px-2.5 py-1.5 align-middle text-xs">
                  <Cell col={col} issue={issue} />
                </td>
              ))}
            </tr>
          ))
        : null}
    </>
  );
}

function Cell({ col, issue }: { col: string; issue: Issue }) {
  switch (col) {
    case "key":
      return (
        <span className="inline-flex items-center gap-1">
          <TypeIcon type={issue.type} />
          <IssueKey issue={issue} />
        </span>
      );
    case "title":
      return <span className="text-[13px] font-medium">{issue.title}</span>;
    case "status":
      return <StatusBadge status={issue.status} />;
    case "priority":
      return (
        <span className="inline-flex items-center gap-1">
          <PriorityIcon priority={issue.priority} />
          {PRIORITY_META[issue.priority].label}
        </span>
      );
    case "assignee": {
      const u = USERS.find((x) => x.id === issue.assigneeId);
      return (
        <span className="inline-flex items-center gap-1.5">
          <Avatar userId={issue.assigneeId} size="sm" />
          {u?.name ?? "未分配"}
        </span>
      );
    }
    case "labels":
      return <LabelChips labels={issue.labels} max={3} />;
    case "type":
      return (
        <span className="inline-flex items-center gap-1">
          <TypeIcon type={issue.type} />
          {TYPE_META[issue.type].label}
        </span>
      );
    case "updated":
      return (
        <span className="tabular-nums text-muted-foreground">
          {formatRelative(issue.updatedAt)}
        </span>
      );
    default:
      return null;
  }
}

function groupIssues(issues: Issue[], groupBy: GroupBy) {
  if (groupBy === "none") {
    return [{ key: "all", label: "全部", issues }];
  }
  const map = new Map<string, { key: string; label: string; issues: Issue[] }>();
  for (const issue of issues) {
    let key = "";
    let label = "";
    if (groupBy === "status") {
      key = issue.status;
      label = STATUSES.find((s) => s.id === issue.status)?.name ?? key;
    } else if (groupBy === "assignee") {
      key = issue.assigneeId ?? "unassigned";
      label = USERS.find((u) => u.id === issue.assigneeId)?.name ?? "未分配";
    } else if (groupBy === "priority") {
      key = issue.priority;
      label = PRIORITY_META[issue.priority].label;
    } else if (groupBy === "type") {
      key = issue.type;
      label = TYPE_META[issue.type].label;
    }
    const g = map.get(key) ?? { key, label, issues: [] };
    g.issues.push(issue);
    map.set(key, g);
  }
  return [...map.values()];
}

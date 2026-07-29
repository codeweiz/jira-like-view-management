import type { ReactNode } from "react";
import {
  type Issue,
  type IssueType,
  type Priority,
  type StatusId,
  PRIORITY_META,
  STATUSES,
  TYPE_META,
  USERS,
} from "@/data/seed";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  Bug,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  ChevronsDown,
  ChevronsUp,
  Equal,
  Layers,
} from "lucide-react";

const typeIcons: Record<IssueType, ReactNode> = {
  epic: <Layers className="size-3.5" />,
  story: <Bookmark className="size-3.5" />,
  task: <CheckSquare className="size-3.5" />,
  bug: <Bug className="size-3.5" />,
};

const priorityIcons: Record<Priority, ReactNode> = {
  highest: <ChevronsUp className="size-3.5" />,
  high: <ChevronUp className="size-3.5" />,
  medium: <Equal className="size-3.5" />,
  low: <ChevronDown className="size-3.5" />,
  lowest: <ChevronsDown className="size-3.5" />,
};

export function TypeIcon({ type, className }: { type: IssueType; className?: string }) {
  const meta = TYPE_META[type];
  return (
    <span
      className={cn(
        "inline-flex size-5 items-center justify-center rounded-sm",
        className,
      )}
      style={{ color: meta.color, background: meta.bg }}
      title={meta.label}
    >
      {typeIcons[type]}
    </span>
  );
}

export function PriorityIcon({
  priority,
  showLabel,
}: {
  priority: Priority;
  showLabel?: boolean;
}) {
  const meta = PRIORITY_META[priority];
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium"
      style={{ color: meta.color }}
      title={meta.label}
    >
      {priorityIcons[priority]}
      {showLabel ? <span>{meta.label}</span> : null}
    </span>
  );
}

export function StatusBadge({ status }: { status: StatusId }) {
  const s = STATUSES.find((x) => x.id === status)!;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-sm bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
      title={s.name}
    >
      <span className="size-1.5 rounded-full" style={{ background: s.color }} />
      {s.name}
    </span>
  );
}

export function Avatar({
  userId,
  size = "md",
}: {
  userId: string | null;
  size?: "sm" | "md";
}) {
  const user = userId ? USERS.find((u) => u.id === userId) : null;
  const dim = size === "sm" ? "size-6 text-[10px]" : "size-7 text-xs";
  if (!user) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-dashed border-border bg-muted font-medium text-muted-foreground",
          dim,
        )}
        title="未分配"
      >
        —
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold text-white",
        dim,
      )}
      style={{ background: user.color }}
      title={user.name}
    >
      {user.initials}
    </span>
  );
}

export function LabelChips({ labels, max = 3 }: { labels: string[]; max?: number }) {
  const shown = labels.slice(0, max);
  const rest = labels.length - shown.length;
  return (
    <div className="flex flex-wrap gap-1">
      {shown.map((l) => (
        <span
          key={l}
          className="rounded-sm bg-secondary px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground"
        >
          {l}
        </span>
      ))}
      {rest > 0 ? (
        <span className="rounded-sm bg-secondary px-1.5 py-0.5 text-[11px] text-muted-foreground">
          +{rest}
        </span>
      ) : null}
    </div>
  );
}

export function formatRelative(iso: string): string {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)} 分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 48) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} 天前`;
  return d.toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
}

export function IssueKey({ issue }: { issue: Issue }) {
  return (
    <span className="font-mono text-xs font-medium text-muted-foreground">
      {issue.key}
    </span>
  );
}

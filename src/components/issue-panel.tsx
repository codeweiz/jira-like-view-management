import type { ReactNode } from "react";
import {
  PRIORITY_META,
  STATUSES,
  TYPE_META,
  USERS,
  type Priority,
  type StatusId,
} from "@/data/seed";
import { useViewStore } from "@/store/view-store";
import {
  Avatar,
  LabelChips,
  PriorityIcon,
  TypeIcon,
  formatRelative,
} from "@/components/issue-meta";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function IssuePanel() {
  const selectedIssueId = useViewStore((s) => s.selectedIssueId);
  const issues = useViewStore((s) => s.issues);
  const selectIssue = useViewStore((s) => s.selectIssue);
  const updateIssue = useViewStore((s) => s.updateIssue);
  const moveIssue = useViewStore((s) => s.moveIssue);

  const issue = issues.find((i) => i.id === selectedIssueId);
  if (!issue) return null;

  const reporter = USERS.find((u) => u.id === issue.reporterId);

  return (
    <aside className="flex h-full w-full flex-col border-l border-border bg-card sm:w-[360px] sm:shrink-0">
      <div className="flex items-start justify-between gap-2 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <TypeIcon type={issue.type} />
            <span className="font-mono text-xs font-medium text-muted-foreground">
              {issue.key}
            </span>
            <span className="text-xs text-muted-foreground">
              {TYPE_META[issue.type].label}
            </span>
          </div>
          <h2 className="text-base font-semibold leading-snug">{issue.title}</h2>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => selectIssue(null)}
          aria-label="关闭"
        >
          <X />
        </Button>
      </div>

      <div className="scrollbar-thin flex-1 space-y-5 overflow-y-auto p-4">
        <section>
          <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            描述
          </h3>
          <p className="text-sm leading-relaxed text-foreground/90">{issue.description}</p>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <Field label="状态">
            <select
              className="h-8 w-full rounded-md border border-input bg-card px-2 text-sm"
              value={issue.status}
              onChange={(e) => moveIssue(issue.id, e.target.value as StatusId)}
            >
              {STATUSES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="优先级">
            <select
              className="h-8 w-full rounded-md border border-input bg-card px-2 text-sm"
              value={issue.priority}
              onChange={(e) =>
                updateIssue(issue.id, { priority: e.target.value as Priority })
              }
            >
              {(Object.keys(PRIORITY_META) as Priority[]).map((p) => (
                <option key={p} value={p}>
                  {PRIORITY_META[p].label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="经办人">
            <select
              className="h-8 w-full rounded-md border border-input bg-card px-2 text-sm"
              value={issue.assigneeId ?? ""}
              onChange={(e) =>
                updateIssue(issue.id, {
                  assigneeId: e.target.value || null,
                })
              }
            >
              <option value="">未分配</option>
              {USERS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="故事点">
            <div className="flex h-8 items-center rounded-md border border-border bg-secondary px-2 font-mono text-sm">
              {issue.storyPoints ?? "—"}
            </div>
          </Field>
        </section>

        <section>
          <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            标签
          </h3>
          <LabelChips labels={issue.labels} max={10} />
        </section>

        <section className="space-y-2 rounded-lg border border-border bg-secondary/40 p-3 text-sm">
          <MetaRow label="报告人">
            <span className="inline-flex items-center gap-1.5">
              <Avatar userId={issue.reporterId} size="sm" />
              {reporter?.name}
            </span>
          </MetaRow>
          <MetaRow label="优先级">
            <PriorityIcon priority={issue.priority} showLabel />
          </MetaRow>
          <MetaRow label="截止日期">
            <span className="text-muted-foreground">{issue.dueDate ?? "无"}</span>
          </MetaRow>
          <MetaRow label="创建">
            <span className="text-muted-foreground">{formatRelative(issue.createdAt)}</span>
          </MetaRow>
          <MetaRow label="更新">
            <span className="text-muted-foreground">{formatRelative(issue.updatedAt)}</span>
          </MetaRow>
        </section>
      </div>
    </aside>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-[11px] font-medium text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

function MetaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

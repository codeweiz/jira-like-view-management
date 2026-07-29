import type { ReactNode } from "react";
import {
  CheckCircle2,
  CircleDot,
  Clock3,
  ListTodo,
} from "lucide-react";
import { useViewStore } from "@/store/view-store";
import { useLayoutStore } from "@/store/layout-store";
import { Button } from "@/components/ui/button";
import { STATUSES } from "@/data/seed";

export function WorkbenchPage() {
  const issues = useViewStore((s) => s.issues);
  const openRoute = useLayoutStore((s) => s.openRoute);

  const byStatus = STATUSES.map((s) => ({
    ...s,
    count: issues.filter((i) => i.status === s.id).length,
  }));
  const mine = issues.filter((i) => i.assigneeId === "u1").length;
  const open = issues.filter((i) => i.status !== "done").length;

  return (
    <div className="scrollbar-thin h-full overflow-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight">工作台</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          项目概览。筛选视图在左侧进入「工作项」后使用。
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<ListTodo className="size-4 text-primary" />} label="全部工作项" value={issues.length} />
        <StatCard icon={<CircleDot className="size-4 text-info" />} label="未完成" value={open} />
        <StatCard icon={<Clock3 className="size-4 text-warning" />} label="指派给我" value={mine} />
        <StatCard
          icon={<CheckCircle2 className="size-4 text-success" />}
          label="已完成"
          value={issues.filter((i) => i.status === "done").length}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold">按状态分布</h2>
          <ul className="space-y-2">
            {byStatus.map((s) => (
              <li key={s.id} className="flex items-center gap-3 text-sm">
                <span className="size-2 rounded-full" style={{ background: s.color }} />
                <span className="flex-1 text-muted-foreground">{s.name}</span>
                <span className="font-mono font-medium tabular-nums">{s.count}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold">快捷入口</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            我的待办、冲刺焦点等是工作项页内的「筛选视图」，不占侧栏菜单，也不占顶部多标签。
          </p>
          <Button onClick={() => openRoute("issues")}>进入工作项</Button>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="text-2xl font-semibold tabular-nums tracking-tight">{value}</div>
    </div>
  );
}

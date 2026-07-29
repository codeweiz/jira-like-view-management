import { ROUTE_META, type AppRoute } from "@/store/layout-store";

export function PlaceholderPage({ route }: { route: AppRoute }) {
  const meta = ROUTE_META[route];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
      <h1 className="text-xl font-semibold">{meta.title}</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        占位页面，用于演示 soybean-admin 式侧栏导航与多标签。筛选视图只出现在「工作项」页。
      </p>
    </div>
  );
}

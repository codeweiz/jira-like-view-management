import { create } from "zustand";

/** App routes that appear in sider + multi-tabs (soybean-style). */
export type AppRoute =
  | "workbench"
  | "issues"
  | "projects"
  | "settings";

export interface TabItem {
  key: AppRoute;
  title: string;
  closable: boolean;
}

export const ROUTE_META: Record<
  AppRoute,
  { title: string; group?: string }
> = {
  workbench: { title: "工作台", group: "概览" },
  issues: { title: "工作项", group: "项目" },
  projects: { title: "项目", group: "项目" },
  settings: { title: "系统设置", group: "系统" },
};

interface LayoutStore {
  siderCollapsed: boolean;
  mobileSiderOpen: boolean;
  activeRoute: AppRoute;
  tabs: TabItem[];

  toggleSider: () => void;
  setSiderCollapsed: (v: boolean) => void;
  setMobileSiderOpen: (v: boolean) => void;
  openRoute: (route: AppRoute) => void;
  closeTab: (key: AppRoute) => void;
  closeOtherTabs: (key: AppRoute) => void;
  closeAllTabs: () => void;
}

const defaultTab: TabItem = {
  key: "issues",
  title: "工作项",
  closable: false,
};

export const useLayoutStore = create<LayoutStore>()((set, get) => ({
  siderCollapsed: false,
  mobileSiderOpen: false,
  activeRoute: "issues",
  tabs: [defaultTab],

  toggleSider: () => set((s) => ({ siderCollapsed: !s.siderCollapsed })),
  setSiderCollapsed: (v) => set({ siderCollapsed: v }),
  setMobileSiderOpen: (v) => set({ mobileSiderOpen: v }),

  openRoute: (route) => {
    const meta = ROUTE_META[route];
    const { tabs } = get();
    const exists = tabs.some((t) => t.key === route);
    set({
      activeRoute: route,
      mobileSiderOpen: false,
      tabs: exists
        ? tabs
        : [
            ...tabs,
            {
              key: route,
              title: meta.title,
              closable: route !== "issues",
            },
          ],
    });
  },

  closeTab: (key) => {
    const { tabs, activeRoute } = get();
    if (tabs.length <= 1) return;
    const tab = tabs.find((t) => t.key === key);
    if (tab && !tab.closable) return;
    const next = tabs.filter((t) => t.key !== key);
    const nextActive =
      activeRoute === key
        ? next[next.length - 1]!.key
        : activeRoute;
    set({ tabs: next, activeRoute: nextActive });
  },

  closeOtherTabs: (key) => {
    const { tabs } = get();
    const keep = tabs.filter((t) => t.key === key || !t.closable);
    set({ tabs: keep, activeRoute: key });
  },

  closeAllTabs: () => {
    const { tabs } = get();
    const keep = tabs.filter((t) => !t.closable);
    const fallback = keep[0] ?? defaultTab;
    set({
      tabs: keep.length ? keep : [defaultTab],
      activeRoute: fallback.key,
    });
  },
}));

import { create } from "zustand";
import { toast } from "sonner";
import {
  type GroupBy,
  type Issue,
  type Priority,
  type SavedView,
  type SortBy,
  type StatusId,
  type ViewFilters,
  type ViewType,
  PRIORITY_META,
  SEED_ISSUES,
  SEED_VIEWS,
  createEmptyFilters,
} from "@/data/seed";

function nowIso() {
  return new Date().toISOString();
}

function deepCloneView(view: SavedView): SavedView {
  return {
    ...view,
    filters: {
      ...view.filters,
      statuses: [...view.filters.statuses],
      assignees: [...view.filters.assignees],
      priorities: [...view.filters.priorities],
      types: [...view.filters.types],
      labels: [...view.filters.labels],
    },
    visibleColumns: [...view.visibleColumns],
  };
}

export function countActiveFilters(filters: ViewFilters): number {
  let n = 0;
  if (filters.search.trim()) n += 1;
  n += filters.statuses.length > 0 ? 1 : 0;
  n += filters.assignees.length > 0 ? 1 : 0;
  n += filters.priorities.length > 0 ? 1 : 0;
  n += filters.types.length > 0 ? 1 : 0;
  n += filters.labels.length > 0 ? 1 : 0;
  return n;
}

export function filterIssues(issues: Issue[], filters: ViewFilters): Issue[] {
  const q = filters.search.trim().toLowerCase();
  return issues.filter((issue) => {
    if (q) {
      const hay =
        `${issue.key} ${issue.title} ${issue.description} ${issue.labels.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters.statuses.length && !filters.statuses.includes(issue.status)) return false;
    if (filters.priorities.length && !filters.priorities.includes(issue.priority))
      return false;
    if (filters.types.length && !filters.types.includes(issue.type)) return false;
    if (filters.labels.length && !filters.labels.some((l) => issue.labels.includes(l)))
      return false;
    if (filters.assignees.length) {
      const aid = issue.assigneeId ?? "unassigned";
      if (!filters.assignees.includes(aid)) return false;
    }
    return true;
  });
}

export function sortIssues(
  issues: Issue[],
  sortBy: SortBy,
  sortDir: "asc" | "desc",
): Issue[] {
  const mul = sortDir === "asc" ? 1 : -1;
  return [...issues].sort((a, b) => {
    let cmp = 0;
    switch (sortBy) {
      case "key":
        cmp = a.key.localeCompare(b.key);
        break;
      case "title":
        cmp = a.title.localeCompare(b.title, "zh");
        break;
      case "priority":
        cmp = PRIORITY_META[a.priority].rank - PRIORITY_META[b.priority].rank;
        break;
      case "created":
        cmp = a.createdAt.localeCompare(b.createdAt);
        break;
      case "updated":
      default:
        cmp = a.updatedAt.localeCompare(b.updatedAt);
        break;
    }
    return cmp * mul;
  });
}

export function isSystemView(view: SavedView | undefined | null): boolean {
  return view?.scope === "system";
}

interface ViewStore {
  issues: Issue[];
  views: SavedView[];
  activeViewId: string;
  selectedIssueId: string | null;
  sidebarOpen: boolean;
  dirty: boolean;
  draft: SavedView;

  selectView: (id: string) => void;
  setViewType: (type: ViewType) => void;
  setGroupBy: (groupBy: GroupBy) => void;
  setSort: (sortBy: SortBy, sortDir?: "asc" | "desc") => void;
  setSearch: (search: string) => void;
  toggleFilterValue: <K extends keyof Omit<ViewFilters, "search">>(
    key: K,
    value: ViewFilters[K][number],
  ) => void;
  setFilterField: <K extends keyof Omit<ViewFilters, "search">>(
    key: K,
    values: ViewFilters[K],
  ) => void;
  clearFilters: () => void;
  setVisibleColumns: (cols: string[]) => void;
  toggleColumn: (col: string) => void;
  moveIssue: (issueId: string, status: StatusId) => void;
  selectIssue: (id: string | null) => void;
  updateIssue: (id: string, patch: Partial<Issue>) => void;
  createView: (input: {
    name: string;
    description?: string;
    type: ViewType;
    color?: string | null;
  }) => string;
  saveDraftToView: () => void;
  /** Discard draft edits and reload from saved view */
  discardDraft: () => void;
  renameView: (id: string, name: string) => void;
  setViewColor: (id: string, color: string | null) => void;
  deleteView: (id: string) => void;
  duplicateView: (id: string) => string;
  toggleStar: (id: string) => void;
  setDefaultView: (id: string) => void;
  reorderViews: (fromId: string, toId: string) => void;
  setSidebarOpen: (open: boolean) => void;
  resetDemo: () => void;
}

function initialDraft(): SavedView {
  return deepCloneView(SEED_VIEWS[0]!);
}

export const useViewStore = create<ViewStore>()((set, get) => ({
  issues: SEED_ISSUES.map((i) => ({ ...i, labels: [...i.labels] })),
  views: SEED_VIEWS.map(deepCloneView),
  activeViewId: "v-board",
  selectedIssueId: null,
  sidebarOpen: false,
  dirty: false,
  draft: initialDraft(),

  selectView: (id) => {
    const view = get().views.find((v) => v.id === id);
    if (!view) return;
    set({
      activeViewId: id,
      draft: deepCloneView(view),
      dirty: false,
      selectedIssueId: null,
      sidebarOpen: false,
    });
  },

  setViewType: (type) =>
    set((s) => ({
      draft: { ...s.draft, type, updatedAt: nowIso() },
      dirty: true,
    })),

  setGroupBy: (groupBy) =>
    set((s) => ({
      draft: { ...s.draft, groupBy, updatedAt: nowIso() },
      dirty: true,
    })),

  setSort: (sortBy, sortDir) =>
    set((s) => ({
      draft: {
        ...s.draft,
        sortBy,
        sortDir: sortDir ?? s.draft.sortDir,
        updatedAt: nowIso(),
      },
      dirty: true,
    })),

  setSearch: (search) =>
    set((s) => ({
      draft: {
        ...s.draft,
        filters: { ...s.draft.filters, search },
        updatedAt: nowIso(),
      },
      dirty: true,
    })),

  toggleFilterValue: (key, value) =>
    set((s) => {
      const list = s.draft.filters[key] as string[];
      const exists = list.includes(value as string);
      const next = exists
        ? list.filter((x) => x !== value)
        : [...list, value as string];
      return {
        draft: {
          ...s.draft,
          filters: { ...s.draft.filters, [key]: next },
          updatedAt: nowIso(),
        },
        dirty: true,
      };
    }),

  setFilterField: (key, values) =>
    set((s) => ({
      draft: {
        ...s.draft,
        filters: { ...s.draft.filters, [key]: values },
        updatedAt: nowIso(),
      },
      dirty: true,
    })),

  clearFilters: () =>
    set((s) => ({
      draft: {
        ...s.draft,
        filters: createEmptyFilters(),
        updatedAt: nowIso(),
      },
      dirty: true,
    })),

  setVisibleColumns: (cols) =>
    set((s) => ({
      draft: { ...s.draft, visibleColumns: cols, updatedAt: nowIso() },
      dirty: true,
    })),

  toggleColumn: (col) =>
    set((s) => {
      const has = s.draft.visibleColumns.includes(col);
      const next = has
        ? s.draft.visibleColumns.filter((c) => c !== col)
        : [...s.draft.visibleColumns, col];
      if (!next.includes("title")) next.push("title");
      return {
        draft: { ...s.draft, visibleColumns: next, updatedAt: nowIso() },
        dirty: true,
      };
    }),

  moveIssue: (issueId, status) =>
    set((s) => ({
      issues: s.issues.map((i) =>
        i.id === issueId ? { ...i, status, updatedAt: nowIso() } : i,
      ),
    })),

  selectIssue: (id) => set({ selectedIssueId: id }),

  updateIssue: (id, patch) =>
    set((s) => ({
      issues: s.issues.map((i) =>
        i.id === id ? { ...i, ...patch, updatedAt: nowIso() } : i,
      ),
    })),

  createView: ({ name, description, type, color }) => {
    const id = `v-${Date.now()}`;
    const base = get().draft;
    const view: SavedView = {
      id,
      name,
      description,
      type,
      scope: "personal",
      color: color ?? base.color ?? "#0c66e4",
      starred: false,
      groupBy: base.groupBy,
      sortBy: base.sortBy,
      sortDir: base.sortDir,
      filters: {
        ...base.filters,
        statuses: [...base.filters.statuses],
        assignees: [...base.filters.assignees],
        priorities: [...base.filters.priorities],
        types: [...base.filters.types],
        labels: [...base.filters.labels],
      },
      visibleColumns: [...base.visibleColumns],
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    set((s) => ({
      views: [...s.views, view],
      activeViewId: id,
      draft: deepCloneView(view),
      dirty: false,
      sidebarOpen: false,
    }));
    return id;
  },

  saveDraftToView: () => {
    const { activeViewId, draft, views } = get();
    const existing = views.find((v) => v.id === activeViewId);
    if (!existing) return;
    if (existing.scope === "system") {
      toast.message("系统视图不可修改", {
        description: "请另存为你的私有视图",
      });
      return;
    }
    const updated = deepCloneView({
      ...draft,
      id: activeViewId,
      name: existing.name,
      description: existing.description,
      scope: "personal",
      color: existing.color,
      starred: existing.starred,
      isDefault: existing.isDefault,
      updatedAt: nowIso(),
    });
    set({
      views: views.map((v) => (v.id === activeViewId ? updated : v)),
      draft: updated,
      dirty: false,
    });
    toast.success("已更新视图");
  },

  discardDraft: () => {
    const { activeViewId, views } = get();
    const existing = views.find((v) => v.id === activeViewId);
    if (!existing) return;
    set({
      draft: deepCloneView(existing),
      dirty: false,
    });
  },

  renameView: (id, name) => {
    const target = get().views.find((v) => v.id === id);
    if (!target) return;
    if (target.scope === "system") {
      toast.message("系统视图不可重命名");
      return;
    }
    set((s) => ({
      views: s.views.map((v) =>
        v.id === id ? { ...v, name, updatedAt: nowIso() } : v,
      ),
      draft:
        s.activeViewId === id ? { ...s.draft, name, updatedAt: nowIso() } : s.draft,
    }));
  },

  setViewColor: (id, color) => {
    const target = get().views.find((v) => v.id === id);
    if (!target) return;
    if (target.scope === "system") {
      toast.message("系统视图不可自定义颜色");
      return;
    }
    set((s) => ({
      views: s.views.map((v) =>
        v.id === id ? { ...v, color, updatedAt: nowIso() } : v,
      ),
      draft:
        s.activeViewId === id
          ? { ...s.draft, color, updatedAt: nowIso() }
          : s.draft,
    }));
  },

  deleteView: (id) => {
    const { views, activeViewId } = get();
    const target = views.find((v) => v.id === id);
    if (!target) return;
    if (target.scope === "system") {
      toast.message("系统视图不可删除");
      return;
    }
    if (views.length <= 1) return;
    const next = views.filter((v) => v.id !== id);
    const switching = activeViewId === id;
    const nextActive = switching
      ? next[0]!
      : (views.find((v) => v.id === activeViewId) ?? next[0]!);
    set({
      views: next,
      activeViewId: nextActive.id,
      draft: deepCloneView(nextActive),
      dirty: false,
    });
  },

  duplicateView: (id) => {
    const src = get().views.find((v) => v.id === id);
    if (!src) return id;
    const newId = `v-${Date.now()}`;
    const copy = deepCloneView({
      ...src,
      id: newId,
      name: `${src.name} (副本)`,
      scope: "personal",
      color: src.color ?? "#0c66e4",
      starred: false,
      isDefault: false,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    });
    set((s) => ({
      views: [...s.views, copy],
      activeViewId: newId,
      draft: deepCloneView(copy),
      dirty: false,
      sidebarOpen: false,
    }));
    return newId;
  },

  toggleStar: (id) =>
    set((s) => ({
      views: s.views.map((v) => (v.id === id ? { ...v, starred: !v.starred } : v)),
      draft:
        s.activeViewId === id
          ? { ...s.draft, starred: !s.draft.starred }
          : s.draft,
    })),

  setDefaultView: (id) =>
    set((s) => ({
      views: s.views.map((v) => ({
        ...v,
        isDefault: v.id === id,
      })),
    })),

  reorderViews: (fromId, toId) => {
    if (fromId === toId) return;
    set((s) => {
      const list = [...s.views];
      const from = list.findIndex((v) => v.id === fromId);
      const to = list.findIndex((v) => v.id === toId);
      if (from < 0 || to < 0) return s;
      const [item] = list.splice(from, 1);
      list.splice(to, 0, item!);
      return { views: list };
    });
  },

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  resetDemo: () =>
    set({
      issues: SEED_ISSUES.map((i) => ({ ...i, labels: [...i.labels] })),
      views: SEED_VIEWS.map(deepCloneView),
      activeViewId: "v-board",
      selectedIssueId: null,
      dirty: false,
      draft: initialDraft(),
    }),
}));

export type { Priority, StatusId, ViewType, GroupBy, SortBy };

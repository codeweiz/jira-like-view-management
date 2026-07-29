import { useMemo } from "react";
import { filterIssues, sortIssues, useViewStore } from "@/store/view-store";

export function useFilteredIssues() {
  const issues = useViewStore((s) => s.issues);
  const filters = useViewStore((s) => s.draft.filters);
  const sortBy = useViewStore((s) => s.draft.sortBy);
  const sortDir = useViewStore((s) => s.draft.sortDir);

  return useMemo(() => {
    const filtered = filterIssues(issues, filters);
    return sortIssues(filtered, sortBy, sortDir);
  }, [issues, filters, sortBy, sortDir]);
}

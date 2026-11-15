import { useQuery } from "@tanstack/react-query"

import { getDashboardOverview } from "../api/dashboard-api"

export function useDashboardOverview() {
  const overviewQuery = useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: getDashboardOverview,
  })

  return {
    overview: overviewQuery.data,
    isLoading: overviewQuery.isLoading,
    isFetching: overviewQuery.isFetching,
    isError: overviewQuery.isError,
    error: overviewQuery.error,
    refetch: overviewQuery.refetch,
  }
}
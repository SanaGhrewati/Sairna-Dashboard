import { useQuery } from "@tanstack/react-query"

import {
  getUser,
  getUsers,
} from "../api/users-api"

export function useUsers() {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  })

  return {
    users: usersQuery.data,
    isLoading: usersQuery.isLoading,
    isFetching: usersQuery.isFetching,
    isError: usersQuery.isError,
    error: usersQuery.error,
    refetch: usersQuery.refetch,
  }
}

export function useUser(id) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
    enabled: Boolean(id),
  })
}
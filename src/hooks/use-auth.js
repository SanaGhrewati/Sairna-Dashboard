import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  getMe,
  login,
} from "../api/auth-api"

export function useAuth() {
  const queryClient = useQueryClient()

  const meQuery = useQuery({
    queryKey: ["auth", "me"],

    queryFn: getMe,

    enabled: Boolean(
      localStorage.getItem(
        "sairna_dashboard_token"
      )
    ),

    retry: false,
  })

  const loginMutation = useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      localStorage.setItem(
        "sairna_dashboard_token",
        data.accessToken
      )

      queryClient.setQueryData(
        ["auth", "me"],
        data.user
      )
    },
  })

  const logout = () => {
    localStorage.removeItem(
      "sairna_dashboard_token"
    )

    queryClient.removeQueries({
      queryKey: ["auth", "me"],
    })
  }

  return {
    user: meQuery.data,

    isLoadingUser:
      meQuery.isLoading,

    isAuthenticated:
      Boolean(meQuery.data),

    login:
      loginMutation.mutateAsync,

    isLoggingIn:
      loginMutation.isPending,

    loginError:
      loginMutation.error,

    logout,
  }
}
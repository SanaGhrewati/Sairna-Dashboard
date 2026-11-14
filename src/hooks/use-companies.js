import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  createCompany,
  deleteCompany,
  getCompanies,
  updateCompany,
} from "../api/companies-api"

export function useCompanies() {
  const queryClient = useQueryClient()

  const companiesQuery = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  })

  const createMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateCompany,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      })

      queryClient.invalidateQueries({
        queryKey: ["companies", variables.id],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      })
    },
  })

  return {
    companies: companiesQuery.data,
    isLoading: companiesQuery.isLoading,
    isFetching: companiesQuery.isFetching,
    isError: companiesQuery.isError,
    error: companiesQuery.error,
    refetch: companiesQuery.refetch,

    createCompany: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,

    updateCompany: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,

    deleteCompany: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  }
}
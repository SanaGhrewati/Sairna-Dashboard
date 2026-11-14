import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  cancelTrip,
  createTrip,
  getTrip,
  getTrips,
  updateTrip,
} from "../api/trips-api"

export function useTrips() {
  const queryClient = useQueryClient()

  const tripsQuery = useQuery({
    queryKey: ["trips"],
    queryFn: getTrips,
  })

  const createMutation = useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trips"],
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateTrip,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["trips"],
      })

      queryClient.invalidateQueries({
        queryKey: ["trips", variables.id],
      })
    },
  })

  const cancelMutation = useMutation({
    mutationFn: cancelTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trips"],
      })
    },
  })

  return {
    trips: tripsQuery.data,
    isLoading: tripsQuery.isLoading,
    isFetching: tripsQuery.isFetching,
    isError: tripsQuery.isError,
    error: tripsQuery.error,
    refetch: tripsQuery.refetch,

    getTrip,

    createTrip: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,

    updateTrip: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,

    cancelTrip: cancelMutation.mutateAsync,
    isCancelling: cancelMutation.isPending,
    cancelError: cancelMutation.error,
  }
}

export function useTrip(id) {
  return useQuery({
    queryKey: ["trips", id],
    queryFn: () => getTrip(id),
    enabled: Boolean(id),
  })
}
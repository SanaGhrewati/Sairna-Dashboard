import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  cancelBooking,
  getBooking,
  getBookings,
} from "../api/bookings-api"

export function useBookings() {
  const queryClient = useQueryClient()

  const bookingsQuery = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  })

  const cancelMutation = useMutation({
    mutationFn: cancelBooking,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      })

      queryClient.invalidateQueries({
        queryKey: ["bookings", id],
      })
    },
  })

  return {
    bookings: bookingsQuery.data,
    isLoading: bookingsQuery.isLoading,
    isFetching: bookingsQuery.isFetching,
    isError: bookingsQuery.isError,
    error: bookingsQuery.error,
    refetch: bookingsQuery.refetch,

    getBooking,

    cancelBooking: cancelMutation.mutateAsync,
    isCancelling: cancelMutation.isPending,
    cancelError: cancelMutation.error,
  }
}

export function useBooking(id) {
  return useQuery({
    queryKey: ["bookings", id],
    queryFn: () => getBooking(id),
    enabled: Boolean(id),
  })
}
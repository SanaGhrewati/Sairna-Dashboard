import { useQuery } from "@tanstack/react-query"
import { getCities } from "../api/cities-api"

export function useCities() {
  const citiesQuery = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  })

  return {
    cities: citiesQuery.data,
    isLoading: citiesQuery.isLoading,
    isFetching: citiesQuery.isFetching,
    isError: citiesQuery.isError,
    error: citiesQuery.error,
    refetch: citiesQuery.refetch,
  }
}
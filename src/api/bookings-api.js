import apiClient from "./api-client"

export const getBookings = async () => {
  const response = await apiClient.get("/bookings")
  return response.data
}

export const getBooking = async (id) => {
  const response = await apiClient.get(`/bookings/${id}`)
  return response.data
}

export const cancelBooking = async (id) => {
  const response = await apiClient.post(
    `/bookings/${id}/cancel`
  )

  return response.data
}
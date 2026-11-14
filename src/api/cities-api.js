import apiClient from "./api-client"

export const getCities = async () => {
  const response = await apiClient.get("/cities")
  return response.data
}
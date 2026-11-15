import apiClient from "./api-client"

export const getDashboardOverview = async () => {
  const response = await apiClient.get("/overview")
  return response.data
}
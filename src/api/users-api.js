import apiClient from "./api-client"

export const getUsers = async () => {
  const response = await apiClient.get("/users")
  return response.data
}

export const getUser = async (id) => {
  const response = await apiClient.get(`/users/${id}`)
  return response.data
}
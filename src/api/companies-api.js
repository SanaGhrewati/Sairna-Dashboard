import apiClient from "./api-client"

export const getCompanies = async () => {
  const response = await apiClient.get("/companies")
  return response.data
}

export const createCompany = async (companyData) => {
  const response = await apiClient.post(
    "/companies",
    companyData
  )

  return response.data
}

export const updateCompany = async ({ id, data }) => {
  const response = await apiClient.patch(
    `/companies/${id}`,
    data
  )

  return response.data
}

export const deleteCompany = async (id) => {
  const response = await apiClient.delete(
    `/companies/${id}`
  )

  return response.data
}
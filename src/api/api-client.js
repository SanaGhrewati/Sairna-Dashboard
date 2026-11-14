import axios from "axios"

const apiClient = axios.create({
  baseURL:
    "https://sairna.abdulrahman-hares.com/api/v1/dashboard",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(
      "sairna_dashboard_token"
    )

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
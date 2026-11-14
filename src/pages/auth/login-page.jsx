import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../../hooks/use-auth"

function LoginPage() {
  const navigate = useNavigate()

  const {
    login,
    isLoggingIn,
    loginError,
  } = useAuth()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const data = await login(formData)

      console.log(
        "Login successful:",
        data
      )

      navigate("/dashboard")
    } catch (error) {
      console.error(
        "Login error:",
        error
      )
    }
  }

  const errorMessage =
    loginError?.response?.data?.message ||
    "حدث خطأ أثناء تسجيل الدخول"

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-[#f8fafb] px-4"
    >
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#103a4e]">
            تسجيل الدخول
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            لوحة تحكم سيرنا
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#103a4e]"
            >
              البريد الإلكتروني
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@email.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0aa99b] focus:ring-2 focus:ring-[#0aa99b]/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#103a4e]"
            >
              كلمة المرور
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0aa99b] focus:ring-2 focus:ring-[#0aa99b]/10"
            />
          </div>

          {loginError && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full rounded-xl bg-[#0aa99b] px-4 py-3 font-bold text-white transition hover:bg-[#078e87] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingIn
              ? "جاري تسجيل الدخول..."
              : "تسجيل الدخول"}
          </button>

        </form>
      </div>
    </main>
  )
}

export default LoginPage
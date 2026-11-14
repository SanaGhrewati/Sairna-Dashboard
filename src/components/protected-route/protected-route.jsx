import { Navigate, Outlet } from "react-router-dom"

import { useAuth } from "../../hooks/use-auth"

function ProtectedRoute() {
  const {
    user,
    isLoadingUser,
    isAuthenticated,
  } = useAuth()

  if (isLoadingUser) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#f8fafb]"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#0aa99b] border-t-transparent" />

          <p className="text-sm font-semibold text-[#103a4e]">
            جاري التحقق من تسجيل الدخول...
          </p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute
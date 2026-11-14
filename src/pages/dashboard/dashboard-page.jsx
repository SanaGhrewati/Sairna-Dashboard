import { useAuth } from "../../hooks/use-auth"

function DashboardPage() {
  const { user } = useAuth()

  return (
    <section dir="rtl">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#103a4e]">
          أهلاً {user?.name}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          مرحباً بك في لوحة تحكم سيرنا
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            الدور
          </p>

          <p className="mt-3 text-2xl font-bold text-[#103a4e]">
            {user?.role}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            الاسم
          </p>

          <p className="mt-3 text-xl font-bold text-[#103a4e]">
            {user?.name}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            البريد الإلكتروني
          </p>

          <p className="mt-3 break-all text-sm font-bold text-[#103a4e]">
            {user?.email}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            الحالة
          </p>

          <p className="mt-3 text-xl font-bold text-[#0aa99b]">
            متصل
          </p>
        </div>

      </div>

    </section>
  )
}

export default DashboardPage
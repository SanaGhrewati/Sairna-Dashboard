import {
  FiAlertCircle,
  FiCheckCircle,
  FiRefreshCw,
  FiTruck,
  FiUsers,
  FiBriefcase,
  FiCalendar,
} from "react-icons/fi";

import { useAuth } from "../../hooks/use-auth";
import { useDashboardOverview } from "../../hooks/use-dashboard";

function DashboardPage() {
  const { user } = useAuth();

  const { overview, isLoading, isFetching, isError, refetch } =
    useDashboardOverview();

  return (
    <section dir="rtl" className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#103a4e]">
            أهلاً {user?.name}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            مرحباً بك في لوحة تحكم سيرنا
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#103a4e] shadow-sm transition hover:border-[#0aa99b] hover:text-[#078e87] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiRefreshCw size={17} className={isFetching ? "animate-spin" : ""} />
          تحديث البيانات
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">الدور</p>

          <p className="mt-3 text-2xl font-bold text-[#103a4e]">{user?.role}</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">الاسم</p>

          <p className="mt-3 text-xl font-bold text-[#103a4e]">{user?.name}</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">البريد الإلكتروني</p>

          <p className="mt-3 break-all text-sm font-bold text-[#103a4e]">
            {user?.email}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">الحالة</p>

          <p className="mt-3 flex items-center gap-2 text-xl font-bold text-[#0aa99b]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0aa99b]" />
            متصل
          </p>
        </div>
      </div>

      <div>
        <div className="mb-5">
          <h3 className="text-xl font-bold text-[#103a4e]">نظرة عامة</h3>

          <p className="mt-1 text-sm text-slate-500">إحصائيات المنصة الحالية</p>
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiAlertCircle size={25} />
            </div>

            <h3 className="mt-4 font-bold text-[#103a4e]">
              تعذر تحميل الإحصائيات
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              حدث خطأ أثناء جلب بيانات لوحة التحكم.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0aa99b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#078e87]"
            >
              <FiRefreshCw size={16} />
              إعادة المحاولة
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    العملاء
                  </p>

                  <p className="mt-3 text-3xl font-black text-[#103a4e]">
                    {overview?.customers ?? 0}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e6f8f3] text-[#078e87]">
                  <FiUsers size={22} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    شركات النقل
                  </p>

                  <p className="mt-3 text-3xl font-black text-[#103a4e]">
                    {overview?.companies ?? 0}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FiBriefcase size={22} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    الرحلات القادمة
                  </p>

                  <p className="mt-3 text-3xl font-black text-[#103a4e]">
                    {overview?.upcomingTrips ?? 0}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <FiTruck size={22} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    إجمالي الحجوزات
                  </p>

                  <p className="mt-3 text-3xl font-black text-[#103a4e]">
                    {overview?.totalBookings ?? 0}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <FiCalendar size={22} />
                </div>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !isError && overview && (
          <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  الحجوزات المؤكدة
                </p>

                <p className="mt-2 text-2xl font-black text-[#103a4e]">
                  {overview.confirmedBookings ?? 0}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e6f8f3] text-[#078e87]">
                <FiCheckCircle size={23} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default DashboardPage;

import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiTruck,
  FiXCircle,
} from "react-icons/fi"

import { useTrips } from "../../hooks/use-trips"
import TripCard from "./components/trip-card"

function TripsPage() {
  const navigate = useNavigate()

  const {
    trips,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    cancelTrip,
    isCancelling,
  } = useTrips()

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("ALL")

  const tripsList = useMemo(() => {
    if (Array.isArray(trips)) {
      return trips
    }

    if (Array.isArray(trips?.items)) {
      return trips.items
    }

    if (Array.isArray(trips?.data)) {
      return trips.data
    }

    return []
  }, [trips])

  const filteredTrips = useMemo(() => {
    return tripsList.filter((trip) => {
      const searchValue = search.trim().toLowerCase()

      const matchesSearch =
        !searchValue ||
        String(trip?.id || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(trip?.code || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(trip?.company?.name || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(trip?.origin?.name || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(trip?.destination?.name || "")
          .toLowerCase()
          .includes(searchValue)

      const status =
        trip?.status ||
        trip?.state ||
        "AVAILABLE"

      const matchesFilter =
        filter === "ALL" ||
        status === filter

      return matchesSearch && matchesFilter
    })
  }, [tripsList, search, filter])

  const statistics = useMemo(() => {
    const available = tripsList.filter((trip) => {
      const status =
        trip?.status ||
        trip?.state ||
        "AVAILABLE"

      return (
        status === "AVAILABLE" ||
        status === "ACTIVE"
      )
    }).length

    const cancelled = tripsList.filter((trip) => {
      const status =
        trip?.status ||
        trip?.state ||
        ""

      return (
        status === "CANCELLED" ||
        status === "CANCELED"
      )
    }).length

    const completed = tripsList.filter((trip) => {
      const status =
        trip?.status ||
        trip?.state ||
        ""

      return status === "COMPLETED"
    }).length

    return {
      total: tripsList.length,
      available,
      cancelled,
      completed,
    }
  }, [tripsList])

  const handleCancel = async (trip) => {
    const confirmed = window.confirm(
      `هل أنت متأكد من إلغاء الرحلة ${
        trip?.code || `#${trip?.id}`
      }؟`
    )

    if (!confirmed) {
      return
    }

    try {
      await cancelTrip(trip.id)
    } catch (error) {
      window.alert(
        error?.response?.data?.message ||
          "حدث خطأ أثناء إلغاء الرحلة"
      )
    }
  }

  if (isLoading) {
    return (
      <section dir="rtl">
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#0aa99b] border-t-transparent" />

            <p className="mt-4 text-sm font-bold text-slate-500">
              جاري تحميل الرحلات...
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section dir="rtl">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
          <FiXCircle
            size={42}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-4 text-lg font-black text-red-600">
            تعذر تحميل الرحلات
          </h2>

          <p className="mt-2 text-sm text-red-500">
            {error?.response?.data?.message ||
              "حدث خطأ أثناء الاتصال بالخادم"}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-600"
          >
            <FiRefreshCw size={17} />
            إعادة المحاولة
          </button>
        </div>
      </section>
    )
  }

  return (
    <section dir="rtl">
      <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
        <div>
          <h1 className="text-2xl font-black text-[#103a4e] sm:text-3xl">
            الرحلات
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            إدارة ومتابعة جميع الرحلات في منصة سيرنا
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#103a4e] transition hover:bg-slate-50 disabled:opacity-50"
          >
            <FiRefreshCw
              size={17}
              className={
                isFetching
                  ? "animate-spin"
                  : ""
              }
            />

            تحديث
          </button>

          <button
            type="button"
            onClick={() => navigate("/trips/new")}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0aa99b] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#078e87]"
          >
            <FiPlus size={18} />
            إضافة رحلة
          </button>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                إجمالي الرحلات
              </p>

              <p className="mt-2 text-3xl font-black text-[#103a4e]">
                {statistics.total}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e6f8f3] text-[#078e87]">
              <FiTruck size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                الرحلات المتاحة
              </p>

              <p className="mt-2 text-3xl font-black text-emerald-600">
                {statistics.available}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <FiCheckCircle size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                الرحلات المكتملة
              </p>

              <p className="mt-2 text-3xl font-black text-slate-600">
                {statistics.completed}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
              <FiClock size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                الرحلات الملغاة
              </p>

              <p className="mt-2 text-3xl font-black text-red-500">
                {statistics.cancelled}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <FiXCircle size={22} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <FiSearch
              size={19}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="ابحث برقم الرحلة أو الشركة أو المدينة..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-4 pr-11 text-sm outline-none transition focus:border-[#0aa99b] focus:ring-2 focus:ring-[#0aa99b]/10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setFilter("ALL")}
              className={`whitespace-nowrap rounded-xl px-5 py-3 text-sm font-bold transition ${
                filter === "ALL"
                  ? "bg-[#0aa99b] text-white"
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              الكل
            </button>

            <button
              type="button"
              onClick={() => setFilter("AVAILABLE")}
              className={`whitespace-nowrap rounded-xl px-5 py-3 text-sm font-bold transition ${
                filter === "AVAILABLE"
                  ? "bg-[#0aa99b] text-white"
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              المتاحة
            </button>

            <button
              type="button"
              onClick={() => setFilter("COMPLETED")}
              className={`whitespace-nowrap rounded-xl px-5 py-3 text-sm font-bold transition ${
                filter === "COMPLETED"
                  ? "bg-[#0aa99b] text-white"
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              المكتملة
            </button>

            <button
              type="button"
              onClick={() => setFilter("CANCELLED")}
              className={`whitespace-nowrap rounded-xl px-5 py-3 text-sm font-bold transition ${
                filter === "CANCELLED"
                  ? "bg-[#0aa99b] text-white"
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              الملغاة
            </button>
          </div>
        </div>
      </div>

      {filteredTrips.length === 0 ? (
        <div className="rounded-3xl border border-slate-100 bg-white px-6 py-16 text-center shadow-sm">
          <FiTruck
            size={42}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-lg font-black text-[#103a4e]">
            لا توجد رحلات
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            لا توجد نتائج مطابقة للبحث الحالي
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-5 text-sm font-bold text-[#078e87] hover:underline"
            >
              مسح البحث
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {filteredTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onEdit={(id) =>
                navigate(`/trips/${id}/edit`)
              }
              onCancel={handleCancel}
              isCancelling={isCancelling}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default TripsPage
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPhone,
  FiRefreshCw,
  FiTrash2,
  FiUser,
  FiUsers,
  FiXCircle,
} from "react-icons/fi"

import { useBooking, useBookings } from "../../hooks/use-bookings"

function BookingDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data: booking,
    isLoading,
    isError,
    error,
    refetch,
  } = useBooking(id)

  const {
    cancelBooking,
    isCancelling,
    cancelError,
  } = useBookings()

  const [showConfirm, setShowConfirm] = useState(false)

  const formatDate = (date) => {
    if (!date) {
      return "—"
    }

    return new Intl.DateTimeFormat("ar-SY", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date))
  }

  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return "—"
    }

    return `${new Intl.NumberFormat("ar-SY").format(price)} ل.س`
  }

  const handleCancel = async () => {
    try {
      await cancelBooking(booking.id)
      setShowConfirm(false)
      await refetch()
    } catch {
    }
  }

  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="space-y-6"
      >
        <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-80 animate-pulse rounded-2xl bg-white shadow-sm" />
      </div>
    )
  }

  if (isError || !booking) {
    return (
      <div
        dir="rtl"
        className="space-y-6"
      >
        <button
          type="button"
          onClick={() => navigate("/bookings")}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#078e87]"
        >
          <FiArrowRight />
          العودة للحجوزات
        </button>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-red-100 p-3 text-red-600">
              <FiXCircle size={24} />
            </div>

            <div>
              <h2 className="font-black text-red-800">
                تعذر تحميل تفاصيل الحجز
              </h2>

              <p className="mt-2 text-sm text-red-700">
                {error?.response?.data?.message ||
                  error?.message ||
                  "حدث خطأ أثناء تحميل البيانات"}
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white"
              >
                <FiRefreshCw size={16} />
                إعادة المحاولة
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const isConfirmed = booking.status === "CONFIRMED"
  const seats = booking.seats || []

  return (
    <div
      dir="rtl"
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/bookings")}
            className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-[#078e87]"
          >
            <FiArrowRight />
            العودة للحجوزات
          </button>

          <h1 className="text-2xl font-black text-[#103a4e]">
            تفاصيل الحجز
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {booking.code}
          </p>
        </div>

        {isConfirmed && (
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            disabled={isCancelling}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiTrash2 size={17} />
            إلغاء الحجز
          </button>
        )}
      </div>

      {cancelError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
          {cancelError?.response?.data?.message ||
            cancelError?.message ||
            "تعذر إلغاء الحجز"}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400">
                رقم الحجز
              </p>

              <h2 className="mt-1 text-2xl font-black text-[#103a4e]">
                {booking.code}
              </h2>
            </div>

            {booking.status === "CONFIRMED" ? (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">
                <FiCheckCircle />
                مؤكد
              </span>
            ) : (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-black text-red-700">
                <FiXCircle />
                ملغى
              </span>
            )}
          </div>

          <div className="my-6 h-px bg-slate-100" />

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white p-2.5 text-[#078e87] shadow-sm">
                  <FiUser size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400">
                    المستخدم
                  </p>

                  <p className="mt-1 font-black text-[#103a4e]">
                    {booking.user?.name || "—"}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-500">
                {booking.user?.email || "—"}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white p-2.5 text-[#078e87] shadow-sm">
                  <FiCalendar size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400">
                    تاريخ إنشاء الحجز
                  </p>

                  <p className="mt-1 font-black text-[#103a4e]">
                    {formatDate(booking.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-slate-500">
            إجمالي السعر
          </p>

          <p className="mt-2 text-3xl font-black text-[#078e87]">
            {formatPrice(booking.totalPrice)}
          </p>

          {booking.cancelledAt && (
            <div className="mt-5 rounded-xl bg-red-50 p-3">
              <p className="text-xs font-bold text-red-500">
                تاريخ الإلغاء
              </p>

              <p className="mt-1 text-sm font-black text-red-700">
                {formatDate(booking.cancelledAt)}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-[#103a4e]">
          تفاصيل الرحلة
        </h2>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-xs font-bold text-slate-400">
              الرحلة
            </p>

            <p className="mt-2 font-black text-[#103a4e]">
              {booking.trip?.code || "—"}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {booking.trip?.company?.name || "—"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white p-2.5 text-[#078e87] shadow-sm">
                <FiMapPin size={19} />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400">
                  المسار
                </p>

                <p className="mt-1 font-black text-[#103a4e]">
                  {booking.trip?.origin?.name || "—"}
                  {" ← "}
                  {booking.trip?.destination?.name || "—"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white p-2.5 text-[#078e87] shadow-sm">
                <FiClock size={19} />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400">
                  المغادرة
                </p>

                <p className="mt-1 font-black text-[#103a4e]">
                  {formatDate(
                    booking.trip?.departureAt
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400">
                الوصول
              </p>

              <p className="mt-1 font-black text-[#103a4e]">
                {formatDate(booking.trip?.arrivalAt)}
              </p>
            </div>

            <FiClock
              size={22}
              className="text-[#0aa99b]"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-[#103a4e]">
              المقاعد
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {seats.length} مقعد
            </p>
          </div>

          <div className="rounded-xl bg-[#e6f8f3] p-3 text-[#078e87]">
            <FiUsers size={21} />
          </div>
        </div>

        {seats.length === 0 ? (
          <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-center text-sm font-semibold text-slate-400">
            لا توجد مقاعد مرتبطة بهذا الحجز.
          </div>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {seats.map((seat) => (
              <div
                key={seat.id}
                className="rounded-2xl border border-slate-100 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-[#e6f8f3] px-2.5 py-1 text-xs font-black text-[#078e87]">
                    مقعد {seat.seatNumber}
                  </span>
                </div>

                <p className="mt-4 font-black text-[#103a4e]">
                  {seat.passengerName || "—"}
                </p>

                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <FiPhone size={13} />
                  {seat.passengerPhone || "—"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#103a4e]/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <FiTrash2 size={24} />
            </div>

            <h2 className="mt-5 text-xl font-black text-[#103a4e]">
              إلغاء الحجز؟
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              هل أنت متأكد من رغبتك في إلغاء هذا الحجز؟
              سيتم تنفيذ الإلغاء من خلال الخادم.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={isCancelling}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50"
              >
                تراجع
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={isCancelling}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCancelling
                  ? "جاري الإلغاء..."
                  : "تأكيد الإلغاء"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingDetailsPage
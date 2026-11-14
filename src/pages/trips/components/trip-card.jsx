import {
  FiCalendar,
  FiClock,
  FiEdit3,
  FiMapPin,
  FiTrash2,
  FiUsers,
} from "react-icons/fi"

function TripCard({
  trip,
  onEdit,
  onCancel,
  isCancelling,
}) {
  const departureDate = trip?.departureAt
    ? new Date(trip.departureAt)
    : null

  const arrivalDate = trip?.arrivalAt
    ? new Date(trip.arrivalAt)
    : null

  const availableSeats =
    trip?.availableSeats ??
    trip?.totalSeats ??
    0

  const totalSeats = trip?.totalSeats ?? 0

  const status =
    trip?.status ||
    trip?.state ||
    "AVAILABLE"

  const statusMap = {
    AVAILABLE: {
      label: "متاحة",
      className: "bg-emerald-50 text-emerald-600",
    },
    ACTIVE: {
      label: "نشطة",
      className: "bg-emerald-50 text-emerald-600",
    },
    CANCELLED: {
      label: "ملغاة",
      className: "bg-red-50 text-red-600",
    },
    CANCELED: {
      label: "ملغاة",
      className: "bg-red-50 text-red-600",
    },
    COMPLETED: {
      label: "مكتملة",
      className: "bg-slate-100 text-slate-600",
    },
    PENDING: {
      label: "قيد الانتظار",
      className: "bg-amber-50 text-amber-600",
    },
  }

  const currentStatus =
    statusMap[status] || {
      label: status,
      className: "bg-slate-100 text-slate-600",
    }

  const companyName =
    trip?.company?.name ||
    trip?.companyName ||
    "غير محدد"

  const originName =
    trip?.origin?.name ||
    trip?.originName ||
    "غير محدد"

  const destinationName =
    trip?.destination?.name ||
    trip?.destinationName ||
    "غير محدد"

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="border-b border-slate-100 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e6f8f3] text-[#078e87]">
              <FiMapPin size={21} />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-base font-black text-[#103a4e]">
                {trip?.code || `رحلة #${trip?.id}`}
              </h3>

              <p className="mt-1 truncate text-xs text-slate-400">
                {companyName}
              </p>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${currentStatus.className}`}
          >
            {currentStatus.label}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="relative mb-6">
          <div className="absolute right-2 top-7 h-[calc(100%-56px)] w-px bg-slate-200" />

          <div className="relative flex items-start gap-4">
            <div className="relative z-10 mt-1 h-4 w-4 rounded-full border-4 border-[#e6f8f3] bg-[#0aa99b]" />

            <div className="flex-1">
              <p className="text-xs text-slate-400">
                الانطلاق
              </p>

              <p className="mt-1 font-black text-[#103a4e]">
                {originName}
              </p>

              {departureDate && (
                <p className="mt-1 text-xs text-slate-400">
                  {departureDate.toLocaleTimeString("ar-SY", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          </div>

          <div className="relative mt-5 flex items-start gap-4">
            <div className="relative z-10 mt-1 h-4 w-4 rounded-full border-4 border-[#e6f8f3] bg-[#103a4e]" />

            <div className="flex-1">
              <p className="text-xs text-slate-400">
                الوصول
              </p>

              <p className="mt-1 font-black text-[#103a4e]">
                {destinationName}
              </p>

              {arrivalDate && (
                <p className="mt-1 text-xs text-slate-400">
                  {arrivalDate.toLocaleTimeString("ar-SY", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <FiCalendar size={15} />
              التاريخ
            </div>

            <p className="mt-2 text-sm font-bold text-[#103a4e]">
              {departureDate
                ? departureDate.toLocaleDateString(
                    "ar-SY"
                  )
                : "-"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <FiClock size={15} />
              الانطلاق
            </div>

            <p className="mt-2 text-sm font-bold text-[#103a4e]">
              {departureDate
                ? departureDate.toLocaleTimeString(
                    "ar-SY",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                : "-"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <FiUsers size={15} />
              المقاعد
            </div>

            <p className="mt-2 text-sm font-bold text-[#103a4e]">
              {availableSeats} / {totalSeats}
            </p>
          </div>

          <div className="rounded-2xl bg-[#e6f8f3] p-3">
            <p className="text-xs text-slate-400">
              السعر
            </p>

            <p className="mt-2 text-sm font-black text-[#078e87]">
              {trip?.price != null
                ? `${Number(
                    trip.price
                  ).toLocaleString("ar-SY")} ل.س`
                : "-"}
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={() => onEdit(trip.id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-[#103a4e] transition hover:border-[#0aa99b] hover:bg-[#e6f8f3] hover:text-[#078e87]"
          >
            <FiEdit3 size={17} />
            تعديل
          </button>

          <button
            type="button"
            onClick={() => onCancel(trip)}
            disabled={isCancelling}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiTrash2 size={17} />

            {isCancelling
              ? "جاري الإلغاء..."
              : "إلغاء الرحلة"}
          </button>
        </div>
      </div>
    </article>
  )
}

export default TripCard
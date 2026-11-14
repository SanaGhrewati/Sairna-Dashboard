import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiAlertCircle,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEye,
  FiMapPin,
  FiPhone,
  FiRefreshCw,
  FiSearch,
  FiUser,
  FiUsers,
  FiXCircle,
} from "react-icons/fi";

import { useBookings } from "../../hooks/use-bookings";

function BookingsPage() {
  const navigate = useNavigate();

  const { bookings, isLoading, isFetching, isError, error, refetch } =
    useBookings();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const bookingList = useMemo(() => {
    if (Array.isArray(bookings)) {
      return bookings;
    }

    if (Array.isArray(bookings?.items)) {
      return bookings.items;
    }

    if (Array.isArray(bookings?.data)) {
      return bookings.data;
    }

    return [];
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    const value = search.trim().toLowerCase();

    return bookingList.filter((booking) => {
      const matchesStatus =
        statusFilter === "ALL" || booking.status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!value) {
        return true;
      }

      const searchableText = [
        booking.code,
        booking.id,
        booking.user?.name,
        booking.user?.email,
        booking.trip?.code,
        booking.trip?.company?.name,
        booking.trip?.origin?.name,
        booking.trip?.destination?.name,
        ...(booking.seats || []).map((seat) => seat.passengerName),
        ...(booking.seats || []).map((seat) => seat.passengerPhone),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(value);
    });
  }, [bookingList, search, statusFilter]);

  const totalCount = bookingList.length;

  const confirmedCount = bookingList.filter(
    (booking) => booking.status === "CONFIRMED",
  ).length;

  const cancelledCount = bookingList.filter(
    (booking) => booking.status === "CANCELLED",
  ).length;

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Intl.DateTimeFormat("ar-SY", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return "—";
    }

    return `${new Intl.NumberFormat("ar-SY").format(price)} ل.س`;
  };

  const getStatus = (status) => {
    if (status === "CONFIRMED") {
      return {
        label: "مؤكد",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: FiCheckCircle,
      };
    }

    if (status === "CANCELLED") {
      return {
        label: "ملغى",
        className: "bg-red-50 text-red-700 border-red-200",
        icon: FiXCircle,
      };
    }

    return {
      label: status || "غير معروف",
      className: "bg-slate-50 text-slate-600 border-slate-200",
      icon: FiAlertCircle,
    };
  };

  if (isLoading) {
    return (
      <div className="space-y-6" dir="rtl">
        <div>
          <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-3 h-4 w-72 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-white shadow-sm"
            />
          ))}
        </div>

        <div className="h-96 animate-pulse rounded-2xl bg-white shadow-sm" />
      </div>
    );
  }

  if (isError) {
    return (
      <div dir="rtl" className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-[#103a4e]">الحجوزات</h1>

          <p className="mt-2 text-sm text-slate-500">
            إدارة ومتابعة حجوزات الرحلات
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-red-100 p-3 text-red-600">
              <FiAlertCircle size={24} />
            </div>

            <div className="flex-1">
              <h2 className="font-black text-red-800">
                حدث خطأ أثناء تحميل الحجوزات
              </h2>

              <p className="mt-2 text-sm text-red-700">
                {error?.response?.data?.message ||
                  error?.message ||
                  "تعذر الاتصال بالخادم"}
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
              >
                <FiRefreshCw size={16} />
                إعادة المحاولة
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#103a4e]">الحجوزات</h1>

          <p className="mt-2 text-sm text-slate-500">
            إدارة ومتابعة حجوزات الرحلات من لوحة التحكم
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-[#103a4e] shadow-sm transition hover:border-[#0aa99b] hover:text-[#078e87] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiRefreshCw size={17} className={isFetching ? "animate-spin" : ""} />
          تحديث
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                إجمالي الحجوزات
              </p>

              <p className="mt-2 text-3xl font-black text-[#103a4e]">
                {totalCount}
              </p>
            </div>

            <div className="rounded-2xl bg-[#e6f8f3] p-3 text-[#078e87]">
              <FiCalendar size={23} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                الحجوزات المؤكدة
              </p>

              <p className="mt-2 text-3xl font-black text-emerald-600">
                {confirmedCount}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
              <FiCheckCircle size={23} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                الحجوزات الملغاة
              </p>

              <p className="mt-2 text-3xl font-black text-red-600">
                {cancelledCount}
              </p>
            </div>

            <div className="rounded-2xl bg-red-50 p-3 text-red-600">
              <FiXCircle size={23} />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <FiSearch
              size={19}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحث برقم الحجز، المستخدم، الرحلة، المدينة..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-11 pl-4 text-sm font-semibold text-[#103a4e] outline-none transition focus:border-[#0aa99b] focus:bg-white focus:ring-2 focus:ring-[#0aa99b]/10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setStatusFilter("ALL")}
              className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                statusFilter === "ALL"
                  ? "bg-[#0aa99b] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              الكل
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("CONFIRMED")}
              className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                statusFilter === "CONFIRMED"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              المؤكدة
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("CANCELLED")}
              className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                statusFilter === "CANCELLED"
                  ? "bg-red-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              الملغاة
            </button>
          </div>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <FiCalendar size={28} />
          </div>

          <h2 className="mt-5 text-lg font-black text-[#103a4e]">
            لا توجد حجوزات
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            لم يتم العثور على حجوزات تطابق البحث الحالي.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-5 py-4 text-right text-xs font-black text-slate-500">
                    الحجز
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-black text-slate-500">
                    المستخدم
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-black text-slate-500">
                    الرحلة
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-black text-slate-500">
                    موعد الرحلة
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-black text-slate-500">
                    المقاعد
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-black text-slate-500">
                    السعر
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-black text-slate-500">
                    الحالة
                  </th>

                  <th className="px-5 py-4 text-center text-xs font-black text-slate-500">
                    التفاصيل
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => {
                  const status = getStatus(booking.status);
                  const StatusIcon = status.icon;
                  const seats = booking.seats || [];

                  return (
                    <tr
                      key={booking.id}
                      className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-5">
                        <div>
                          <p className="font-black text-[#103a4e]">
                            {booking.code || "—"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            ID: {booking.id}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f8f3] text-[#078e87]">
                            <FiUser size={18} />
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[180px] truncate font-bold text-[#103a4e]">
                              {booking.user?.name || "—"}
                            </p>

                            <p className="mt-1 max-w-[180px] truncate text-xs text-slate-400">
                              {booking.user?.email || "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div>
                          <p className="font-bold text-[#103a4e]">
                            {booking.trip?.code || "—"}
                          </p>

                          <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
                            <FiMapPin size={14} />

                            <span>{booking.trip?.origin?.name || "—"}</span>

                            <span>←</span>

                            <span>
                              {booking.trip?.destination?.name || "—"}
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-slate-400">
                            {booking.trip?.company?.name || "—"}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex items-start gap-2">
                          <FiClock
                            size={16}
                            className="mt-0.5 shrink-0 text-[#0aa99b]"
                          />

                          <div>
                            <p className="text-sm font-bold text-[#103a4e]">
                              {formatDate(booking.trip?.departureAt)}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              الوصول: {formatDate(booking.trip?.arrivalAt)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        {seats.length > 0 ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-bold text-[#103a4e]">
                              <FiUsers size={16} />
                              {seats.length} مقعد
                            </div>

                            <div className="space-y-1">
                              {seats.slice(0, 2).map((seat) => (
                                <div
                                  key={seat.id}
                                  className="text-xs text-slate-500"
                                >
                                  مقعد {seat.seatNumber} —{" "}
                                  {seat.passengerName || "—"}
                                </div>
                              ))}

                              {seats.length > 2 && (
                                <p className="text-xs font-bold text-[#078e87]">
                                  +{seats.length - 2} مقاعد أخرى
                                </p>
                              )}
                            </div>

                            {seats[0]?.passengerPhone && (
                              <div className="flex items-center gap-1 text-xs text-slate-400">
                                <FiPhone size={12} />
                                {seats[0].passengerPhone}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs font-semibold text-slate-400">
                            لا توجد مقاعد
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-5">
                        <p className="whitespace-nowrap font-black text-[#103a4e]">
                          {formatPrice(booking.totalPrice)}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black ${status.className}`}
                        >
                          <StatusIcon size={14} />
                          {status.label}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-center">
                        <button
                          type="button"
                          onClick={() => navigate(`/bookings/${booking.id}`)}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#e6f8f3] px-3.5 py-2 text-xs font-black text-[#078e87] transition hover:bg-[#0aa99b] hover:text-white"
                        >
                          <FiEye size={15} />
                          التفاصيل
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="text-center text-xs font-semibold text-slate-400">
        عرض {filteredBookings.length} من أصل {totalCount} حجز
      </div>
    </div>
  );
}

export default BookingsPage;

import { useMemo, useState } from "react";
import {
  FiAlertCircle,
  FiCalendar,
  FiMail,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import { useUsers } from "../../hooks/use-users";

function UsersPage() {
  const { users, isLoading, isFetching, isError, error, refetch } = useUsers();

  const [search, setSearch] = useState("");

  const usersList = useMemo(() => {
    if (Array.isArray(users)) {
      return users;
    }

    if (Array.isArray(users?.items)) {
      return users.items;
    }

    if (Array.isArray(users?.data)) {
      return users.data;
    }

    return [];
  }, [users]);

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return usersList;
    }

    return usersList.filter((user) => {
      const name = String(user.name || "").toLowerCase();
      const email = String(user.email || "").toLowerCase();
      const role = String(user.role || "").toLowerCase();

      return (
        name.includes(value) || email.includes(value) || role.includes(value)
      );
    });
  }, [usersList, search]);

  const totalUsers = usersList.length;

  const adminUsers = usersList.filter((user) => user.role === "ADMIN").length;

  const regularUsers = usersList.filter((user) => user.role === "USER").length;

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Intl.DateTimeFormat("ar-SY", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const formatRole = (role) => {
    if (role === "ADMIN") {
      return "مدير";
    }

    if (role === "USER") {
      return "مستخدم";
    }

    return role || "-";
  };

  if (isLoading) {
    return (
      <div dir="rtl" className="space-y-6">
        <div>
          <div className="h-8 w-40 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-3 h-4 w-64 animate-pulse rounded-lg bg-slate-200" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-2xl bg-white shadow-sm"
            />
          ))}
        </div>

        <div className="h-96 animate-pulse rounded-2xl bg-white shadow-sm" />
      </div>
    );
  }

  if (isError) {
    return (
      <div dir="rtl" className="flex min-h-[500px] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            <FiAlertCircle size={26} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-[#103a4e]">
            تعذر تحميل المستخدمين
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            حدث خطأ أثناء جلب بيانات المستخدمين من الخادم.
          </p>

          {error?.response?.data?.message && (
            <p className="mt-2 text-xs text-red-500">
              {error.response.data.message}
            </p>
          )}

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0aa99b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#078e87]"
          >
            <FiRefreshCw size={16} />
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#103a4e] sm:text-3xl">
            المستخدمون
          </h1>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            إدارة ومتابعة المستخدمين المسجلين في منصة سيرنا.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#103a4e] shadow-sm transition hover:border-[#0aa99b] hover:text-[#078e87] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiRefreshCw size={17} className={isFetching ? "animate-spin" : ""} />
          تحديث البيانات
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                إجمالي المستخدمين
              </p>

              <p className="mt-3 text-3xl font-black text-[#103a4e]">
                {totalUsers}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e6f8f3] text-[#078e87]">
              <FiUsers size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">المدراء</p>

              <p className="mt-3 text-3xl font-black text-[#103a4e]">
                {adminUsers}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiShield size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                المستخدمون العاديون
              </p>

              <p className="mt-3 text-3xl font-black text-[#103a4e]">
                {regularUsers}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <FiUser size={22} />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="relative">
          <FiSearch
            size={19}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="ابحث بالاسم أو البريد الإلكتروني أو الصلاحية..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-11 pl-4 text-sm text-[#103a4e] outline-none transition placeholder:text-slate-400 focus:border-[#0aa99b] focus:bg-white focus:ring-4 focus:ring-[#0aa99b]/10"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-black text-[#103a4e]">قائمة المستخدمين</h2>

            <p className="mt-1 text-xs text-slate-500">
              {filteredUsers.length} مستخدم
            </p>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <FiUsers size={25} />
            </div>

            <h3 className="mt-4 font-bold text-[#103a4e]">لا توجد نتائج</h3>

            <p className="mt-2 text-sm text-slate-500">
              لم نجد مستخدمين مطابقين لعملية البحث.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[750px] text-right">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-100">
                    <th className="px-5 py-4 text-xs font-black text-slate-500">
                      المستخدم
                    </th>

                    <th className="px-5 py-4 text-xs font-black text-slate-500">
                      البريد الإلكتروني
                    </th>

                    <th className="px-5 py-4 text-xs font-black text-slate-500">
                      الصلاحية
                    </th>

                    <th className="px-5 py-4 text-xs font-black text-slate-500">
                      تاريخ التسجيل
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6f8f3] text-sm font-black text-[#078e87]">
                            {user.name?.charAt(0) || "؟"}
                          </div>

                          <div>
                            <p className="font-bold text-[#103a4e]">
                              {user.name || "-"}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              #{user.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <FiMail size={16} className="text-slate-400" />
                          {user.email || "-"}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                            user.role === "ADMIN"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-[#e6f8f3] text-[#078e87]"
                          }`}
                        >
                          {user.role === "ADMIN" ? (
                            <FiShield size={14} />
                          ) : (
                            <FiUser size={14} />
                          )}

                          {formatRole(user.role)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <FiCalendar size={16} className="text-slate-400" />

                          {formatDate(user.createdAt)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-100 md:hidden">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e6f8f3] font-black text-[#078e87]">
                      {user.name?.charAt(0) || "؟"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black text-[#103a4e]">
                          {user.name || "-"}
                        </h3>

                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                            user.role === "ADMIN"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-[#e6f8f3] text-[#078e87]"
                          }`}
                        >
                          {user.role === "ADMIN" ? (
                            <FiShield size={12} />
                          ) : (
                            <FiUser size={12} />
                          )}

                          {formatRole(user.role)}
                        </span>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <FiMail size={15} />
                          <span className="break-all">{user.email || "-"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <FiCalendar size={15} />
                          {formatDate(user.createdAt)}
                        </div>

                        <div className="text-xs text-slate-400">
                          رقم المستخدم: #{user.id}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UsersPage;

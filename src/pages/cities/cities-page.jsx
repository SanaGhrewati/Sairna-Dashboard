import { useMemo, useState } from "react"
import {
  FiAlertCircle,
  FiMapPin,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi"

import { useCities } from "../../hooks/use-cities"

function CitiesPage() {
  const {
    cities,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useCities()

  const [search, setSearch] = useState("")

  const citiesList = useMemo(() => {
    if (Array.isArray(cities)) {
      return cities
    }

    if (Array.isArray(cities?.items)) {
      return cities.items
    }

    if (Array.isArray(cities?.data)) {
      return cities.data
    }

    return []
  }, [cities])

  const filteredCities = useMemo(() => {
    const value = search.trim().toLowerCase()

    if (!value) {
      return citiesList
    }

    return citiesList.filter((city) => {
      return (
        String(city?.name || "")
          .toLowerCase()
          .includes(value) ||
        String(city?.id || "")
          .toLowerCase()
          .includes(value)
      )
    })
  }, [citiesList, search])

  if (isLoading) {
    return (
      <section dir="rtl">
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#0aa99b] border-t-transparent" />

            <p className="mt-4 text-sm font-bold text-slate-500">
              جاري تحميل المدن...
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
          <FiAlertCircle
            size={42}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-4 text-lg font-black text-red-600">
            تعذر تحميل المدن
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
            المدن
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            المدن المتاحة ضمن منصة سيرنا
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#103a4e] transition hover:bg-slate-50 disabled:opacity-50"
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
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                إجمالي المدن
              </p>

              <p className="mt-2 text-3xl font-black text-[#103a4e]">
                {citiesList.length}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e6f8f3] text-[#078e87]">
              <FiMapPin size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                نتائج البحث
              </p>

              <p className="mt-2 text-3xl font-black text-[#103a4e]">
                {filteredCities.length}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
              <FiSearch size={22} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="relative">
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
            placeholder="ابحث باسم المدينة أو رقمها..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-4 pr-11 text-sm outline-none transition focus:border-[#0aa99b] focus:ring-2 focus:ring-[#0aa99b]/10"
          />
        </div>
      </div>

      {filteredCities.length === 0 ? (
        <div className="rounded-3xl border border-slate-100 bg-white px-6 py-16 text-center shadow-sm">
          <FiMapPin
            size={42}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-lg font-black text-[#103a4e]">
            لا توجد مدن
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCities.map((city) => (
            <article
              key={city.id}
              className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e6f8f3] text-[#078e87]">
                  <FiMapPin size={21} />
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-base font-black text-[#103a4e]">
                    {city?.name || "مدينة بدون اسم"}
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    رقم المدينة: {city?.id}
                  </p>
                </div>
              </div>

              {city?.latitude != null &&
                city?.longitude != null && (
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        خط العرض
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#103a4e]">
                        {city.latitude}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        خط الطول
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#103a4e]">
                        {city.longitude}
                      </p>
                    </div>
                  </div>
                )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default CitiesPage
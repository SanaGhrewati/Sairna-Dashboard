import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  FiArrowRight,
  FiSave,
} from "react-icons/fi"

import { useTrips } from "../../hooks/use-trips"
import { useCompanies } from "../../hooks/use-companies"
import { useCities } from "../../hooks/use-cities"

function AddTripPage() {
  const navigate = useNavigate()

  const {
    createTrip,
    isCreating,
    createError,
  } = useTrips()

  const {
    companies,
    isLoading: isLoadingCompanies,
  } = useCompanies()

  const {
    cities,
    isLoading: isLoadingCities,
  } = useCities()

  const [formData, setFormData] = useState({
    companyId: "",
    originId: "",
    destinationId: "",
    departureAt: "",
    arrivalAt: "",
    price: "",
    totalSeats: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await createTrip({
        companyId: Number(formData.companyId),
        originId: Number(formData.originId),
        destinationId: Number(
          formData.destinationId
        ),
        departureAt: new Date(
          formData.departureAt
        ).toISOString(),
        arrivalAt: new Date(
          formData.arrivalAt
        ).toISOString(),
        price: Number(formData.price),
        totalSeats: Number(formData.totalSeats),
      })

      navigate("/trips")
    } catch {
      return
    }
  }

  const companiesList = Array.isArray(companies)
    ? companies
    : companies?.items || companies?.data || []

  const citiesList = Array.isArray(cities)
    ? cities
    : cities?.items || cities?.data || []

  return (
    <section dir="rtl">
      <div className="mb-8 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/trips")}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#103a4e] transition hover:bg-slate-50"
        >
          <FiArrowRight size={19} />
        </button>

        <div>
          <h1 className="text-2xl font-black text-[#103a4e] sm:text-3xl">
            إضافة رحلة
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            إضافة رحلة جديدة
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-7"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="companyId"
                className="mb-2 block text-sm font-bold text-[#103a4e]"
              >
                شركة النقل
              </label>

              <select
                id="companyId"
                name="companyId"
                required
                value={formData.companyId}
                onChange={handleChange}
                disabled={isLoadingCompanies}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0aa99b] focus:ring-2 focus:ring-[#0aa99b]/10 disabled:cursor-not-allowed disabled:bg-slate-50"
              >
                <option value="">
                  {isLoadingCompanies
                    ? "جاري تحميل الشركات..."
                    : "اختر شركة النقل"}
                </option>

                {companiesList.map((company) => (
                  <option
                    key={company.id}
                    value={company.id}
                  >
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="originId"
                className="mb-2 block text-sm font-bold text-[#103a4e]"
              >
                مدينة الانطلاق
              </label>

              <select
                id="originId"
                name="originId"
                required
                value={formData.originId}
                onChange={handleChange}
                disabled={isLoadingCities}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0aa99b] focus:ring-2 focus:ring-[#0aa99b]/10 disabled:cursor-not-allowed disabled:bg-slate-50"
              >
                <option value="">
                  {isLoadingCities
                    ? "جاري تحميل المدن..."
                    : "اختر مدينة الانطلاق"}
                </option>

                {citiesList.map((city) => (
                  <option
                    key={city.id}
                    value={city.id}
                  >
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="destinationId"
                className="mb-2 block text-sm font-bold text-[#103a4e]"
              >
                مدينة الوصول
              </label>

              <select
                id="destinationId"
                name="destinationId"
                required
                value={formData.destinationId}
                onChange={handleChange}
                disabled={isLoadingCities}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0aa99b] focus:ring-2 focus:ring-[#0aa99b]/10 disabled:cursor-not-allowed disabled:bg-slate-50"
              >
                <option value="">
                  {isLoadingCities
                    ? "جاري تحميل المدن..."
                    : "اختر مدينة الوصول"}
                </option>

                {citiesList.map((city) => (
                  <option
                    key={city.id}
                    value={city.id}
                  >
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-bold text-[#103a4e]"
              >
                السعر
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="140000"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0aa99b] focus:ring-2 focus:ring-[#0aa99b]/10"
              />
            </div>

            <div>
              <label
                htmlFor="departureAt"
                className="mb-2 block text-sm font-bold text-[#103a4e]"
              >
                موعد الانطلاق
              </label>

              <input
                id="departureAt"
                name="departureAt"
                type="datetime-local"
                required
                value={formData.departureAt}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0aa99b] focus:ring-2 focus:ring-[#0aa99b]/10"
              />
            </div>

            <div>
              <label
                htmlFor="arrivalAt"
                className="mb-2 block text-sm font-bold text-[#103a4e]"
              >
                موعد الوصول
              </label>

              <input
                id="arrivalAt"
                name="arrivalAt"
                type="datetime-local"
                required
                value={formData.arrivalAt}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0aa99b] focus:ring-2 focus:ring-[#0aa99b]/10"
              />
            </div>

            <div>
              <label
                htmlFor="totalSeats"
                className="mb-2 block text-sm font-bold text-[#103a4e]"
              >
                عدد المقاعد
              </label>

              <input
                id="totalSeats"
                name="totalSeats"
                type="number"
                min="1"
                required
                value={formData.totalSeats}
                onChange={handleChange}
                placeholder="40"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0aa99b] focus:ring-2 focus:ring-[#0aa99b]/10"
              />
            </div>
          </div>

          {createError && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {createError?.response?.data?.message ||
                "تعذر إضافة الرحلة"}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/trips")}
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              إلغاء
            </button>

            <button
              type="submit"
              disabled={
                isCreating ||
                isLoadingCompanies ||
                isLoadingCities
              }
              className="flex items-center justify-center gap-2 rounded-xl bg-[#0aa99b] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#078e87] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSave size={18} />

              {isCreating
                ? "جاري الحفظ..."
                : "حفظ الرحلة"}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddTripPage
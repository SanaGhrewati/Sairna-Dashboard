import { useMemo, useState } from "react"
import {
  FiAlertCircle,
  FiCheckCircle,
  FiEdit3,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiTruck,
  FiX,
} from "react-icons/fi"

import { useCompanies } from "../../hooks/use-companies"
import CompanyCard from "./components/company-card"

function CompaniesPage() {
  const {
    companies,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    createCompany,
    isCreating,
    createError,
    updateCompany,
    isUpdating,
    updateError,
    deleteCompany,
    isDeleting,
  } = useCompanies()

  const [search, setSearch] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCompany, setEditingCompany] =
    useState(null)

  const [formData, setFormData] = useState({
    name: "",
    logoUrl: "",
    isActive: true,
  })

  const companiesList = useMemo(() => {
    if (Array.isArray(companies)) {
      return companies
    }

    if (Array.isArray(companies?.items)) {
      return companies.items
    }

    if (Array.isArray(companies?.data)) {
      return companies.data
    }

    return []
  }, [companies])

  const filteredCompanies = useMemo(() => {
    const value = search.trim().toLowerCase()

    if (!value) {
      return companiesList
    }

    return companiesList.filter((company) =>
      String(company?.name || "")
        .toLowerCase()
        .includes(value)
    )
  }, [companiesList, search])

  const activeCount = companiesList.filter(
    (company) => company?.isActive !== false
  ).length

  const inactiveCount =
    companiesList.length - activeCount

  const openCreateForm = () => {
    setEditingCompany(null)

    setFormData({
      name: "",
      logoUrl: "",
      isActive: true,
    })

    setIsFormOpen(true)
  }

  const openEditForm = (company) => {
    setEditingCompany(company)

    setFormData({
      name: company?.name || "",
      logoUrl: company?.logoUrl || "",
      isActive: company?.isActive !== false,
    })

    setIsFormOpen(true)
  }

  const closeForm = () => {
    if (isCreating || isUpdating) {
      return
    }

    setIsFormOpen(false)
    setEditingCompany(null)
  }

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      if (editingCompany) {
        await updateCompany({
          id: editingCompany.id,
          data: {
            name: formData.name,
            logoUrl: formData.logoUrl,
            isActive: formData.isActive,
          },
        })
      } else {
        await createCompany({
          name: formData.name,
          logoUrl: formData.logoUrl,
        })
      }

      closeForm()
    } catch {
      return
    }
  }

  const handleDelete = async (company) => {
    const confirmed = window.confirm(
      `هل أنت متأكد من حذف شركة ${company?.name || ""}؟`
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteCompany(company.id)
    } catch {
      return
    }
  }

  if (isLoading) {
    return (
      <section dir="rtl">
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#0aa99b] border-t-transparent" />

            <p className="mt-4 text-sm font-bold text-slate-500">
              جاري تحميل الشركات...
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
            تعذر تحميل الشركات
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
            شركات النقل
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            إدارة شركات النقل المرتبطة بمنصة سيرنا
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
            onClick={openCreateForm}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0aa99b] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#078e87]"
          >
            <FiPlus size={18} />
            إضافة شركة
          </button>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                إجمالي الشركات
              </p>

              <p className="mt-2 text-3xl font-black text-[#103a4e]">
                {companiesList.length}
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
                الشركات النشطة
              </p>

              <p className="mt-2 text-3xl font-black text-emerald-600">
                {activeCount}
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
                الشركات غير النشطة
              </p>

              <p className="mt-2 text-3xl font-black text-red-500">
                {inactiveCount}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <FiAlertCircle size={22} />
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
            placeholder="ابحث باسم الشركة..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-4 pr-11 text-sm outline-none transition focus:border-[#0aa99b] focus:ring-2 focus:ring-[#0aa99b]/10"
          />
        </div>
      </div>

      {filteredCompanies.length === 0 ? (
        <div className="rounded-3xl border border-slate-100 bg-white px-6 py-16 text-center shadow-sm">
          <FiTruck
            size={42}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-lg font-black text-[#103a4e]">
            لا توجد شركات
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            لا توجد شركات مطابقة للبحث الحالي
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
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onEdit={openEditForm}
              onDelete={handleDelete}
              isDeleting={
                isDeleting
              }
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
              <div>
                <h2 className="text-xl font-black text-[#103a4e]">
                  {editingCompany
                    ? "تعديل الشركة"
                    : "إضافة شركة"}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {editingCompany
                    ? "تعديل بيانات شركة النقل"
                    : "إضافة شركة نقل جديدة"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={
                  isCreating ||
                  isUpdating
                }
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
              >
                <FiX size={21} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5 sm:p-6"
            >
              <div>
                <label
                  htmlFor="company-name"
                  className="mb-2 block text-sm font-bold text-[#103a4e]"
                >
                  اسم الشركة
                </label>

                <input
                  id="company-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="مثال: الشام للنقل"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0aa99b] focus:ring-2 focus:ring-[#0aa99b]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="company-logo"
                  className="mb-2 block text-sm font-bold text-[#103a4e]"
                >
                  رابط الشعار
                </label>

                <input
                  id="company-logo"
                  name="logoUrl"
                  type="url"
                  value={formData.logoUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0aa99b] focus:ring-2 focus:ring-[#0aa99b]/10"
                />
              </div>

              {editingCompany && (
                <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div>
                    <p className="text-sm font-bold text-[#103a4e]">
                      حالة الشركة
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      تحديد ما إذا كانت الشركة نشطة
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="isActive"
                    checked={
                      formData.isActive
                    }
                    onChange={handleChange}
                    className="h-5 w-5 accent-[#0aa99b]"
                  />
                </label>
              )}

              {(createError ||
                updateError) && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                  {createError?.response?.data
                    ?.message ||
                    updateError?.response?.data
                      ?.message ||
                    "حدث خطأ أثناء حفظ بيانات الشركة"}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={
                    isCreating ||
                    isUpdating
                  }
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={
                    isCreating ||
                    isUpdating
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0aa99b] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#078e87] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiEdit3 size={17} />

                  {isCreating ||
                  isUpdating
                    ? "جاري الحفظ..."
                    : editingCompany
                      ? "حفظ التعديلات"
                      : "إضافة الشركة"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default CompaniesPage
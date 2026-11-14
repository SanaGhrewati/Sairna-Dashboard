import {
  FiEdit3,
  FiImage,
  FiPower,
  FiTrash2,
} from "react-icons/fi"

function CompanyCard({
  company,
  onEdit,
  onDelete,
  isDeleting,
}) {
  const isActive =
    company?.isActive !== false

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#e6f8f3] text-[#078e87]">
              {company?.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={company?.name || "شركة النقل"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <FiImage size={23} />
              )}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-base font-black text-[#103a4e]">
                {company?.name || "شركة بدون اسم"}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                رقم الشركة: {company?.id}
              </p>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
              isActive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {isActive ? "نشطة" : "غير نشطة"}
          </span>
        </div>

        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs text-slate-400">
            رابط الشعار
          </p>

          <p className="mt-2 truncate text-sm font-medium text-[#103a4e]">
            {company?.logoUrl || "لا يوجد شعار"}
          </p>
        </div>

        <div className="mt-5 flex gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={() => onEdit(company)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-[#103a4e] transition hover:border-[#0aa99b] hover:bg-[#e6f8f3] hover:text-[#078e87]"
          >
            <FiEdit3 size={17} />
            تعديل
          </button>

          <button
            type="button"
            onClick={() => onDelete(company)}
            disabled={isDeleting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiTrash2 size={17} />

            {isDeleting
              ? "جاري الحذف..."
              : "حذف"}
          </button>
        </div>
      </div>
    </article>
  )
}

export default CompanyCard
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiLogOut,
  FiTruck,
  FiBriefcase,
  FiMapPin,
  FiBookOpen,
  FiX,
} from "react-icons/fi";

function Sidebar({ isOpen, onClose, user, onLogout }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-72 flex-col border-l border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div>
            <h1 className="text-xl font-black text-[#103a4e]">سيرنا</h1>
            <p className="mt-1 text-xs text-slate-400">لوحة التحكم</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 lg:hidden"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="border-b border-slate-100 px-5 py-5">
          <div className="rounded-2xl bg-[#e6f8f3] p-4">
            <p className="text-xs font-medium text-slate-500">مرحباً بك</p>

            <p className="mt-1 truncate text-sm font-bold text-[#103a4e]">
              {user?.name}
            </p>

            <div className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-[#078e87]">
              {user?.role}
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          <NavLink
            to="/dashboard"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-[#0aa99b] text-white shadow-sm"
                  : "text-slate-600 hover:bg-[#e6f8f3] hover:text-[#078e87]"
              }`
            }
          >
            <FiGrid size={19} />
            <span>الرئيسية</span>
          </NavLink>
          <NavLink
            to="/trips"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-[#0aa99b] text-white shadow-sm"
                  : "text-slate-600 hover:bg-[#e6f8f3] hover:text-[#078e87]"
              }`
            }
          >
            <FiTruck size={19} />
            <span>الرحلات</span>
          </NavLink>

          <NavLink
            to="/companies"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-[#0aa99b] text-white shadow-sm"
                  : "text-slate-600 hover:bg-[#e6f8f3] hover:text-[#078e87]"
              }`
            }
          >
            <FiBriefcase size={19} />
            <span>شركات النقل</span>
          </NavLink>

          <NavLink
            to="/cities"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-[#0aa99b] text-white shadow-sm"
                  : "text-slate-600 hover:bg-[#e6f8f3] hover:text-[#078e87]"
              }`
            }
          >
            <FiMapPin size={19} />
            <span>المدن</span>
          </NavLink>

          <NavLink
            to="/bookings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-[#0aa99b] text-white shadow-sm"
                  : "text-slate-600 hover:bg-[#e6f8f3] hover:text-[#078e87]"
              }`
            }
          >
            <FiBookOpen size={19} />
            <span>الحجوزات</span>
          </NavLink>
        </nav>

        <div className="border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50"
          >
            <FiLogOut size={19} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

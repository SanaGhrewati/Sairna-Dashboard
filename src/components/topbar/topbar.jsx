import {
  FiBell,
  FiMenu,
  FiUser,
} from "react-icons/fi"

function Topbar({ onMenuClick, user }) {
  return (
    <header className="sticky top-0 z-30 h-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl border border-slate-200 p-2.5 text-[#103a4e] transition hover:bg-slate-50 lg:hidden"
          >
            <FiMenu size={21} />
          </button>

          <div>
            <h2 className="text-base font-bold text-[#103a4e] sm:text-lg">
              لوحة التحكم
            </h2>

            <p className="hidden text-xs text-slate-400 sm:block">
              إدارة منصة سيرنا
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f8f3] text-[#078e87]">
              <FiUser size={19} />
            </div>

            <div className="hidden text-right sm:block">
              <p className="max-w-32 truncate text-sm font-bold text-[#103a4e]">
                {user?.name}
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
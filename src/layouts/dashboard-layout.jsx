import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/sidebar";
import Topbar from "../components/topbar/topbar";
import { useAuth } from "../hooks/use-auth";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#f8fafb]">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        onLogout={handleLogout}
      />

      <div className="min-h-screen lg:mr-72">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} user={user} />

        <main className="min-h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

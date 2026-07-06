import { useState, useEffect } from "react";
import OntoTop from "../common/OntoTop";
import { AdminNavbar, AdminSidebar } from "../components/index";
import { Outlet } from "react-router-dom";

export function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <OntoTop />
      <AdminSidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

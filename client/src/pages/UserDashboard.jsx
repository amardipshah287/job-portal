import { useState } from "react";
import OntoTop from "../common/OntoTop";
import { UserNavbar, UserSidebar } from "../components/index";
import { Outlet } from "react-router-dom";

export function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <OntoTop />
      <UserSidebar sidebarOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <UserNavbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

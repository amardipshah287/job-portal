import OntoTop from "../common/OntoTop";
import { ProviderSidebar } from "../components/index";
import { Outlet } from "react-router-dom";

export function CompanyDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <OntoTop />
      <ProviderSidebar />
      <main className="flex-1 pt-14 p-4 md:p-8 md:ml-64 w-full ">
        <Outlet />
      </main>
    </div>
  );
}

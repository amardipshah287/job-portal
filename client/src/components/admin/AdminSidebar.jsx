import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Bell,
  BarChart2,
  MessageSquare,
  CreditCard,
  LogOut,
} from "lucide-react";

export function AdminSidebar({ isSidebarOpen }) {
  const location = useLocation();
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/admin" },
    {
      icon: Users,
      label: "User Management",
      path: "/dashboard/admin/user-management",
    },
    {
      icon: Briefcase,
      label: "Job Management",
      path: "/dashboard/admin/job-management",
    },
    {
      icon: FileText,
      label: "Applications",
      path: "/dashboard/admin/application",
    },
    {
      icon: CreditCard,
      label: "Payments",
      path: "/dashboard/admin/payments",
    },
    // {
    //   icon: MessageSquare,
    //   label: "Feedback",
    //   path: "/dashboard/admin/feedback",
    // },
  ];

  return (
    <div
      className={`bg-primary flex flex-col justify-between text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:relative lg:translate-x-0`}
    >
      <div className="flex flex-col gap-4">
        <Link to="/" className="text-white flex items-center space-x-2 px-4">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            ></path>
          </svg>
          <span className="text-2xl font-extrabold">JobPortal</span>
        </Link>
        <nav>
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-[#1976d2] hover:text-white ${
                location.pathname === item.path ? "bg-[#1976d2] text-white" : ""
              }`}
            >
              <item.icon className="inline-block w-6 h-6 mr-2 -mt-1" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="px-4 mt-auto">
        <button className="flex items-center py-2 px-4 rounded transition duration-200 hover:bg-[#1976d2] hover:text-white">
          <LogOut className="inline-block w-6 h-6 mr-2 -mt-1" />
          Logout
        </button>
      </div>
    </div>
  );
}

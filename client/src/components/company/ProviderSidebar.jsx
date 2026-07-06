import { useState, useEffect } from "react";
import {
  Home,
  Briefcase,
  Search,
  FileText,
  Users,
  User,
  Building,
  CreditCard,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import apis from "../../common/api";
import { toast } from "react-toastify";
import { logout } from "../../store/authSlice";

const navItems = [
  { name: "Dashboard", href: "/dashboard/provider", icon: Home },
  {
    name: "Job Postings",
    href: "/dashboard/provider/job-postings",
    icon: Briefcase,
  },
  {
    name: "Applications",
    href: "/dashboard/provider/application",
    icon: FileText,
  },
  {
    name: "AI Shortlisting",
    href: "/dashboard/provider/ai-shortlisting",
    icon: Users,
  },
  {
    name: "Company Profile",
    href: "/dashboard/provider/company-profile",
    icon: Building,
  },
  { name: "Payments", href: "/dashboard/provider/payments", icon: CreditCard },
];

export function ProviderSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(apis.userLogOut.url, {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(logout());
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out.");
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      {isMobile && (
        <button
          className={`fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden ${
            isOpen ? "hidden" : ""
          }`}
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-6 w-6 text-primary" />
        </button>
      )}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-white flex flex-col justify-between shadow-md transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div>
          <div className="p-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-semibold text-primary">
                Company DB
              </h1>
            </div>
            {isMobile && (
              <button className="md:hidden" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6 text-primary" />
              </button>
            )}
          </div>
          <nav className="mt-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center text-lg font-semibold px-6 py-3 text-gray-700 hover:bg-gray-100"
                onClick={() => isMobile && setIsOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5 text-primary" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <button
          className=" flex bg-primary text-white gap-4 px-4 py-2 rounded-md justify-between items-center m-4"
          onClick={handleLogout}
        >
          <span>Log out</span>
          <LogOut />
        </button>
      </div>
    </>
  );
}

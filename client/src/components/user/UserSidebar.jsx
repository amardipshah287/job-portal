import axios from "axios";
import { User, Briefcase, Bell, Bookmark, Clock, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import apis from "../../common/api";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { toast } from "react-toastify";

export function UserSidebar({ sidebarOpen }) {
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

  return (
    <aside
      className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static fixed z-30 shadow-lg`}
    >
      <div className="p-4 bg-primary text-white">
        <Link className="text-2xl font-bold" to={"/"}>
          Job Portal
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="p-2 space-y-2">
          {[
            { name: "Profile", icon: User, path: "" },
            { name: "Applied Jobs", icon: Briefcase, path: "job-applications" },
            { name: "Saved", icon: Bookmark, path: "saved-jobs" },
            { name: "Alerts", icon: Bell, path: "job-alerts" },
            { name: "History", icon: Clock, path: "user-job-history" },
          ].map((item) => (
            <Link key={item.name} to={item.path}>
              <button className="w-full flex items-center p-2 rounded-md text-sm font-medium transition-colors duration-150 text-gray-600 hover:bg-primary hover:bg-opacity-10 hover:text-primary">
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </button>
            </Link>
          ))}
        </ul>
      </nav>{" "}
      <button
        className=" flex bg-primary text-white gap-4 px-4 py-2 rounded-md justify-between items-center m-4"
        onClick={handleLogout}
      >
        <span>Log out</span>
        <LogOut />
      </button>
    </aside>
  );
}

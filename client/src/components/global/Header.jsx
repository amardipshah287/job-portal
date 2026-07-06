import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../../store/authSlice";
import { NavLinks, NavButton } from "../index";
import axios from "axios";
import apis from "../../common/api";
import { toast } from "react-toastify";
import { LogOut, User } from "lucide-react";

export function Header() {
  const [hamMenu, setHamMenu] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state?.auth?.user;
  });
  console.log(user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const toggleDropdown = () => {
    setIsDropDownOpen((open) => !open);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHamMenu(false);
      setIsDropDownOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setHamMenu(false);
    setIsDropDownOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        apis.userLogOut.url,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(logout());
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out.");
    }
  };

  return (
    <header className="flex items-center justify-between border-b-4 sticky top-0 z-10 bg-white">
      <div
        className="flex items-center cursor-pointer ml-2"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Nav Logo" className="h-20" />
        <h1 className="text-xl font-bold text-primary">Job Portal</h1>
      </div>

      {hamMenu ? (
        <AiOutlineMenuUnfold
          className="md:hidden text-white text-4xl z-10 mr-6"
          onClick={() => setHamMenu(false)}
        />
      ) : (
        <AiOutlineMenuFold
          className="md:hidden text-primary text-4xl mr-6"
          onClick={() => setHamMenu(true)}
        />
      )}

      <nav
        className={`fixed flex md:hidden flex-col gap-3 items-center text-white p-6 w-[100vw] text-xl top-0 bg-primary transition-transform duration-500 ease-in-out ${
          hamMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <NavLinks linkText="Home" to="/" />
        <NavLinks linkText="About us" to="/aboutus" />
        <NavLinks linkText="Jobs" to="/jobs" />
        <NavLinks linkText="Contact us" />

        {!isLoggedIn ? (
          <>
            {location.pathname !== "/login" && (
              <NavButton buttonText="Login" to="/login" />
            )}
            {location.pathname !== "/signup" && (
              <NavButton buttonText="Signup" to="/signup" />
            )}
          </>
        ) : (
          <div className="flex  flex-col items-center gap-2 ">
            <Link
              to={"/dashboard/seeker"}
              className="flex items-center gap-4 rounded-full bg-white text-primary p-4"
            >
              <FaUserCircle className="text-2xl" />
              <span>{user?.userName ?? user?.user?.userName}</span>
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>

      <nav className="hidden md:flex gap-6 lg:gap-10 items-center text-black text-lg lg:text-2xl font-semibold">
        <NavLinks linkText="Home" to="/" />
        <NavLinks linkText="About us" to="/aboutus" />
        <NavLinks linkText="Jobs" to="/jobs" />
        <NavLinks linkText="Contact us" to="/contactus" />
      </nav>

      <div className="hidden md:flex gap-2 mr-6">
        {!isLoggedIn ? (
          <>
            {location.pathname !== "/signup" && (
              <NavButton buttonText="Sign up" to="/signup" />
            )}
            {location.pathname !== "/login" && (
              <NavButton buttonText="Login" to="/login" />
            )}
          </>
        ) : (
          <div className="relative">
            <div
              className="flex items-center hover:cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="flex flex-col items-center pr-6">
                <FaUserCircle className="text-3xl text-primary" />
                <p className="font-semibold text-lg text-primary">
                  {user?.userName}
                </p>
              </div>
            </div>
            {isDropDownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <ul className=" text-gray-700">
                  <Link
                    to={"/dashboard/seeker"}
                    className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                  >
                    <User className="h-5 w-5 mr-2 text-primary" />
                    Profile
                  </Link>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2 text-primary" />
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

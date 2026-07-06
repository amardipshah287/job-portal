import { Link, useNavigate } from "react-router-dom";
import { AuthFormComp, GoogleAuth } from "../components/index";
import { useState } from "react";
import axios from "axios";
import apis from "../common/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    console.log(e.target.value);
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await axios.post(apis.userLogin.url, formData, {
        withCredentials: true,
      });

      const loginUser = await axios.get(apis.loggedInUser.url, {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(loginSuccess(loginUser?.data?.data));
        toast.success(response.data.message);
        console.log(response.data);
        console.log(response.data.role);

        if (loginUser?.data?.data?.role === "Seeker") {
          navigate("/");
        } else if (loginUser?.data?.data?.role === "Company") {
          navigate("/dashboard/provider");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <main className=" md:flex">
        <aside className=" flex-1 hidden md:flex ">
          <DotLottieReact
            src="https://lottie.host/d210175b-7046-46bd-8e3c-2ca959053bc0/C2364UboxX.lottie"
            loop
            autoplay
            allowFullScreen
          />
        </aside>
        <section className="flex-1 flex flex-col gap-3 w-full items-center py-10 ">
          <h1 className="text-2xl font-serif font-bold">Login</h1>
          <form className=" flex flex-col gap-3" onSubmit={handleSubmit}>
            <AuthFormComp
              type="email"
              labelText="email"
              placeHolderText="enter your email"
              mainText="userEmail"
              onChange={handleChange}
            />
            <div className="grid border-b-2">
              <label htmlFor="userPassword" className="text-xl">
                password
              </label>
              <div className=" flex">
                <input
                  name="userPassword"
                  id="userPassword"
                  onChange={handleChange}
                  type={showPassword ? "" : "password"}
                  placeholder="enter your password"
                  className=" px-2 py-1 text-xl  focus:no-underline focus:outline-none placeholder-slate-400"
                />
                <div
                  className="cursor-pointer text-xl flex items-center"
                  onClick={() => {
                    setShowPassword(!showPassword);
                    ``;
                  }}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="role" className=" text-2xl">
                choose role
              </label>
              <div className="flex gap-3">
                <input
                  type="radio"
                  name="role"
                  id="role"
                  checked={formData.role === "Seeker"}
                  className="scale-110"
                  value="Seeker"
                  onChange={handleRoleChange}
                />
                <p className="text-xl">Seeker</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="radio"
                  name="role"
                  checked={formData.role === "Company"}
                  className="scale-110"
                  value="Company"
                  onChange={handleRoleChange}
                />
                <p className="text-xl">Company</p>
              </div>
            </div>
            <button className=" rounded-md bg-primary text-white py-2">
              Login
            </button>
            <p className=" text-lg font-medium text-center py-2">
              create new account?{" "}
              <Link to={"/signup"} className=" text-primary underline">
                Sign Up
              </Link>
            </p>
            <GoogleAuth />
          </form>
        </section>
      </main>
    </>
  );
}

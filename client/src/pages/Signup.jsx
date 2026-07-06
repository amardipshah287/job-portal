import { Link, useNavigate } from "react-router-dom";
import { AuthFormComp, GoogleAuth } from "../components/index";
import { useState } from "react";
import axios from "axios";
import apis from "../common/api";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userContact: "",
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

    if (formData.userPassword !== formData.confirmPassword) {
      return toast.error("password and confirm password must be same.");
    }

    try {
      const response = await axios.post(apis.userSignupOtp.url, formData);

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/otp", { state: { formData } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error signing up.");
    }
  };

  return (
    <>
      <main className=" md:flex">
        <aside className=" flex-1 hidden md:flex">
          <DotLottieReact
            src="https://lottie.host/d210175b-7046-46bd-8e3c-2ca959053bc0/C2364UboxX.lottie"
            loop
            autoplay
          />
        </aside>
        <section className="flex-1 flex flex-col gap-3 w-full items-center justify-center py-10 ">
          <h1 className="text-2xl font-serif font-bold">Sign Up</h1>
          <form className=" flex flex-col gap-3" onSubmit={handleSubmit}>
            <AuthFormComp
              type="text"
              labelText="name"
              placeHolderText="enter your name"
              mainText="userName"
              onChange={handleChange}
            />
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
                  placeholder="new password"
                  className=" px-2 py-1 text-xl  focus:no-underline focus:outline-none placeholder-slate-400"
                />
                <div
                  className="cursor-pointer text-xl flex items-center"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div className="grid border-b-2">
              <label htmlFor="password" className="text-xl">
                confirm password
              </label>
              <div className=" flex">
                <input
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={handleChange}
                  type={showConfirmPassword ? "" : "password"}
                  placeholder="confirm password"
                  className=" px-2 py-1 text-xl  focus:no-underline focus:outline-none placeholder-slate-400"
                />
                <div
                  className="cursor-pointer text-xl flex items-center"
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <AuthFormComp
              type="number"
              labelText="contact number"
              placeHolderText="contact number"
              mainText="userContact"
              onChange={handleChange}
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="role" className=" text-2xl">
                choose role
              </label>
              <div className="flex gap-3">
                <input
                  type="radio"
                  name="role"
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
            <button className=" rounded-md bg-primary text-white py-3">
              Sign up
            </button>
            <p className="  text-lg font-medium text-center py-2">
              Already have account?{" "}
              <Link to={"/login"} className=" text-primary underline">
                Login
              </Link>
            </p>
            <GoogleAuth />
          </form>
        </section>
      </main>
    </>
  );
}

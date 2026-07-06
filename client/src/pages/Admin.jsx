import { useNavigate } from "react-router-dom";
import { AuthFormComp } from "../components/index";
import { useState } from "react";
import axios from "axios";
import apis from "../common/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
    role: "Admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(apis.userLogin.url, formData, {
        withCredentials: true,
      });

      const loginUser = await axios.get(apis.loggedInUser.url, {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(loginSuccess(loginUser?.data?.data));
        navigate("/dashboard/admin");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error logging in.");
    }
  };

  return (
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
        <button className=" rounded-md bg-primary text-white py-2">
          Login
        </button>
      </form>
    </section>
  );
}

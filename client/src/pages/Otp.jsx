import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apis from "../common/api";
import { toast } from "react-toastify";

export function Otp() {
  const navigate = useNavigate();

  const location = useLocation();
  const formData = location.state?.formData;
  const [userOtp, setUserOtp] = useState("");

  console.log(formData);
  console.log(userOtp);

  const handleSubmit = async function (e) {
    e.preventDefault();

    console.log({
      ...formData,
      userOtp,
    });

    try {
      const response = await axios.post(apis.userSignup.url, {
        ...formData,
        userOtp,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
          />
        </aside>
        <section className="flex-1 flex flex-col justify-center gap-3 w-full items-center py-10 pt-44">
          <h1 className="text-2xl font-serif font-bold">Verify OTP</h1>
          <form className=" flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid border-b-2">
              <label htmlFor="password" className="text-xl">
                OTP here:
              </label>
              <div className=" flex">
                <input
                  name="text"
                  id="password"
                  placeholder="enter your otp"
                  className=" px-2 py-1 text-xl  focus:no-underline focus:outline-none placeholder-slate-400"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={(e) => {
                    setUserOtp(e.target.value);
                  }}
                />
              </div>
            </div>
            <button className=" rounded-md bg-primary text-white py-2">
              Verify
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

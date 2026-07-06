import HeroSideCard from "../Landing/HeroSideCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { IoSearch } from "react-icons/io5";

export function Hero({ stats }) {
  const activeJobs = stats?.activeJobs !== undefined ? stats.activeJobs : "Loading...";
  const companies = stats?.companies !== undefined ? stats.companies : "Loading...";
  const jobSeekers = stats?.jobSeekers !== undefined ? stats.jobSeekers : "Loading...";

  return (
    <main className="font-poppins flex flex-col md:flex-row justify-center gap-8 lg:gap-2 py-5">
      <aside className=" flex flex-col items-center lg:pl-20 gap-8 md:w-[40%]">
        <h1 className="text-4xl text-center font-semibold">
          Find your
          <br className="lg:hidden" />
          <span className="text-primary"> Dream Job</span>
          <br /> or <br />
          <span className="text-primary"> Perfect Candidate</span>
        </h1>
        <div className=" flex items-center shadow-custom-border border-2 border-primary rounded-lg p-2">
          <input
            type="text"
            placeholder="Search Job"
            id="homeInput"
            className=" text-lg placeholder:text-primary placeholder:border-none outline-none"
          />
          <IoSearch className=" text-3xl text-primary cursor-pointer~" />
        </div>
        <p className=" text-primary px-6 text-center lg:pl-0 text-lg">
          A dream job is an ideal career that aligns with one&apos;s passions,
          skills, and goals, providing fulfillment and satisfaction.
        </p>
        <DotLottieReact
          src="https://lottie.host/100663e7-fda3-4256-83bd-fd4e4c1c176a/GgwZ3R5dsE.lottie"
          loop
          autoplay
        />
      </aside>
      <aside className=" flex items-center justify-center md:w-[50%] md:bg-primary lg:bg-white ">
        <div className="flex items-center gap-4 lg:gap-8 md:bg-white lg:bg-primary p-12 rounded-xl">
          <div className="space-y-4 lg:space-y-8">
            <HeroSideCard numText={activeJobs} text="Active Jobs" />
            <HeroSideCard numText={companies} text="Companies" />
          </div>
          <div className="space-y-4 lg:space-y-8">
            <HeroSideCard numText={jobSeekers} text="Job Seekers" />
            <HeroSideCard numText="8.5" text=" Star Rating" />
          </div>
        </div>
      </aside>
    </main>
  );
}

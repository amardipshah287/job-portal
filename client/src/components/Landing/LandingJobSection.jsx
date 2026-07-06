import { Link } from "react-router-dom";
import { JobCard } from "../global/JobCard";
import { ArrowRight } from "lucide-react";

export function LandingJobSection({ featuredJobs }) {
  const jobTypes = {
    "full-time": "bg-blue-100 text-blue-800",
    "part-time": "bg-green-100 text-green-800",
    remote: "bg-purple-100 text-purple-800",
    "on-site": "bg-orange-100 text-orange-800",
  };

  return (
    <section className="bg-gray-50 py-10">
      <div className="container mx-auto ">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Featured Job Opportunities
        </h2>
        {featuredJobs === undefined ? (
          <p className="text-center text-gray-500 text-lg">Loading opportunities...</p>
        ) : featuredJobs === null || featuredJobs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No active jobs found. Check back later!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {featuredJobs.map((job) => (
              <JobCard job={job} jobTypes={jobTypes} key={job._id || job.id} />
            ))}
          </div>
        )}
        <Link
          to={"/jobs"}
          className=" flex justify-center items-center gap-2 mt-6 text-xl font-bold text-primary underline"
        >
          <span>View All Jobs</span>
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}

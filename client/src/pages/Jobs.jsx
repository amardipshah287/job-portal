import { Search } from "lucide-react";
import { JobCard } from "../components/index";
import { useEffect, useState } from "react";
import axios from "axios";
import apis from "../common/api";
import { toast } from "react-toastify";

export function Jobs() {
  const jobTypes = {
    "full-time": "bg-blue-100 text-blue-800",
    "part-time": "bg-green-100 text-green-800",
    remote: "bg-purple-100 text-purple-800",
    "on-site": "bg-orange-100 text-orange-800",
  };

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("");
  const [locationType, setLocationType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const fetchAllJobs = async () => {
    try {
      const response = await axios.get(apis.fetchAllJob.url, {
        withCredentials: true,
      });
      const allJobs = response?.data?.data;
      console.log(allJobs);
      const approvedJobs = allJobs.filter((job) => job.approved);
      console.log(approvedJobs);

      setJobs(approvedJobs);
      console.log(jobs);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const filteredJobs = [...jobs]
    .sort((a, b) => b.premium - a.premium)
    .filter((job) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesJobType = jobType ? job.jobType === jobType : true;
      const matchesLocationType = locationType
        ? job.locationType === locationType
        : true;
      const matchesSalary =
        (!minSalary || job.salaryRange?.min >= minSalary) &&
        (!maxSalary || job.salaryRange?.max <= maxSalary);

      return (
        matchesSearch && matchesJobType && matchesLocationType && matchesSalary
      );
    });

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">
        Find your next Opportunity
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search jobs or companies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <select
          className="border border-gray-300 rounded-md py-2 px-4"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="">Job Type</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
        </select>
        <select
          className="border border-gray-300 rounded-md py-2 px-4"
          value={locationType}
          onChange={(e) => setLocationType(e.target.value)}
        >
          <option value="">Location Type</option>
          <option value="remote">Remote</option>
          <option value="on-site">On-Site</option>
        </select>
        <input
          type="number"
          placeholder="Min Salary"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4"
        />
        <input
          type="number"
          placeholder="Max Salary"
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job, index) => (
          <JobCard
            job={job}
            jobTypes={jobTypes}
            key={job?.company?.userName + index}
          />
        ))}
      </div>
    </div>
  );
}

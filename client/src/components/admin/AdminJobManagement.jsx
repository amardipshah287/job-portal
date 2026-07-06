import { useState, useEffect } from "react";
import axios from "axios";
import { Briefcase, TrendingUp } from "lucide-react";
import apis from "../../common/api";
import { toast } from "react-toastify";

export function AdminJobManagement() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(apis.fetchAllJob.url, {
        withCredentials: true,
      });
      setJobs(response.data?.data);
      toast.success(response.data?.message);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error(error.response.data?.message);
    }
  };

  const approveJob = async (jobId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      const response = await axios.patch(
        `${apis.approveJob.url}/${jobId}`,
        { approved: String(newStatus) },
        {
          withCredentials: true,
        }
      );
      console.log(newStatus);

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, approved: newStatus } : job
        )
      );
      toast.success(response.data?.message);
    } catch (error) {
      console.error("Error approving job:", error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Job Management
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Briefcase className="h-8 w-8 text-[#0f5da7]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Jobs</p>
              <p className="text-2xl font-semibold text-gray-800">
                {jobs.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Jobs</p>
              <p className="text-2xl font-semibold text-gray-800">
                {jobs.filter((job) => job.approved).length}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-scroll">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Job Listings
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => {
              console.log(job);
              console.log(job._id);
              return (
                <tr key={job._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{job.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.company?.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        job.approved
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {job.approved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => approveJob(job._id, job.approved)}
                      className={`mr-3 ${
                        job.approved
                          ? "text-red-600 hover:text-red-900"
                          : "text-blue-600 hover:text-blue-900"
                      }`}
                    >
                      {job.approved ? "Unapprove" : "Approve"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

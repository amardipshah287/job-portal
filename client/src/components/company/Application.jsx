import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../common/api";

export function Application() {
  const [postedJobs, setPostedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apis.postedJob.url, {
          withCredentials: true,
        });
        setPostedJobs(response.data?.data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchPostedJobs();
  }, []);

  const fetchApplicants = async (jobId) => {
    try {
      setLoading(true);
      setSelectedJob(jobId);
      const response = await axios.get(`${apis.jobApplicants.url}/${jobId}`, {
        withCredentials: true,
      });
      setApplicants(response.data?.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch applicants"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, applicantEmail, newStatus) => {
    try {
      await axios.put(
        `${apis.updateApplicationStatus.url}/${applicationId}`,
        { status: newStatus, applicantEmail },
        { withCredentials: true }
      );

      setApplicants((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );

      toast.success("Applicant status updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Application Tracking</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : postedJobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs posted.</p>
        ) : (
          postedJobs.map((job) => (
            <div
              key={job._id}
              onClick={() => fetchApplicants(job._id)}
              className={`cursor-pointer p-4 rounded-lg shadow-md border ${
                selectedJob === job._id ? "border-blue-500" : "border-gray-300"
              } hover:shadow-lg transition-all`}
            >
              <h3 className="text-lg font-semibold text-primary">
                {job.title}
              </h3>
              <p className="text-sm text-gray-600">{job.company?.userName}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
          ))
        )}
      </div>

      {selectedJob && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Applicants for{" "}
            {postedJobs.find((job) => job._id === selectedJob)?.title}
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">
                    Resume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      Loading applicants...
                    </td>
                  </tr>
                ) : applicants.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No applicants found.
                    </td>
                  </tr>
                ) : (
                  applicants.map((app) => {
                    console.log(app.userId?.userEmail);
                    console.log(app);
                    console.log(app.userId);
                    console.log(app.userId?.userResume);

                    return (
                      <tr key={app._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {app.userId?.userName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {app.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={app.resume}
                            download
                            target="_blank"
                            className="text-blue-700 hover:text-blue-900 underline cursor-pointer"
                          >
                            View Resume
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={app.status}
                            onChange={(e) =>
                              updateStatus(
                                app._id,
                                app.userId?.userEmail,
                                e.target.value
                              )
                            }
                            className="mt-1 block w-full py-2 px-3 border cursor-pointer border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

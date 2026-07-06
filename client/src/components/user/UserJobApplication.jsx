import { useEffect, useState } from "react";
import axios from "axios";
import apis from "../../common/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function UserJobApplication() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.user?._id);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(apis.jobApplied.url, {
          withCredentials: true,
        });

        console.log(response);
        setApplications(response.data?.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchApplications();
  }, [userId]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!applications.length)
    return <div className="text-center py-10">No applications found.</div>;

  return (
    <div className="space-y-6">
      {applications.map((application) => {
        console.log(application);
        return (
          <div key={application._id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  {application.jobId?.title || "Unknown Position"}
                </h3>
                <p className="text-gray-600">
                  {application.jobId?.company?.userName || "Unknown Company"}
                </p>
                <p className="text-gray-600">
                  Applied on:{" "}
                  {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full font-medium ${
                  application.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : application.status === "Shortlisted"
                    ? "bg-green-100 text-green-800"
                    : application.status === "Accepted"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {application.status}
              </span>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() =>
                  navigate(
                    `/job/${
                      application.jobId?.company?.userName
                    }/${encodeURIComponent(application.jobId?.title)}`,
                    {
                      state: { id: application.jobId?._id },
                    }
                  )
                }
                className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

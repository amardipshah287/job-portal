import { useEffect, useState } from "react";
import axios from "axios";
import apis from "../../common/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function UserApplicationHistory() {
  const [applicationHistory, setApplicationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.user?._id);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(apis.jobApplied.url, {
          withCredentials: true,
        });

        console.log(response);
        setApplicationHistory(response.data?.data);
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
  if (!applicationHistory.length)
    return <div className="text-center py-10">No applications found.</div>;

  return (
    <div className="space-y-6">
      {applicationHistory.map((application, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xl font-bold text-primary">
                {application.jobId?.company?.userName}
              </p>
              <p className=" text-gray-600">
                Role:{" "}
                <span className="text-lg font-semibold">
                  {" "}
                  {application.jobId?.title}
                </span>
              </p>
              <p className=" text-gray-600">
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
        </div>
      ))}
    </div>
  );
}

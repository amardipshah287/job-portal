import { useEffect, useState } from "react";
import axios from "axios";
import { BookmarkCheck } from "lucide-react";
import { toast } from "react-toastify";
import apis from "../../common/api";
import { useNavigate } from "react-router-dom";

export function UserSavedJobs() {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(apis.savedJob.url, {
          withCredentials: true,
        });
        setSavedJobs(response.data?.data);
        console.log(response);
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleUnsaveJob = async (jobId) => {
    try {
      await axios.post(
        apis.unsaveJob.url,
        { jobId },
        { withCredentials: true }
      );
      setSavedJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading saved jobs...</p>;
  }

  return (
    <div className="space-y-6">
      {savedJobs.length === 0 ? (
        <p className="text-center text-gray-500">No saved jobs found.</p>
      ) : (
        savedJobs.map((job) => (
          <div key={job._id} className="p-6 rounded-lg shadow-lg border">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {job.company?.userName} • {job.location}
                </p>
                <p className="mt-2">{job.description}</p>
              </div>
              <button
                className="text-primary hover:text-red-500"
                onClick={() => handleUnsaveJob(job._id)}
              >
                <BookmarkCheck className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm font-medium text-primary">
                Rs. {job.salaryRange?.min} - Rs. {job.salaryRange?.max}
              </span>
              <button
                onClick={() =>
                  navigate(
                    `/job/${job?.company?.userName}/${encodeURIComponent(
                      job?.title
                    )}`,
                    {
                      state: { id: job?._id },
                    }
                  )
                }
                className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

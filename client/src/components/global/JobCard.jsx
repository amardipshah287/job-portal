import { Crown, Bookmark, BookmarkCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../common/api";
import { useSelector } from "react-redux";

export function JobCard({ job, jobTypes }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.auth);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(user?.savedJobs?.includes(job?._id));
  }, [user?.savedJobs, job?._id]);

  const handleSaveJob = async () => {
    setIsSaved((prev) => !prev);

    try {
      const response = await axios.post(
        apis.saveJob.url,
        { jobId: job?._id },
        { withCredentials: true }
      );

      if (response?.data?.data === "alreadySaved") {
        try {
          await axios.post(
            apis.unsaveJob.url,
            { jobId: job?._id },
            { withCredentials: true }
          );
        } catch (err) {
          toast.error(err.response?.data?.message);
          setIsSaved(true);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      setIsSaved((prev) => !prev);
    }
  };

  return (
    <div className="rounded-lg shadow-xl hover:shadow-sm overflow-hidden transition-all duration-300 hover:cursor-default">
      <div className="px-6 pt-4 pb-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {job?.title}
          </h2>
          <div className="flex items-center gap-2">
            {job.premium && <Crown className="text-yellow-500" size={20} />}
            {isSaved ? (
              <BookmarkCheck
                className="text-primary hover:cursor-pointer"
                onClick={handleSaveJob}
              />
            ) : (
              <Bookmark
                className="hover:cursor-pointer"
                onClick={handleSaveJob}
              />
            )}
          </div>
        </div>
        <p className="text-gray-600 mb-4">{job?.company?.userName}</p>
        <p className="text-gray-600 mb-2">{job?.location}</p>
        {job.salaryRange?.min && job.salaryRange?.max && (
          <p className="font-medium text-gray-700 mb-4">{`Rs.${job.salaryRange?.min} - Rs.${job.salaryRange?.max}`}</p>
        )}
        <div className="flex space-x-2 mb-4">
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${
              jobTypes[job?.jobType]
            }`}
          >
            {job?.jobType}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${
              jobTypes[job?.locationType]
            }`}
          >
            {job?.locationType}
          </span>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
        <div className="text-gray-500">
          <p>Posted on: {new Date(job?.createdAt).toLocaleDateString()}</p>
          <p>
            Expires on: {new Date(job?.expirationDate).toLocaleDateString()}
          </p>
        </div>
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
  );
}

import { useState, useEffect } from "react";
import apis from "../../common/api";
import axios from "axios";
import { toast } from "react-toastify";

export function CompanyPayment() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios.get(apis.postedJob.url, {
          withCredentials: true,
        });
        setJobs(response.data?.data);
        console.log(response.data?.data);
      } catch (error) {
        console.error("Error fetching jobs 1:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const handlePayment = async (jobId) => {
    console.log("Initiating payment for job:", jobId);

    const options = {
      jobId,
      website_url: import.meta.env.VITE_FRONTEND_DOMAIN,
    };
    try {
      const response = await axios.post(apis.khaltiPay.url, options, {
        withCredentials: true,
      });

      console.log(response);

      if (response.status != 200) {
        console.log("Something went wrong");
        toast.error("Something went wrong.");
        return;
      }

      console.log(response?.data?.payment?.payment_url);

      window.location.href = response?.data?.payment?.payment_url;
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Company Job Listings</h1>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-primary">Your Jobs</h2>
          {jobs.length === 0 ? (
            <p>No jobs posted yet.</p>
          ) : (
            <ul className="space-y-4">
              {jobs.map((job) => (
                <li
                  key={job._id}
                  className="p-4 border rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.location}</p>
                    <p className="text-sm text-gray-600">
                      Premium: {job.premium ? "Yes" : "No"}
                    </p>
                  </div>
                  {!job.premium && (
                    <button
                      onClick={() => handlePayment(job._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Pay for Premium
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

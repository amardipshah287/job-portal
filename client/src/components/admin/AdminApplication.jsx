import { useEffect, useState } from "react";
import axios from "axios";
import { FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import apis from "../../common/api";
import { toast } from "react-toastify";

export function AdminApplication() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(apis.allApplications.url, {
          withCredentials: true,
        });

        console.log(response);
        setApplications(response.data?.data);
        toast.success(response.data?.message);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error(error.response?.data?.message);
      }
    };

    fetchApplications();
  }, []);

  const totalApplications = applications.length;
  const pendingCount = applications.filter(
    (app) => app.status === "Pending"
  ).length;
  const approvedCount = applications.filter(
    (app) => app.status === "Accepted"
  ).length;
  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Applications
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          icon={FileText}
          title="Total Applications"
          count={totalApplications}
          color="blue"
        />
        <SummaryCard
          icon={Clock}
          title="Pending"
          count={pendingCount}
          color="yellow"
        />
        <SummaryCard
          icon={CheckCircle}
          title="Approved"
          count={approvedCount}
          color="green"
        />
        <SummaryCard
          icon={XCircle}
          title="Rejected"
          count={rejectedCount}
          color="red"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Applications
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applicant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {app.userId?.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {app.jobId?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {app.jobId?.company?.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={app.resume}
                      download
                      target="_blank"
                      className="text-blue-800 underline"
                    >
                      view Pdf
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={app.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const SummaryCard = ({ icon: Icon, title, count, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-full bg-${color}-100`}>
        <Icon className={`h-8 w-8 text-${color}-600`} />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{count}</p>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Accepted: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    Shortlisted: "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[status]}`}
    >
      {status}
    </span>
  );
};

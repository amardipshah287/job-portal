import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Software Engineer", applications: 120 },
  { name: "Product Manager", applications: 80 },
  { name: "Data Analyst", applications: 60 },
  { name: "UX Designer", applications: 40 },
];

export function DashPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Job Postings" value="25" />
        <StatCard title="Active Applications" value="342" />
        <StatCard title="Shortlisted Candidates" value="56" />
        <StatCard title="Hired This Month" value="12" />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Applications by Job Title
        </h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary transition-colors">
          <Link to={"/dashboard/provider/job-postings"}> Create New Job</Link>
          Posting
        </button>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}

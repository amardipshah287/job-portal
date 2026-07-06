import { Users, Briefcase, FileText, CreditCard } from "lucide-react";

export function AdminDash() {
  const stats = [
    { icon: Users, label: "Total Users", value: "10,483" },
    { icon: Briefcase, label: "Jobs Posted", value: "2,786" },
    { icon: FileText, label: "Applications", value: "18,592" },
    { icon: CreditCard, label: "Payments", value: "$287,492" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#0f5da7] bg-opacity-10">
                <stat.icon className="h-8 w-8 text-[#0f5da7]" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
                <p className="text-2xl font-semibold text-gray-800">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          {/* Add a chart or list of recent activities here */}
          <p className="text-gray-600">Chart or list placeholder</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Top Job Categories
          </h2>
          {/* Add a chart of top job categories here */}
          <p className="text-gray-600">Chart placeholder</p>
        </div>
      </div>
    </div>
  );
}

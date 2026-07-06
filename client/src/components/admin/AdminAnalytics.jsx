import { BarChart2, TrendingUp, Users, Briefcase } from "lucide-react";

export function AdminAnalytics() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="h-8 w-8 text-[#0f5da7]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">User Growth</p>
              <p className="text-2xl font-semibold text-gray-800">+22%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <Briefcase className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Job Postings</p>
              <p className="text-2xl font-semibold text-gray-800">+15%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Application Rate
              </p>
              <p className="text-2xl font-semibold text-gray-800">+18%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <BarChart2 className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Conversion Rate
              </p>
              <p className="text-2xl font-semibold text-gray-800">12.3%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            User Activity
          </h2>
          <p className="text-gray-600">
            Chart placeholder for user activity over time
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Top Job Categories
          </h2>
          <p className="text-gray-600">
            Chart placeholder for top job categories
          </p>
        </div>
      </div>
    </div>
  );
}

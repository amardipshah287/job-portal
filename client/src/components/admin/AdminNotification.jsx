import { Bell, Mail, AlertTriangle } from "lucide-react";

export function AdminNotification() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Notifications
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Bell className="h-8 w-8 text-[#0f5da7]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Notifications
              </p>
              <p className="text-2xl font-semibold text-gray-800">1,284</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Email Notifications
              </p>
              <p className="text-2xl font-semibold text-gray-800">957</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Urgent Notifications
              </p>
              <p className="text-2xl font-semibold text-gray-800">327</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Notifications
        </h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-4">
            <div className="flex items-center">
              <Bell className="h-6 w-6 text-[#0f5da7] mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  New job application received
                </p>
                <p className="text-sm text-gray-500">
                  John Doe applied for Senior Developer position
                </p>
              </div>
              <span className="ml-auto text-sm text-gray-500">2 hours ago</span>
            </div>
          </li>
          <li className="py-4">
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Interview scheduled
                </p>
                <p className="text-sm text-gray-500">
                  Interview with Jane Smith for UX Designer role
                </p>
              </div>
              <span className="ml-auto text-sm text-gray-500">1 day ago</span>
            </div>
          </li>
          <li className="py-4">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Urgent: Job posting expiring soon
                </p>
                <p className="text-sm text-gray-500">
                  Frontend Developer position expires in 24 hours
                </p>
              </div>
              <span className="ml-auto text-sm text-gray-500">2 days ago</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

export function AdminFeedback() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Feedback</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <MessageSquare className="h-8 w-8 text-[#0f5da7]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Feedback
              </p>
              <p className="text-2xl font-semibold text-gray-800">1,543</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <ThumbsUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Positive Feedback
              </p>
              <p className="text-2xl font-semibold text-gray-800">1,243</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <ThumbsDown className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Negative Feedback
              </p>
              <p className="text-2xl font-semibold text-gray-800">300</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Feedback
        </h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-4">
            <div className="flex items-start">
              <ThumbsUp className="h-6 w-6 text-green-600 mr-3 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Great experience with the job portal!
                </p>
                <p className="text-sm text-gray-500">
                  The interface is user-friendly and I found my dream job
                  quickly.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  John Doe - 2 days ago
                </p>
              </div>
            </div>
          </li>
          <li className="py-4">
            <div className="flex items-start">
              <ThumbsDown className="h-6 w-6 text-red-600 mr-3 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Difficulty in filtering job results
                </p>
                <p className="text-sm text-gray-500">
                  I had trouble finding specific job types. More filter options
                  would be helpful.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Jane Smith - 4 days ago
                </p>
              </div>
            </div>
          </li>
          <li className="py-4">
            <div className="flex items-start">
              <ThumbsUp className="h-6 w-6 text-green-600 mr-3 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Excellent customer support
                </p>
                <p className="text-sm text-gray-500">
                  The support team was very helpful in resolving my account
                  issues.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Mike Johnson - 1 week ago
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

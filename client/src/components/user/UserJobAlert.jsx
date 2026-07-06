import { XCircle } from "lucide-react";

export function UserJobAlert() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-primary">Create New Alert</h3>
        <form className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="keywords"
              className="block font-medium text-gray-700"
            >
              Keywords
            </label>
            <input
              type="text"
              id="keywords"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              placeholder="e.g. React Developer"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              placeholder="e.g. New York, NY"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Create Alert
          </button>
        </form>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Your Alerts</h3>
        {[
          "Frontend Developer in New York",
          "UX Designer in San Francisco",
          "Data Scientist in Boston",
        ].map((alert, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h4 className="font-medium text-primary">{alert}</h4>
              <p className=" text-gray-600">Daily • 10 new jobs</p>
            </div>
            <button className="text-red-600 hover:text-red-800">
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

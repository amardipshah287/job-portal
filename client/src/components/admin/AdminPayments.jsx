// import { useEffect, useState } from "react";
// import axios from "axios";
// import { DollarSign, CreditCard, TrendingUp, ArrowUpRight } from "lucide-react";
// import apis from "../../common/api";
// import { toast } from "react-toastify";

// export function AdminPayments() {
//   const [data, setData] = useState();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(apis.allPayments.url, {
//           withCredentials: true,
//         });
//         console.log(response.data?.data);
//         setData(response.data?.data);
//         toast.success(response.data?.message);
//       } catch (error) {
//         console.error("Error fetching payments data:", error);
//         toast.error(error.response.data?.message);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold text-gray-800 mb-6">Payments</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <StatCard
//           icon={<DollarSign className="h-8 w-8 text-[#0f5da7]" />}
//           title="Total Revenue"
//           value={`$${data.totalRevenue}`}
//           bgColor="bg-blue-100"
//         />
//         <StatCard
//           icon={<CreditCard className="h-8 w-8 text-green-600" />}
//           title="Transactions"
//           value={data.transactions}
//           bgColor="bg-green-100"
//         />
//         <StatCard
//           icon={<TrendingUp className="h-8 w-8 text-yellow-600" />}
//           title="Growth"
//           value={data.growth}
//           bgColor="bg-yellow-100"
//         />
//         <StatCard
//           icon={<ArrowUpRight className="h-8 w-8 text-purple-600" />}
//           title="Conversion Rate"
//           value={data.conversionRate}
//           bgColor="bg-purple-100"
//         />
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Recent Transactions
//           </h2>
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Transaction ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {data.recentTransactions.length > 0 ? (
//                 data.recentTransactions.map((transaction) => (
//                   <tr key={transaction.id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {transaction.id}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       ${transaction.amount.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {transaction.date}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           transaction.status === "Completed"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-yellow-100 text-yellow-800"
//                         }`}
//                       >
//                         {transaction.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="px-6 py-4 text-center" colSpan="4">
//                     No recent transactions
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Reusable Stat Card Component
// const StatCard = ({ icon, title, value, bgColor }) => (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <div className="flex items-center">
//       <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
//       <div className="ml-4">
//         <p className="text-sm font-medium text-gray-500">{title}</p>
//         <p className="text-2xl font-semibold text-gray-800">{value}</p>
//       </div>
//     </div>
//   </div>
// );

import { useEffect, useState } from "react";
import axios from "axios";
import { DollarSign, CreditCard, TrendingUp, ArrowUpRight } from "lucide-react";
import apis from "../../common/api";
import { toast } from "react-toastify";

export function AdminPayments() {
  const [data, setData] = useState({
    totalRevenue: 0,
    transactions: 0,
    growth: "N/A",
    conversionRate: "N/A",
    recentTransactions: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apis.allPayments.url, {
          withCredentials: true,
        });

        console.log(response.data?.data);
        const payments = response.data?.data || [];

        // Calculate total revenue and transaction count
        const totalRevenue = payments.reduce(
          (sum, payment) => sum + payment.amount,
          0
        );
        const transactions = payments.length;

        // Example: Growth and Conversion Rate (Adjust logic as needed)
        const growth =
          transactions > 0 ? `${(transactions / 10) * 100}%` : "N/A";
        const conversionRate =
          transactions > 0 ? `${(transactions / 20) * 100}%` : "N/A";

        setData({
          totalRevenue,
          transactions,
          growth,
          conversionRate,
          recentTransactions: payments,
        });

        toast.success(response.data?.message);
      } catch (error) {
        console.error("Error fetching payments data:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch payment data."
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Payments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={<DollarSign className="h-8 w-8 text-[#0f5da7]" />}
          title="Total Revenue"
          value={`Rs. ${data.totalRevenue}`}
          bgColor="bg-blue-100"
        />
        <StatCard
          icon={<CreditCard className="h-8 w-8 text-green-600" />}
          title="Transactions"
          value={data.transactions}
          bgColor="bg-green-100"
        />
        <StatCard
          icon={<TrendingUp className="h-8 w-8 text-yellow-600" />}
          title="Growth"
          value={data.growth}
          bgColor="bg-yellow-100"
        />
        <StatCard
          icon={<ArrowUpRight className="h-8 w-8 text-purple-600" />}
          title="Conversion Rate"
          value={data.conversionRate}
          bgColor="bg-purple-100"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-1 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Transactions
          </h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.recentTransactions.length > 0 ? (
                data.recentTransactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.apiQueryFromUser?.transaction_id || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Rs. {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(transaction.paymentDate).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-center" colSpan="5">
                    No recent transactions
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card Component
const StatCard = ({ icon, title, value, bgColor }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

import Link from "next/link";

const MerchantDashboard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#e7f0f8]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transition-shadow hover:shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Merchant Dashboard
        </h1>
        <div className="space-y-4">
          <Link
            href="/dashboard/merchant/create"
            className="block w-full text-center py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Create New Deal
          </Link>
          <Link
            href="/dashboard/merchant/manage"
            className="block w-full text-center py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Manage Deals
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;

import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-lg text-gray-700 mb-6">
        You do not have the necessary permissions to access this page.
      </p>
      <Link href="/auth">
        <a className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
          Go to Sign in Page
        </a>
      </Link>
    </div>
  );
};

export default Unauthorized;

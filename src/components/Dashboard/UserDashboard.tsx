import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseClient";
import Link from "next/link";
import { Deal } from "src/utiles/interface/deal.interface";

const UserDashboard = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const dealsCollection = collection(firestore, "deals");
        const querySnapshot = await getDocs(dealsCollection);
        const dealsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Deal[];

        setDeals(dealsList);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Available Deals</h2>
      {deals.length > 0 ? (
        <ul className="space-y-4">
          {deals.map((deal) => (
            <li
              key={deal.id}
              className="bg-white border border-gray-300 shadow-lg rounded-lg p-4"
            >
              <Link
                href={`/deals/${deal.id}`}
                className="text-lg font-semibold text-blue-500 hover:underline"
              >
                {deal.description}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No deals available. Please check back later!</p>
      )}
    </div>
  );
};

export default UserDashboard;

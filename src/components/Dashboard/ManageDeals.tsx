"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebaseClient";
import { Deal } from "src/utiles/interface/deal.interface";

const ManageDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(firestore, "deals"),
          where("merchantId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const dealsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Deal[];
        setDeals(dealsList);
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const deleteDeal = async (dealId: string) => {
    await deleteDoc(doc(firestore, "deals", dealId));
    alert("Deal Deleted!");
    setDeals(deals.filter((deal) => deal.id !== dealId));
  };

  const updateDealStatus = async (dealId: string, status: string) => {
    const dealRef = doc(firestore, "deals", dealId);
    await updateDoc(dealRef, { status });
    alert("Deal Updated!");
    setDeals(
      deals.map((deal) => (deal.id === dealId ? { ...deal, status } : deal))
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-[#e7f0f8]">
      <h2 className="text-2xl font-bold mb-6">Manage Your Deals</h2>
      {deals.length > 0 ? (
        <ul className="space-y-4">
          {deals.map((deal) => (
            <li
              key={deal.id}
              className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold">{deal.description}</h3>
              <p className="text-gray-600">
                Enrollment: {deal.merchantEnrollmentDetails}
              </p>
              <p
                className={`font-bold ${
                  deal.status === "active" ? "text-green-600" : "text-red-600"
                }`}
              >
                Status: {deal.status}
              </p>
              <p className="text-gray-500">
                Created At:{" "}
                {new Date(deal.createdAt.seconds * 1000).toLocaleString()}
              </p>
              <p className="text-gray-500">
                Updated At:{" "}
                {new Date(deal.updatedAt.seconds * 1000).toLocaleString()}
              </p>

              <div className="space-x-2 mt-4">
                <button
                  onClick={() => updateDealStatus(deal.id, "inactive")}
                  className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition-colors duration-200"
                >
                  Set Inactive
                </button>
                <button
                  onClick={() => updateDealStatus(deal.id, "active")}
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition-colors duration-200"
                >
                  Set Active
                </button>

                <button
                  onClick={() => deleteDeal(deal.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No deals available. Create your first deal!</p>
      )}
    </div>
  );
};

export default ManageDeals;

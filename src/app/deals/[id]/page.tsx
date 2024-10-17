"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebaseClient";
import { Deal } from "src/utiles/interface/deal.interface";

const DealDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [deal, setDeal] = useState<Deal | null>(null);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const dealSnapshot = await getDocs(
          query(collection(firestore, "deals"), where("__name__", "==", id))
        );

        if (dealSnapshot.docs.length > 0) {
          setDeal(dealSnapshot.docs[0].data() as Deal);
        } else {
          setErrorMessage("Deal not found");
        }
      } catch (error) {
        if (error instanceof Error) setErrorMessage("Error fetching deal");
      }
    };
    fetchDeal();
  }, [id]);

  const handleEnrollment = async () => {
    if (!comment) {
      setErrorMessage("Comment is required.");
      return;
    }

    try {
      const dealRef = doc(firestore, "deals", id);
      await updateDoc(dealRef, { enrollmentComments: comment });

      const userEmail = auth.currentUser?.email;
      if (userEmail) {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail, dealId: id, comment }),
        });

        if (!response.ok) {
          throw new Error("Failed to send email.");
        }
        setMessage("Enrollment successful. Email sent.");
        setComment("");

        alert("Email has been sent successfully!");
      } else {
        setErrorMessage("User email not available.");
      }
    } catch (error) {
      if (error instanceof Error) setErrorMessage("Error enrolling in deal.");
    }
  };

  if (!deal) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{deal.description}</h1>
      <p className="mb-4">{deal.merchantEnrollmentDetails}</p>

      <p className="mb-4 text-gray-600">
        Created at: {new Date(deal.createdAt.seconds * 1000).toLocaleString()}
      </p>

      <p
        className={`mb-4 font-bold ${
          deal.status === "active" ? "text-green-600" : "text-red-600"
        }`}
      >
        Status: {deal.status === "active" ? "Active" : "Inactive"}
      </p>

      <textarea
        className="w-full border rounded p-2 mb-4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter your comment"
      />

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleEnrollment}
      >
        Enroll in Deal
      </button>
    </div>
  );
};

export default DealDetail;

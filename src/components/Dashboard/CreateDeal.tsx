"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { auth, firestore } from "@/firebase/firebaseClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { DealDTO } from "src/utiles/validation/deal/dealDto";
import { dealSchema } from "src/utiles/validation/deal/validationDealDto";

const CreateDeal = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DealDTO>({
    resolver: zodResolver(dealSchema),
  });

  const handleCreateDeal = async (data: DealDTO) => {
    try {
      const user = auth.currentUser;

      if (user) {
        const dealId = uuidv4();

        await setDoc(doc(firestore, "deals", dealId), {
          dealId,
          merchantId: user.uid,
          description: data.description,
          merchantEnrollmentDetails: data.merchantEnrollmentDetails,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          status: data.status,
        });

        setMessage("Deal successfully created!");
        router.push("/dashboard/merchant/manage");
      } else {
        setError("User is not authenticated.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error creating deal: ${error.message}`);
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#e7f0f8]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transition-shadow hover:shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Create New Deal
        </h1>
        <form onSubmit={handleSubmit(handleCreateDeal)}>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              {...register("description")}
              className="w-full h-24 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter deal description"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Enrollment Details</label>
            <textarea
              {...register("merchantEnrollmentDetails")}
              className="w-full h-24 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter enrollment details"
            />
            {errors.merchantEnrollmentDetails && (
              <p className="text-red-500">
                {errors.merchantEnrollmentDetails.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              {...register("status")}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="active">Active</option>
              <option value="discontinued">Discontinued</option>
            </select>
            {errors.status && (
              <p className="text-red-500">{errors.status.message}</p>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition-colors duration-200"
          >
            Create Deal
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDeal;

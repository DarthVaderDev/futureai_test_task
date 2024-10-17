"use client";

import React from "react";
import { DealCardProps } from "src/utiles/interface/dealCard.interface";

const DealCard: React.FC<DealCardProps> = ({
  deal,
  onEnroll,
  comment,
  onCommentChange,
  errorMessage,
}) => {
  return (
    <li className="bg-white border border-gray-300 shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-semibold">{deal.description}</h3>
      <p className="text-gray-600">
        Enrollment Details: {deal.merchantEnrollmentDetails}
      </p>
      <p
        className={`font-bold ${
          deal.status === "active" ? "text-green-600" : "text-red-600"
        }`}
      >
        Status: {deal.status}
      </p>
      <p className="text-gray-500">
        Created At: {new Date(deal.createdAt.seconds * 1000).toLocaleString()}
      </p>
      <p className="text-gray-500">
        Updated At: {new Date(deal.updatedAt.seconds * 1000).toLocaleString()}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onEnroll(deal.id, comment);
        }}
        className="mt-2"
      >
        <textarea
          value={comment}
          onChange={(e) => onCommentChange(deal.id, e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Add your comments here..."
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="mt-4">
          {deal.status === "active" && (
            <button
              type="submit"
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Enroll in Deal
            </button>
          )}
        </div>
      </form>
    </li>
  );
};

export default DealCard;

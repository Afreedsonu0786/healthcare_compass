import React from "react";
import { SortType } from "@/types/hospital";

interface RecommendationButtonsProps {
  showRecommended: boolean;
  sortType: SortType;
  handleRecommended: () => void;
  handleLowCostRecommendation: () => void;
}

export default function RecommendationButtons({
  showRecommended,
  sortType,
  handleRecommended,
  handleLowCostRecommendation,
}: RecommendationButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
      <button
        onClick={handleRecommended}
        className={`px-6 py-3 rounded-xl font-medium transition ${
          showRecommended && sortType === "utilization"
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        Best Utilized Hospitals
      </button>

      <button
        onClick={handleLowCostRecommendation}
        className={`px-6 py-3 rounded-xl font-medium transition ${
          showRecommended && sortType === "cost"
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        Lowest Cost Hospitals
      </button>
    </div>
  );
}

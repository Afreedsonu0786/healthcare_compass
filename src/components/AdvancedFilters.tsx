// components/AdvancedFilters.tsx
import React from "react";

interface AdvancedFiltersProps {
  distance: string;
  setDistance: (value: string) => void;
  minCost: string;
  setMinCost: (value: string) => void;
  maxCost: string;
  setMaxCost: (value: string) => void;
}

export default function AdvancedFilters({
  distance,
  setDistance,
  minCost,
  setMinCost,
  maxCost,
  setMaxCost,
}: AdvancedFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 rounded-lg">
      <div className="w-full md:w-1/3">
        <label className="block text-sm text-gray-600 mb-1">Distance</label>
        <select
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full shadow-sm"
        >
          <option value="any">Any Distance</option>
          <option value="5">Within 5 km</option>
          <option value="10">Within 10 km</option>
          <option value="25">Within 25 km</option>
          <option value="50">Within 50 km</option>
        </select>
      </div>

      <div className="w-full md:w-1/3 ">
        <label className="block text-sm text-gray-600 mb-1">Min Cost ($)</label>
        <input
          type="number"
          placeholder="Min Cost"
          value={minCost}
          onChange={(e) => setMinCost(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full shadow-sm"
        />
      </div>

      <div className="w-full md:w-1/3">
        <label className="block text-sm text-gray-600 mb-1">Max Cost ($)</label>
        <input
          type="number"
          placeholder="Max Cost"
          value={maxCost}
          onChange={(e) => setMaxCost(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full shadow-sm"
        />
      </div>
    </div>
  );
}

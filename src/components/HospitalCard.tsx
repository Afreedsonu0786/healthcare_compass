"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { calculateDistance } from "@/lib/distance-utils";
import { ReactNode, useState } from "react";

type HospitalInfo = {
  treatment_type: string;
  hospital_id: string;
  hospital_name: string;
  hospital_address: string;
  city: string;
  state: string;
  lat: number;
  lon: number;
  phone: string;
  utilization: number;
  avg_cost: number;
  total_cases: number;
  treatment_name: string;
};

type Props = {
  hospitals: HospitalInfo[];
  userLat: number | null;
  userLon: number | null;
};

const getCostGroup = (cost: number): "Low" | "Medium" | "High" => {
  if (cost <= 500) return "Low";
  if (cost <= 1000) return "Medium";
  return "High";
};

const badgeColorMap: Record<string, string> = {
  Low: "bg-green-500 text-white",
  Medium: "bg-yellow-400 text-black",
  High: "bg-red-500 text-white",
};

export default function HospitalCard({ hospitals, userLat, userLon }: Props) {
  const [filteredHospitals, setFilteredHospitals] =
    useState<HospitalInfo[]>(hospitals);
  const [selectedHospital, setSelectedHospital] = useState<HospitalInfo | null>(
    null
  );

  const items = filteredHospitals.map((hospital) => {
    const distance =
      userLat && userLon
        ? calculateDistance(
            userLat,
            userLon,
            hospital.lat,
            hospital.lon
          ).toFixed(2)
        : "N/A";

    const costGroup = getCostGroup(hospital.avg_cost);
    const description: ReactNode = (
      <div className="relative pb-8 space-y-3">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-gray-400">
            {hospital.hospital_address}, {hospital.city}, {hospital.state}
          </div>
          <div className="text-sm text-gray-500 font-semibold">
            Treatment:{" "}
            <span className="text-gray-400">{hospital.treatment_name}</span>
          </div>

          <div className="text-sm text-gray-500">Distance: {distance} mi</div>
          <div className="text-sm text-gray-500 mb-4">
            Average Cost: ${hospital.avg_cost.toFixed(2)}.
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <a
            href={`https://www.google.com/maps?q=${hospital.lat},${hospital.lon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-2 rounded-2xl text-sm transition duration-200 hover:bg-blue-700"
          >
            Directions
          </a>
          <button
            onClick={() => setSelectedHospital(hospital)}
            className="bg-gray-700 text-white px-8 py-2 rounded-2xl text-sm transition duration-200 hover:bg-gray-800 cursor-pointer"
          >
            Details
          </button>
        </div>

        <div
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-xs font-semibold mt-6 shadow-lg ${badgeColorMap[costGroup]}`}
        >
          {costGroup.toUpperCase()}
        </div>
      </div>
    );

    return {
      key: hospital.hospital_id,
      title: hospital.hospital_name,
      description,
      link: "#",
    };
  });

  return (
    <div className="mt-8">
      <HoverEffect items={items} />

      {selectedHospital && (
        <div className="mt-10 bg-black border rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-gray-300 mb-4">
            {selectedHospital.hospital_name}
          </h2>
          <div className="space-y-2 text-shadow-teal-50">
            <div>
              <strong>Address:</strong> {selectedHospital.hospital_address}
            </div>
            <div>
              <strong>City:</strong> {selectedHospital.city}
            </div>
            <div>
              <strong>Treatment:</strong> {selectedHospital.treatment_name}
            </div>
            <div>
              <strong>Type:</strong> {selectedHospital.treatment_type}
            </div>
            <div>
              <strong>Average Cost:</strong> $
              {selectedHospital.avg_cost.toFixed(2)}
            </div>
            <div>
              <strong>Phone Number: +1(</strong>
              {selectedHospital.phone})
            </div>
          </div>
          <button
            onClick={() => setSelectedHospital(null)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

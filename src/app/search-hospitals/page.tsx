"use client";

import { useState, useEffect } from "react";
import rawdata from "@/data/hospital_treatment_info.json";
import HospitalCard from "@/components/HospitalCard";
import SearchForm from "@/components/SearchForm";
import AdvancedFilters from "@/components/AdvancedFilters";
import RecommendationButtons from "@/components/RecommendationButtons";
import ResultsPagination from "@/components/ResultsPagination";
import { calculateDistance } from "@/lib/distance-utils";
import { HospitalInfo, SortType } from "@/types/hospital";

export default function SearchHospitalsPage() {
  const hospitalData = rawdata as HospitalInfo[];

  const [treatment, setTreatment] = useState("");
  const [location, setLocation] = useState("");
  const [minCost, setMinCost] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [distance, setDistance] = useState("any");
  const [results, setResults] = useState<HospitalInfo[]>([]);
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLon, setUserLon] = useState<number | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showRecommended, setShowRecommended] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortType, setSortType] = useState<SortType>("utilization");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLat(position.coords.latitude);
          setUserLon(position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  const performSearch = (
    isRecommended = false,
    sortBy: SortType = "utilization"
  ) => {
    const min = parseFloat(minCost) || 0;
    const max = parseFloat(maxCost) || Number.MAX_VALUE;
    const distanceLimit =
      distance === "any" ? Number.MAX_VALUE : parseInt(distance);

    // Start with all hospital data
    let filteredHospitals = [...hospitalData];

    // Filter by treatment
    if (treatment !== "") {
      filteredHospitals = filteredHospitals.filter((hospital) =>
        hospital.treatment_name.toLowerCase().includes(treatment.toLowerCase())
      );
    }

    // Filter by location
    if (location !== "") {
      filteredHospitals = filteredHospitals.filter(
        (hospital) =>
          hospital.city.toLowerCase().includes(location.toLowerCase()) ||
          hospital.hospital_address
            .toLowerCase()
            .includes(location.toLowerCase())
      );
    }

    // Filter by cost range
    filteredHospitals = filteredHospitals.filter(
      (hospital) => hospital.avg_cost >= min && hospital.avg_cost <= max
    );

    // Filter by distance if user location is available
    if (userLat && userLon && distanceLimit !== Number.MAX_VALUE) {
      filteredHospitals = filteredHospitals.filter((hospital) => {
        const distanceToHospital = calculateDistance(
          userLat,
          userLon,
          hospital.lat,
          hospital.lon
        );
        // Convert km to miles if your distance-utils returns miles
        return distanceToHospital <= distanceLimit;
      });
    }

    // Sort based on recommendation type
    if (isRecommended) {
      if (sortBy === "utilization") {
        // Sort by utilization (higher is better)
        filteredHospitals.sort((a, b) => b.utilization - a.utilization);
      } else {
        // Sort by cost (lower is better)
        filteredHospitals.sort((a, b) => a.avg_cost - b.avg_cost);
      }
    }

    setResults(filteredHospitals);
    setCurrentPage(1);
    setShowRecommended(isRecommended);
    setSortType(sortBy);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(false);
    setHasSearched(true);
    setShowAdvancedFilters(true);
  };

  const handleRecommended = () => {
    performSearch(true, "utilization");
  };

  const handleLowCostRecommendation = () => {
    performSearch(true, "cost");
  };

  // Ensure pagination works correctly
  const totalPages = Math.ceil(results.length / itemsPerPage);

  // Adjust current page if it's out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [results, currentPage, totalPages]);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedHospitals = results.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="mt-40 min-h-fit p-6 max-w-4xl  text-white mx-auto s">
      <h1 className="text-4xl font-semibold text-center mb-8">
        Find Hospitals
      </h1>
      <p className="text-center text-xl font-semibold mb-8">
        Enter your treatment and location to discover top-rated hospitals near
        you
      </p>

      <SearchForm
        treatment={treatment}
        setTreatment={setTreatment}
        location={location}
        setLocation={setLocation}
        handleSearch={handleSearch}
      />

      {showAdvancedFilters && (
        <AdvancedFilters
          distance={distance}
          setDistance={setDistance}
          minCost={minCost}
          setMinCost={setMinCost}
          maxCost={maxCost}
          setMaxCost={setMaxCost}
        />
      )}

      {hasSearched && (
        <RecommendationButtons
          showRecommended={showRecommended}
          sortType={sortType}
          handleRecommended={handleRecommended}
          handleLowCostRecommendation={handleLowCostRecommendation}
        />
      )}

      {results.length > 0 ? (
        <>
          <div className="mb-4 text-center font-medium text-gray-700">
            Found {results.length} hospital{results.length !== 1 ? "s" : ""}
            {location ? ` in or near ${location}` : ""}
            {showRecommended && (
              <span className="ml-1">
                {sortType === "utilization"
                  ? " (sorted by best utilization)"
                  : " (sorted by lowest cost)"}
              </span>
            )}
          </div>
          <HospitalCard
            key={`hospitals-${currentPage}-${
              showRecommended ? sortType : "regular"
            }`}
            hospitals={paginatedHospitals}
            userLat={userLat}
            userLon={userLon}
          />
          <ResultsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <div className="text-center text-lg text-gray-400">
          {hasSearched
            ? "No hospitals found matching your criteria."
            : "Search for hospitals above."}
        </div>
      )}
    </div>
  );
}

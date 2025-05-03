import React, { useMemo, useState, useRef, useEffect } from "react";
import rawdata from "@/data/hospital_treatment_info.json";

interface HospitalTreatment {
  treatment_name: string;
  city: string;
  hospital_name: string;
  price: number;
  rating: number;
}

interface SearchFormProps {
  treatment: string;
  setTreatment: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export default function SearchForm({
  treatment,
  setTreatment,
  location,
  setLocation,
  handleSearch,
}: SearchFormProps) {
  // TypeScript expects proper typing for imported JSON
  const data = rawdata as HospitalTreatment[];

  // Filter input states
  const [treatmentFilter, setTreatmentFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  // Dropdown visibility states
  const [treatmentDropdownVisible, setTreatmentDropdownVisible] =
    useState(false);
  const [cityDropdownVisible, setCityDropdownVisible] = useState(false);

  // Refs for handling outside clicks
  const treatmentDropdownRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // Calculate unique treatments and cities once using useMemo
  const { treatmentOptions, cityOptions } = useMemo(() => {
    // Extract unique treatment names and cities
    const uniqueTreatments = Array.from(
      new Set(data.map((item) => item.treatment_name))
    ).sort();

    const uniqueCities = Array.from(
      new Set(data.map((item) => item.city))
    ).sort();

    return { treatmentOptions: uniqueTreatments, cityOptions: uniqueCities };
  }, [data]);

  // Filtered options based on user input
  const filteredTreatmentOptions = useMemo(() => {
    return treatmentOptions.filter((option) =>
      option.toLowerCase().includes(treatmentFilter.toLowerCase())
    );
  }, [treatmentOptions, treatmentFilter]);

  const filteredCityOptions = useMemo(() => {
    return cityOptions.filter((option) =>
      option.toLowerCase().includes(cityFilter.toLowerCase())
    );
  }, [cityOptions, cityFilter]);

  // Handle clicks outside dropdown to close them
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        treatmentDropdownRef.current &&
        !treatmentDropdownRef.current.contains(event.target as Node)
      ) {
        setTreatmentDropdownVisible(false);
      }
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target as Node)
      ) {
        setCityDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Select treatment option
  const handleSelectTreatment = (value: string) => {
    setTreatment(value);
    setTreatmentFilter(value);
    setTreatmentDropdownVisible(false);
  };

  // Select city option
  const handleSelectCity = (value: string) => {
    setLocation(value);
    setCityFilter(value);
    setCityDropdownVisible(false);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col gap-6 justify-center mb-8"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Treatment dropdown with filter */}
        <div className="relative w-full md:w-1/2" ref={treatmentDropdownRef}>
          <input
            type="text"
            placeholder="Treatment name"
            value={treatmentFilter}
            onChange={(e) => {
              setTreatmentFilter(e.target.value);
              setTreatment(e.target.value);
              setTreatmentDropdownVisible(true);
            }}
            onClick={() => setTreatmentDropdownVisible(true)}
            className="border border-gray-300 rounded-lg p-3 w-full shadow-md bg-black text-white"
          />
          {treatmentDropdownVisible && filteredTreatmentOptions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-black text-white border border-gray-300 rounded-lg shadow-lg">
              {filteredTreatmentOptions.map((option) => (
                <div
                  key={option}
                  className="p-2 cursor-pointer hover:bg-gray-800"
                  onClick={() => handleSelectTreatment(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* City dropdown with filter */}
        <div className="relative w-full md:w-1/2" ref={cityDropdownRef}>
          <input
            type="text"
            placeholder="City"
            value={cityFilter}
            onChange={(e) => {
              setCityFilter(e.target.value);
              setLocation(e.target.value);
              setCityDropdownVisible(true);
            }}
            onClick={() => setCityDropdownVisible(true)}
            className="border border-gray-300 rounded-lg p-3 w-full shadow-md bg-black text-white"
          />
          {cityDropdownVisible && filteredCityOptions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto border border-gray-300 rounded-lg shadow-lg bg-black text-white">
              {filteredCityOptions.map((option) => (
                <div
                  key={option}
                  className="p-2 cursor-pointer hover:bg-gray-800"
                  onClick={() => handleSelectCity(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-8 py-3 rounded-2xl shadow-md hover:bg-blue-600 transition cursor-pointer"
        >
          Search
        </button>
      </div>
    </form>
  );
}

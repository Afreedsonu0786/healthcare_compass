import React from "react";

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
  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col gap-6 justify-center mb-8"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <input
          type="text"
          placeholder="Treatment Type"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/2 shadow-md"
        />
        <input
          type="text"
          placeholder="City"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/2 shadow-md"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-15 py-3 rounded-2xl shadow-md hover:bg-blue-600 transition cursor-pointer"
        >
          Search
        </button>
      </div>
    </form>
  );
}

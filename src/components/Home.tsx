import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/Spotlight";
import { Hospital, Search, DollarSign } from "lucide-react";
import Link from "next/link";

export function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100vh] bg-gradient-to-b from-black via-neutral-900 to-black px-4 pt-[100px]">
      {/* Spotlight */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />

      {/* Title & Subtitle */}
      <div className="relative z-10 max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-300 to-blue-500">
          Health Care Compass
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-neutral-300 font-light">
          Find the Best Healthcare at the Right Price
        </p>
        <p className="mt-4 text-lg md:text-xl text-neutral-300 font-light">
          Compare hospitals, Estimate treatment costs all in one place.
        </p>
      </div>

      {/* Features */}
      <div className="relative z-10 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        <div className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-4">
            <Hospital className="text-blue-400 w-6 h-6" />
            <h3 className="text-xl font-semibold text-white">Why Choose Us?</h3>
          </div>
          <p className="text-sm text-neutral-300">
            Navigate the healthcare system confidently with transparency and
            ease.
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-4">
            <Search className="text-blue-400 w-6 h-6" />
            <h3 className="text-xl font-semibold text-white">
              Compare Hospitals
            </h3>
          </div>
          <p className="text-sm text-neutral-300">
            Search and compare hospitals by cost and specialties to make
            informed choices.
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="text-blue-400 w-6 h-6" />
            <h3 className="text-xl font-semibold text-white">
              Cost Estimation
            </h3>
          </div>
          <p className="text-sm text-neutral-300">
            Get estimated treatment costs across providers with transparency.
          </p>
        </div>
      </div>
      <Link
        href="/search-hospitals"
        className="relative mt-12 inline-block group"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 blur-sm opacity-75 group-hover:opacity-100 transition duration-500 animate-border" />
        <span className="relative z-10 block px-6 py-3 text-white text-lg font-medium rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-blue-500/30 hover:border-blue-400 transition-all duration-300">
          🔍 Search Hospitals
        </span>
      </Link>
    </div>
  );
}

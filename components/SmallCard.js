import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// Distinct gradient per city initial so each fallback looks unique
const GRADIENT_MAP = {
  A: "from-orange-400 to-pink-500",
  B: "from-blue-500 to-indigo-600",
  C: "from-emerald-400 to-teal-600",
  D: "from-amber-400 to-orange-500",
  H: "from-purple-400 to-pink-600",
  L: "from-red-400 to-rose-600",
  M: "from-violet-500 to-purple-700",
  N: "from-sky-400 to-blue-600",
  P: "from-pink-400 to-rose-500",
  S: "from-teal-400 to-cyan-600",
  Y: "from-yellow-400 to-amber-500",
};

function CityFallback({ location }) {
  const initial = location?.charAt(0).toUpperCase() ?? "?";
  const gradient = GRADIENT_MAP[initial] ?? "from-rose-400 to-rose-600";
  return (
    <div
      className={`h-16 w-16 flex-shrink-0 rounded-lg bg-gradient-to-br ${gradient}
                  flex items-center justify-center`}
    >
      <span className="text-white font-bold text-xl select-none">{initial}</span>
    </div>
  );
}

function SmallCard({ img, location, distance }) {
  const [imgError, setImgError] = useState(false);
  const router = useRouter();

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        noOfGuests: 1,
      },
    });
  };

  return (
    <div
      onClick={search}
      className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer
                 hover:bg-gray-100 dark:hover:bg-gray-800
                 hover:scale-105 transition-all duration-200 ease-out"
    >
      {imgError ? (
        <CityFallback location={location} />
      ) : (
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={img}
            alt={location}
            fill
            className="object-cover"
            sizes="64px"
            onError={() => setImgError(true)}
          />
        </div>
      )}
      <div>
        <h2 className="font-medium dark:text-white">{location}</h2>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm">{distance}</h3>
      </div>
    </div>
  );
}

export default SmallCard;

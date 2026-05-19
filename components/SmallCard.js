import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function SmallCard({ img, location, distance }) {
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
                 hover:bg-gray-100 hover:scale-105 transition-transform duration-200 ease-out"
    >
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={img}
          alt={location}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div>
        <h2 className="font-medium">{location}</h2>
        <h3 className="text-gray-500 text-sm">{distance}</h3>
      </div>
    </div>
  );
}

export default SmallCard;

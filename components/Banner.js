import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const BANNER_IMAGE = "/images/banner.jpg";

// Home base is Los Angeles — "I'm flexible" searches LA by default
const HOME_LOCATION = "Los Angeles";

function Banner() {
  const router = useRouter();

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: HOME_LOCATION,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        noOfGuests: 1,
      },
    });
  };

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] overflow-hidden">
      <Image
        src={BANNER_IMAGE}
        alt="Modern luxury home"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

      {/* CTA */}
      <div className="absolute bottom-16 sm:bottom-24 w-full text-center px-4">
        <p className="text-white text-base sm:text-xl font-medium drop-shadow-lg mb-3">
          Find your perfect getaway — anywhere in the US
        </p>
        <p className="text-white/60 text-xs mb-3">
          StayFinder · Demo project · Not affiliated with Airbnb, Inc.
        </p>
        <button
          onClick={search}
          className="bg-white text-rose-500 font-bold px-10 py-4 rounded-full shadow-xl
                     hover:bg-rose-500 hover:text-white active:scale-95
                     transition-all duration-200 ease-in-out text-sm sm:text-base"
        >
          I&apos;m flexible
        </button>
      </div>
    </div>
  );
}

export default Banner;

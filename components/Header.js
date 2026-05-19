import Image from "next/image";
import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  GlobeAltIcon,
  Bars3Icon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/router";

const US_LOCATIONS = [
  "New York",
  "Los Angeles",
  "Miami",
  "Chicago",
  "San Francisco",
  "Austin",
  "Nashville",
  "Seattle",
  "Denver",
  "Boston",
];

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => setSearchInput("");

  const search = () => {
    if (!searchInput) return;
    router.push({
      pathname: "/search",
      query: {
        location: location || "Unknown",
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
    setSearchInput("");
  };

  const findLocation = (e) => {
    const val = e.target.value;
    setSearchInput(val);
    const lower = val.toLowerCase();
    const match = US_LOCATIONS.find((loc) =>
      loc.toLowerCase().includes(lower)
    );
    setLocation(match || "Unknown");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") search();
  };

  const selectionRange = { startDate, endDate, key: "selection" };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-3 md:px-10">
      {/* Logo */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          alt="Airbnb logo"
          fill
          className="object-contain object-left"
          sizes="150px"
        />
      </div>

      {/* Search bar */}
      <div className="flex items-center min-w-[230px] md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={findLocation}
          className="hidden md:inline flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={placeholder || "Search New York, Miami, LA..."}
          onKeyDown={handleKeyDown}
        />
        <MagnifyingGlassIcon
          onClick={search}
          className="hidden md:inline-flex h-8 bg-rose-400 text-white rounded-full p-2 cursor-pointer md:mx-2 hover:bg-rose-500 transition-colors"
        />
      </div>

      {/* Right actions */}
      <div className="flex space-x-4 items-center justify-end text-gray-500">
        <p className="hidden lg:inline cursor-pointer hover:text-gray-800 transition-colors text-sm font-medium">
          Become a host
        </p>
        <GlobeAltIcon className="h-6 cursor-pointer hover:text-gray-800 transition-colors" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer hover:shadow-md transition-shadow">
          <Bars3Icon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {/* Date picker dropdown */}
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-2">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#f43f5e"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4 pb-2">
            <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
            <UsersIcon className="h-5 mr-2" />
            <input
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
              type="number"
              min={1}
              className="w-12 pl-2 text-lg outline-none text-rose-400"
            />
          </div>
          <div className="flex pb-2">
            <button
              className="flex-grow text-gray-500 hover:text-gray-800 transition-colors"
              onClick={resetInput}
            >
              Cancel
            </button>
            <button
              onClick={search}
              className="flex-grow text-rose-400 font-semibold hover:text-rose-600 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

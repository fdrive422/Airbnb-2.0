import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  GlobeAltIcon,
  Bars3Icon,
  UserCircleIcon,
  UsersIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/router";
import { useTheme } from "../context/ThemeContext";

const US_LOCATIONS = [
  "New York", "Los Angeles", "Miami", "Chicago", "San Francisco",
  "Austin", "Nashville", "Seattle", "Denver", "Boston",
];

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [location, setLocation] = useState("");
  const router = useRouter();
  const { dark, toggle } = useTheme();

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
    const match = US_LOCATIONS.find((loc) => loc.toLowerCase().includes(lower));
    setLocation(match || "Unknown");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") search();
  };

  const selectionRange = { startDate, endDate, key: "selection" };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 p-3 md:px-10 transition-colors duration-200">
      {/* Logo */}
      <div
        onClick={() => router.push("/")}
        className="flex items-center gap-2 cursor-pointer my-auto"
      >
        <svg viewBox="0 0 32 40" className="h-9 w-auto" fill="#FF385C" aria-hidden="true">
          <path d="M16 1C8.3 1 2 7.3 2 15c0 4.6 2.1 8.7 5.4 11.4L16 39l8.6-12.6C27.9 23.7 30 19.6 30 15 30 7.3 23.7 1 16 1zm0 19.5c-3 0-5.5-2.5-5.5-5.5S13 9.5 16 9.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5z" />
        </svg>
        <span className="hidden sm:block text-[#FF385C] font-extrabold text-xl tracking-tight select-none">
          airbnb
        </span>
      </div>

      {/* Search bar */}
      <div className="flex items-center min-w-[230px] md:border-2 dark:border-gray-600 rounded-full py-2 md:shadow-sm dark:bg-gray-800/50">
        <input
          value={searchInput}
          onChange={findLocation}
          className="hidden md:inline flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
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
      <div className="flex space-x-4 items-center justify-end text-gray-500 dark:text-gray-400">
        <p className="hidden lg:inline cursor-pointer hover:text-gray-800 dark:hover:text-white transition-colors text-sm font-medium">
          Become a host
        </p>
        <GlobeAltIcon className="h-6 cursor-pointer hover:text-gray-800 dark:hover:text-white transition-colors" />

        {/* Dark / Light toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle dark mode"
          className="h-6 w-6 cursor-pointer hover:text-gray-800 dark:hover:text-white transition-colors focus:outline-none"
        >
          {dark ? (
            <SunIcon className="h-6 w-6 text-amber-400" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>

        <div className="flex items-center space-x-2 border-2 dark:border-gray-600 p-2 rounded-full cursor-pointer hover:shadow-md transition-shadow dark:hover:bg-gray-700">
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
          <div className="flex items-center border-b dark:border-gray-700 mb-4 pb-2 dark:text-white">
            <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
            <UsersIcon className="h-5 mr-2" />
            <input
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
              type="number"
              min={1}
              className="w-12 pl-2 text-lg outline-none text-rose-400 dark:bg-transparent"
            />
          </div>
          <div className="flex pb-2">
            <button
              className="flex-grow text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
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

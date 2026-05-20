import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/router";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  UsersIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";

const LOCATIONS = [
  "New York", "Los Angeles", "Miami", "Chicago", "San Francisco",
  "Austin", "Seattle", "London",
];

function MobileSearchDrawer({ isOpen, onClose }) {
  const router = useRouter();
  const [step, setStep] = useState("where"); // "where" | "dates" | "guests"
  const [input, setInput] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(1);

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = { startDate, endDate, key: "selection" };

  const pickLocation = (city) => {
    setLocation(city);
    setInput(city);
    setStep("dates");
  };

  const search = () => {
    if (!location) return;
    router.push({
      pathname: "/search",
      query: {
        location,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests: guests,
      },
    });
    onClose();
    setStep("where");
    setInput("");
    setLocation("");
  };

  const suggestions = input
    ? LOCATIONS.filter((l) => l.toLowerCase().includes(input.toLowerCase()))
    : LOCATIONS;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[99] bg-black/40"
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[100] bg-white dark:bg-gray-900
                    rounded-t-3xl shadow-2xl
                    transition-transform duration-300 ease-out
                    ${isOpen ? "translate-y-0" : "translate-y-full"}`}
        style={{ maxHeight: "92vh", overflowY: "auto" }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between px-5 py-3 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold dark:text-white">Find your stay</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Step tabs */}
        <div className="flex border-b dark:border-gray-700">
          {["where", "dates", "guests"].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={`flex-1 py-3 text-sm font-medium capitalize transition-colors
                ${step === s
                  ? "border-b-2 border-rose-500 text-rose-500"
                  : "text-gray-500 dark:text-gray-400"}`}
            >
              {s === "where" ? "Where?" : s === "dates" ? "Dates" : "Guests"}
            </button>
          ))}
        </div>

        <div className="px-5 py-4">
          {/* STEP: Where */}
          {step === "where" && (
            <div>
              <div className="relative mb-4">
                <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  autoFocus
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setLocation(e.target.value);
                  }}
                  placeholder="Search destinations…"
                  className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-xl
                             bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white
                             placeholder-gray-400 outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
              <div className="space-y-1">
                {suggestions.map((city) => (
                  <button
                    key={city}
                    onClick={() => pickLocation(city)}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100
                               dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200
                               transition-colors text-sm font-medium"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP: Dates */}
          {step === "dates" && (
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Select your check-in and check-out dates
              </p>
              <div className="overflow-x-auto -mx-5 px-5">
                <DateRangePicker
                  ranges={[selectionRange]}
                  minDate={new Date()}
                  rangeColors={["#f43f5e"]}
                  onChange={handleSelect}
                  months={1}
                  direction="vertical"
                  showMonthAndYearPickers={false}
                />
              </div>
              <button
                onClick={() => setStep("guests")}
                className="w-full mt-4 bg-rose-500 text-white py-3 rounded-xl font-semibold
                           hover:bg-rose-600 active:scale-95 transition-all"
              >
                Next — Guests
              </button>
            </div>
          )}

          {/* STEP: Guests */}
          {step === "guests" && (
            <div>
              <p className="text-sm font-medium dark:text-white mb-6">
                How many guests?
              </p>
              <div className="flex items-center justify-between border dark:border-gray-700 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <UsersIcon className="h-5 w-5" />
                  <span className="font-medium">{guests} guest{guests > 1 ? "s" : ""}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    disabled={guests <= 1}
                    className="h-9 w-9 rounded-full border dark:border-gray-600 flex items-center justify-center
                               hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <MinusIcon className="h-4 w-4 dark:text-white" />
                  </button>
                  <span className="text-xl font-semibold w-6 text-center dark:text-white">
                    {guests}
                  </span>
                  <button
                    onClick={() => setGuests((g) => Math.min(16, g + 1))}
                    disabled={guests >= 16}
                    className="h-9 w-9 rounded-full border dark:border-gray-600 flex items-center justify-center
                               hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <PlusIcon className="h-4 w-4 dark:text-white" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search CTA — always visible */}
        {step !== "dates" && (
          <div className="px-5 pb-8 pt-2">
            <button
              onClick={search}
              disabled={!location}
              className="w-full bg-rose-500 text-white py-4 rounded-2xl font-bold text-base
                         hover:bg-rose-600 active:scale-95 disabled:opacity-40
                         disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              Search
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default MobileSearchDrawer;

import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { differenceInCalendarDays, startOfDay } from "date-fns";
import { XMarkIcon, UserGroupIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { parsePrice, formatUSD } from "../utils/currency";

function BookingModal({
  listing,
  initialStartDate,
  initialEndDate,
  initialGuests,
  onConfirm,
  onClose,
}) {
  const initStart = initialStartDate ? new Date(initialStartDate) : new Date();
  const initEnd = initialEndDate ? new Date(initialEndDate) : new Date();

  const [dateRange, setDateRange] = useState([
    { startDate: initStart, endDate: initEnd, key: "selection" },
  ]);
  const [guests, setGuests] = useState(Number(initialGuests) || 1);

  const maxGuests = parseInt(listing.guests) || 16;
  const pricePerNight = parsePrice(listing.per_night);

  const { startDate, endDate } = dateRange[0];
  const nights = Math.max(1, differenceInCalendarDays(endDate, startDate));
  const computedTotal = pricePerNight * nights;

  return (
    // Outer: p-2 on mobile so the modal gets more width on small screens
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b dark:border-gray-700 flex-shrink-0">
          <div>
            <h3 className="font-semibold text-lg dark:text-white">Modify your stay</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{listing.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          {/* Date picker label */}
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-1 px-4 sm:px-6">
            Select dates
          </p>

          {/*
            No horizontal padding here so the calendar fills the full modal width.
            overflow-x-auto is a safety net for very small screens.
            staticRanges/inputRanges disabled to remove the sidebar + inputs
            that add ~200px of extra width.
          */}
          <div className="overflow-x-auto">
            <DateRangePicker
              ranges={dateRange}
              onChange={(item) => setDateRange([item.selection])}
              minDate={startOfDay(new Date())}
              rangeColors={["#f43f5e"]}
              months={1}
              direction="vertical"
              showMonthAndYearPickers={false}
              staticRanges={[]}
              inputRanges={[]}
            />
          </div>

          {/* Guest stepper + price summary + actions */}
          <div className="px-4 sm:px-6 pb-4 space-y-3">
            {/* Guest stepper */}
            <div className="flex items-center justify-between px-4 py-3 border dark:border-gray-700 rounded-2xl">
              <div className="flex items-center gap-2">
                <UserGroupIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium dark:text-white">Guests</span>
                <span className="text-xs text-gray-400">(max {maxGuests})</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  disabled={guests <= 1}
                  className="p-1 rounded-full border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Remove guest"
                >
                  <MinusIcon className="h-4 w-4 dark:text-white" />
                </button>
                <span className="w-6 text-center font-semibold dark:text-white">{guests}</span>
                <button
                  onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
                  disabled={guests >= maxGuests}
                  className="p-1 rounded-full border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Add guest"
                >
                  <PlusIcon className="h-4 w-4 dark:text-white" />
                </button>
              </div>
            </div>

            {/* Price summary */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>
                  {formatUSD(listing.per_night)} &times; {nights} night{nights !== 1 ? "s" : ""}
                </span>
                <span>{formatUSD(computedTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>{guests} guest{guests !== 1 ? "s" : ""}</span>
              </div>
              <div className="flex justify-between font-semibold dark:text-white border-t dark:border-gray-700 pt-2">
                <span>Total</span>
                <span>{formatUSD(computedTotal)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl border dark:border-gray-600 text-sm font-medium dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirm({ nights, total: computedTotal, startDate, endDate, guests })}
                className="flex-1 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold transition-colors"
              >
                Confirm stay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;

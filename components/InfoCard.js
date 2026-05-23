import Image from "next/image";
import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, StarIcon } from "@heroicons/react/24/solid";
import { formatUSD } from "../utils/currency";

function InfoCard({
  img, location, title, description, star, price, total,
  isActive = false,
  onClick,
  onModify,
  overrideNights,
  overrideTotal,
  overrideDateLabel,
  overrideGuests,
}) {
  const [liked, setLiked] = useState(false);
  const hasOverride = overrideTotal != null;

  return (
    <div
      id={`card-${title?.replace(/\s+/g, "-")}`}
      onClick={onClick}
      className={`
        flex py-7 px-2 pr-4 border-b dark:border-gray-700 cursor-pointer
        hover:shadow-lg dark:hover:shadow-gray-800 transition-all duration-200 ease-out
        first:border-t dark:first:border-gray-700 group
        ${isActive
          ? "ring-2 ring-rose-500 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border-transparent"
          : "hover:opacity-90"}
      `}
    >
      {/* Image */}
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 overflow-hidden rounded-2xl">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 160px, 320px"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked((l) => !l);
            }}
            className="focus:outline-none"
            aria-label="Save to wishlist"
          >
            {liked ? (
              <HeartSolid className="h-7 text-rose-500" />
            ) : (
              <HeartIcon className="h-7 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-rose-400 dark:hover:text-rose-400 transition-colors" />
            )}
          </button>
        </div>

        <h4 className="text-xl font-medium mt-1 dark:text-white">{title}</h4>
        <div className="border-b dark:border-gray-700 w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 dark:text-gray-400 flex-grow">{description}</p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center gap-1 text-sm font-medium dark:text-gray-300">
            <StarIcon className="h-4 text-rose-400" />
            {star}
          </p>

          <div className="text-right">
            <p className="text-lg font-semibold lg:text-2xl dark:text-white">
              {formatUSD(price)}
              <span className="text-sm font-normal text-gray-400 dark:text-gray-500"> / night</span>
            </p>

            {hasOverride ? (
              /* Modified stay summary — shown after user confirms changes in modal */
              <div className="mt-1 space-y-0.5">
                {overrideDateLabel && (
                  <p className="text-xs font-medium text-rose-600 dark:text-rose-400">
                    {overrideDateLabel}
                    {overrideGuests ? ` · ${overrideGuests} guest${overrideGuests !== 1 ? "s" : ""}` : ""}
                  </p>
                )}
                <p className="text-sm font-semibold text-rose-500 dark:text-rose-400">
                  {formatUSD(overrideTotal)} &middot; {overrideNights} night{overrideNights !== 1 ? "s" : ""}
                </p>
              </div>
            ) : (
              <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                {formatUSD(total)} total (incl. taxes &amp; fees)
              </p>
            )}

            {onModify && (
              <button
                onClick={(e) => { e.stopPropagation(); onModify(); }}
                className="mt-1 text-xs text-rose-500 hover:text-rose-600 font-medium underline underline-offset-2 transition-colors"
              >
                {hasOverride ? "Edit stay" : "Modify stay"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;

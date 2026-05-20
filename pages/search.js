import { useRouter } from "next/router";
import React, { useState } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import { CITY_DATA } from "../data/citySearchData";
import { MapIcon, ListBulletIcon, XMarkIcon } from "@heroicons/react/24/solid";

function Search({ searchResults, searchLocation }) {
	const router = useRouter();
	const { location, startDate, endDate, noOfGuests } = router.query;
	const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
	const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
	const range = `${formattedStartDate} - ${formattedEndDate}`;
	const displayCity = location === "Unknown" ? searchLocation : location;

	// ── Shared active-location state ─────────────────────────────────────────
	const [activeLocation, setActiveLocation] = useState(null);
	// ── Mobile map toggle ─────────────────────────────────────────────────────
	const [showMobileMap, setShowMobileMap] = useState(false);

	// List card clicked → map will flyTo via Map.js useEffect
	const handleListingClick = (listing) => {
		setActiveLocation((prev) =>
			prev?.name === listing.name ? null : listing
		);
	};

	// Map pin clicked → highlight card + scroll it into view on desktop
	const handlePinSelect = (listing) => {
		setActiveLocation(listing);
		if (!listing) return;
		// Small delay so the ring renders before scrollIntoView
		setTimeout(() => {
			const id = `card-${listing.name.replace(/\s+/g, "-")}`;
			document.getElementById(id)?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}, 50);
	};

	// From mobile bottom-sheet "View in list →"
	const handleViewInList = () => {
		setShowMobileMap(false);
		setTimeout(() => {
			if (!activeLocation) return;
			const id = `card-${activeLocation.name.replace(/\s+/g, "-")}`;
			document.getElementById(id)?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}, 120);
	};

	return (
		<div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
			<Head>
				<title>{`${displayCity} Stays — StayFinder Demo`}</title>
			</Head>
			<Header placeholder={`${displayCity} | ${range} | ${noOfGuests} guests`} />

			<main className="flex relative">
				{/* ── Results list ─────────────────────────────────────────────── */}
				<section
					className={`
						${showMobileMap ? "hidden xl:block" : "block"}
						flex-grow pt-14 px-6 pb-24
					`}
				>
					<p className="text-xs text-gray-500 dark:text-gray-400">
						{searchResults.length} Stays · {range} · {noOfGuests} guest{noOfGuests > 1 ? "s" : ""}
					</p>
					<h1 className="text-3xl font-semibold mt-2 mb-6 dark:text-white">
						{location === "Unknown"
							? `How about exploring ${searchLocation}?`
							: `Stays in ${location}`}
					</h1>

					{/* Filter pills */}
					<div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 dark:text-gray-300 whitespace-nowrap">
						<p className="button">Cancellation Flexibility</p>
						<p className="button">Type of Place</p>
						<p className="button">Price</p>
						<p className="button">Rooms and Beds</p>
						<p className="button">More filters</p>
					</div>

					<div className="flex flex-col">
						{searchResults?.map((listing) => {
							const { img, message, name, guests, beds, baths, amenities, rating, price, per_night } = listing;
							return (
								<InfoCard
									key={`${name}-${per_night}`}
									img={img}
									location={message}
									title={name}
									description={`${guests} · ${beds} · ${baths} · ${amenities.join(" · ")}`}
									star={rating}
									price={per_night}
									total={price}
									isActive={activeLocation?.name === name}
									onClick={() => handleListingClick(listing)}
								/>
							);
						})}
					</div>
				</section>

				{/* ── Map — desktop: sticky side panel; mobile: full-screen overlay ── */}
				<section
					className={`
						${showMobileMap
							? "flex fixed inset-x-0 bottom-0 z-40"
							: "hidden xl:inline-flex xl:min-w-[40%]"}
						xl:relative xl:flex xl:min-w-[40%]
						xl:sticky xl:top-[76px] xl:h-[calc(100vh-76px)]
						${showMobileMap ? "top-[76px]" : ""}
					`}
					style={showMobileMap ? { top: "76px", height: "calc(100vh - 76px)" } : {}}
				>
					<Map
						searchResults={searchResults}
						activeLocation={activeLocation}
						onSelect={handlePinSelect}
					/>
				</section>
			</main>

			{/* ── Mobile: floating Map / List toggle pill ─────────────────────── */}
			<div className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
				<button
					onClick={() => {
						setShowMobileMap((v) => !v);
						// Returning to list — clear pin so bottom sheet dismisses
						if (showMobileMap) setActiveLocation(null);
					}}
					className="flex items-center gap-2 bg-gray-900 dark:bg-white
                     text-white dark:text-gray-900 px-6 py-3 rounded-full
                     shadow-2xl font-semibold text-sm active:scale-95 transition-transform"
				>
					{showMobileMap ? (
						<><ListBulletIcon className="h-4 w-4" /> List</>
					) : (
						<><MapIcon className="h-4 w-4" /> Map</>
					)}
				</button>
			</div>

			{/* ── Mobile: bottom-sheet when a pin is tapped on the map ─────────── */}
			{showMobileMap && activeLocation && (
				<div
					className="xl:hidden fixed bottom-20 left-4 right-4 z-50
                    bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4
                    animate-in slide-in-from-bottom-4 duration-200"
				>
					<div className="flex justify-between items-start">
						<div className="flex-grow pr-2">
							<p className="font-semibold dark:text-white leading-tight">
								{activeLocation.name}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
								{activeLocation.message}
							</p>
							<p className="text-rose-500 font-bold text-sm mt-1">
								{activeLocation.per_night} / night
							</p>
						</div>
						<button
							onClick={() => setActiveLocation(null)}
							className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
							aria-label="Dismiss"
						>
							<XMarkIcon className="h-5 w-5 text-gray-400" />
						</button>
					</div>
					<button
						onClick={handleViewInList}
						className="mt-3 w-full text-center text-sm text-rose-500 font-semibold
                       border border-rose-200 dark:border-rose-800 rounded-xl py-2
                       hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
					>
						View in list →
					</button>
				</div>
			)}

			<Footer />
		</div>
	);
}

export default Search;

// ─── Server-side data resolution ──────────────────────────────────────────────

export async function getServerSideProps(context) {
	const { location } = context.query;

	const HOME_CITY = "Los Angeles";
	let searchLocation = location;
	if (!location || location === "Unknown") {
		searchLocation = HOME_CITY;
	}

	if (CITY_DATA[searchLocation]) {
		return {
			props: {
				searchResults: CITY_DATA[searchLocation],
				searchLocation,
			},
		};
	}

	try {
		const LEGACY_APIS = {
			London:     "https://www.jsonkeeper.com/b/6S0I",
			Dubai:      "https://www.jsonkeeper.com/b/UHI7",
			Paris:      "https://www.jsonkeeper.com/b/C979",
			Manchester: "https://www.jsonkeeper.com/b/MQRL",
		};
		const url = LEGACY_APIS[searchLocation];
		if (url) {
			const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
			if (res.ok) {
				const data = await res.json();
				return { props: { searchResults: data, searchLocation } };
			}
		}
	} catch { /* fall through */ }

	return {
		props: {
			searchResults: CITY_DATA["Los Angeles"],
			searchLocation: "Los Angeles",
		},
	};
}

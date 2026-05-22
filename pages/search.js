import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import BookingModal from "../components/BookingModal";
import FilterDropdown from "../components/FilterDropdown";
import { CITY_DATA } from "../data/citySearchData";
import { parsePrice } from "../utils/currency";
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

	// ── Feature 1: booking modifier modal ────────────────────────────────────
	const [selectedListing, setSelectedListing] = useState(null);
	const [bookingOverrides, setBookingOverrides] = useState({});

	// ── Feature 2: filter pills ───────────────────────────────────────────────
	const [filters, setFilters] = useState({
		minPrice: "",
		maxPrice: "",
		minBeds: 0,
		minRating: 0,
		sortBy: null, // 'price_asc' | 'rating_desc'
	});
	const [activeFilter, setActiveFilter] = useState(null); // 'price' | 'beds' | 'rating'

	const hasActiveFilters =
		filters.minPrice !== "" ||
		filters.maxPrice !== "" ||
		filters.minBeds > 0 ||
		filters.minRating > 0 ||
		filters.sortBy !== null;

	const clearAllFilters = () => {
		setFilters({ minPrice: "", maxPrice: "", minBeds: 0, minRating: 0, sortBy: null });
		setActiveFilter(null);
	};

	const toggleSort = (sortValue) => {
		setFilters((f) => ({ ...f, sortBy: f.sortBy === sortValue ? null : sortValue }));
	};

	// ── Derived filtered + sorted results ────────────────────────────────────
	const filteredResults = useMemo(() => {
		let results = [...searchResults];

		const minP = filters.minPrice !== "" ? Number(filters.minPrice) : 0;
		const maxP = filters.maxPrice !== "" ? Number(filters.maxPrice) : Infinity;

		if (minP > 0) results = results.filter((r) => parsePrice(r.per_night) >= minP);
		if (maxP < Infinity) results = results.filter((r) => parsePrice(r.per_night) <= maxP);
		if (filters.minBeds > 0) results = results.filter((r) => parseInt(r.beds) >= filters.minBeds);
		if (filters.minRating > 0) results = results.filter((r) => r.rating >= filters.minRating);

		if (filters.sortBy === "price_asc") {
			results = [...results].sort((a, b) => parsePrice(a.per_night) - parsePrice(b.per_night));
		} else if (filters.sortBy === "rating_desc") {
			results = [...results].sort((a, b) => b.rating - a.rating);
		}

		return results;
	}, [searchResults, filters]);

	// ── Interaction handlers ──────────────────────────────────────────────────
	const handleListingClick = (listing) => {
		setActiveLocation((prev) => (prev?.name === listing.name ? null : listing));
	};

	const handlePinSelect = (listing) => {
		setActiveLocation(listing);
		if (!listing) return;
		setTimeout(() => {
			const id = `card-${listing.name.replace(/\s+/g, "-")}`;
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
		}, 50);
	};

	const handleViewInList = () => {
		setShowMobileMap(false);
		setTimeout(() => {
			if (!activeLocation) return;
			const id = `card-${activeLocation.name.replace(/\s+/g, "-")}`;
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
		}, 120);
	};

	const handleBookingConfirm = ({ nights, total }) => {
		setBookingOverrides((prev) => ({
			...prev,
			[selectedListing.name]: { nights, total },
		}));
		setSelectedListing(null);
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
						{filteredResults.length} Stays{hasActiveFilters ? ` (filtered from ${searchResults.length})` : ""} &middot; {range} &middot; {noOfGuests} guest{noOfGuests > 1 ? "s" : ""}
					</p>
					<h1 className="text-3xl font-semibold mt-2 mb-6 dark:text-white">
						{location === "Unknown"
							? `How about exploring ${searchLocation}?`
							: `Stays in ${location}`}
					</h1>

					{/* ── Filter pills ─────────────────────────────────────────── */}
					<div className="hidden lg:flex mb-5 gap-3 text-gray-800 dark:text-gray-300 flex-wrap items-center">
						{/* Cancellation Flexibility — sort by highest rated */}
						<button
							onClick={() => toggleSort("rating_desc")}
							className={`button ${filters.sortBy === "rating_desc" ? "button-active" : ""}`}
						>
							Cancellation Flexibility
						</button>

						{/* Type of Place — sort by price low→high */}
						<button
							onClick={() => toggleSort("price_asc")}
							className={`button ${filters.sortBy === "price_asc" ? "button-active" : ""}`}
						>
							Type of Place
						</button>

						{/* Price — range dropdown */}
						<div className="relative">
							<button
								onClick={() => setActiveFilter(activeFilter === "price" ? null : "price")}
								className={`button ${filters.minPrice !== "" || filters.maxPrice !== "" ? "button-active" : ""}`}
							>
								Price
							</button>
							{activeFilter === "price" && (
								<FilterDropdown onClose={() => setActiveFilter(null)}>
									<p className="text-sm font-semibold dark:text-white mb-3">Price per night</p>
									<div className="flex gap-3">
										<div className="flex-1">
											<label className="text-xs text-gray-500 dark:text-gray-400">Min $</label>
											<input
												type="number"
												placeholder="0"
												value={filters.minPrice}
												onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
												className="w-full mt-1 px-3 py-2 border dark:border-gray-600 rounded-xl text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
											/>
										</div>
										<div className="flex-1">
											<label className="text-xs text-gray-500 dark:text-gray-400">Max $</label>
											<input
												type="number"
												placeholder="Any"
												value={filters.maxPrice}
												onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
												className="w-full mt-1 px-3 py-2 border dark:border-gray-600 rounded-xl text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
											/>
										</div>
									</div>
									<button
										onClick={() => { setFilters((f) => ({ ...f, minPrice: "", maxPrice: "" })); setActiveFilter(null); }}
										className="mt-3 text-xs text-rose-500 hover:text-rose-600 font-medium"
									>
										Clear
									</button>
								</FilterDropdown>
							)}
						</div>

						{/* Rooms and Beds — min beds dropdown */}
						<div className="relative">
							<button
								onClick={() => setActiveFilter(activeFilter === "beds" ? null : "beds")}
								className={`button ${filters.minBeds > 0 ? "button-active" : ""}`}
							>
								Rooms and Beds
							</button>
							{activeFilter === "beds" && (
								<FilterDropdown onClose={() => setActiveFilter(null)}>
									<p className="text-sm font-semibold dark:text-white mb-3">Minimum beds</p>
									<div className="flex gap-2">
										{[0, 1, 2, 3].map((n) => (
											<button
												key={n}
												onClick={() => setFilters((f) => ({ ...f, minBeds: n }))}
												className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-colors
													${filters.minBeds === n
														? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900"
														: "border-gray-200 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
											>
												{n === 0 ? "Any" : `${n}+`}
											</button>
										))}
									</div>
								</FilterDropdown>
							)}
						</div>

						{/* More filters — minimum rating dropdown */}
						<div className="relative">
							<button
								onClick={() => setActiveFilter(activeFilter === "rating" ? null : "rating")}
								className={`button ${filters.minRating > 0 ? "button-active" : ""}`}
							>
								More filters
							</button>
							{activeFilter === "rating" && (
								<FilterDropdown onClose={() => setActiveFilter(null)}>
									<p className="text-sm font-semibold dark:text-white mb-3">Minimum rating</p>
									<div className="flex gap-2">
										{[0, 4, 4.5, 4.8].map((n) => (
											<button
												key={n}
												onClick={() => setFilters((f) => ({ ...f, minRating: n }))}
												className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-colors
													${filters.minRating === n
														? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900"
														: "border-gray-200 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
											>
												{n === 0 ? "Any" : `${n}+`}
											</button>
										))}
									</div>
								</FilterDropdown>
							)}
						</div>

						{/* Clear all */}
						{hasActiveFilters && (
							<button
								onClick={clearAllFilters}
								className="text-xs text-rose-500 hover:text-rose-600 font-medium underline underline-offset-2 transition-colors"
							>
								Clear all
							</button>
						)}
					</div>

					{/* ── Listing cards ─────────────────────────────────────────── */}
					<div className="flex flex-col">
						{filteredResults.length === 0 ? (
							<div className="py-16 text-center">
								<p className="text-gray-500 dark:text-gray-400 text-lg">No stays match your filters.</p>
								<button
									onClick={clearAllFilters}
									className="mt-3 text-rose-500 hover:text-rose-600 font-medium text-sm underline underline-offset-2"
								>
									Clear filters
								</button>
							</div>
						) : (
							filteredResults.map((listing) => {
								const { img, message, name, guests, beds, baths, amenities, rating, price, per_night } = listing;
								const override = bookingOverrides[name];
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
										onModify={() => setSelectedListing(listing)}
										overrideNights={override?.nights}
										overrideTotal={override?.total}
									/>
								);
							})
						)}
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
						searchResults={filteredResults}
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

			{/* ── Feature 1: Booking modifier modal ────────────────────────────── */}
			{selectedListing && (
				<BookingModal
					listing={selectedListing}
					initialStartDate={startDate}
					initialEndDate={endDate}
					initialGuests={noOfGuests}
					onConfirm={handleBookingConfirm}
					onClose={() => setSelectedListing(null)}
				/>
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

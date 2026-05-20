import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import { CITY_DATA } from "../data/citySearchData";

function Search({ searchResults, searchLocation }) {
	const router = useRouter();
	const { location, startDate, endDate, noOfGuests } = router.query;
	const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
	const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
	const range = `${formattedStartDate} - ${formattedEndDate}`;
	const displayCity = location === "Unknown" ? searchLocation : location;

	return (
		<div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
			<Head>
				<title>{`${displayCity} Stays — StayFinder Demo`}</title>
			</Head>
			<Header
				placeholder={`${displayCity} | ${range} | ${noOfGuests} guests`}
			/>
			<main className="flex">
				<section className="flex-grow pt-14 px-6">
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
						{searchResults?.map(({ img, message, name, guests, beds, baths, amenities, rating, price, per_night }) => (
							<InfoCard
								key={`${name}-${per_night}`}
								img={img}
								location={message}
								title={name}
								description={`${guests} · ${beds} · ${baths} · ${amenities.join(" · ")}`}
								star={rating}
								price={per_night}
								total={price}
							/>
						))}
					</div>
				</section>

				{/* Map — desktop only */}
				<section className="hidden xl:inline-flex xl:min-w-[40%] sticky top-[76px] h-[calc(100vh-76px)]">
					<Map searchResults={searchResults} />
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default Search;

// ─── Server-side data resolution ──────────────────────────────────────────────

export async function getServerSideProps(context) {
	const { location } = context.query;

	// Resolve city — "Unknown" picks a random supported city
	const supported = Object.keys(CITY_DATA);
	let searchLocation = location;
	if (!location || location === "Unknown") {
		searchLocation = supported[Math.floor(Math.random() * supported.length)];
	}

	// If we have curated data for this city, use it directly — no API needed
	if (CITY_DATA[searchLocation]) {
		return {
			props: {
				searchResults: CITY_DATA[searchLocation],
				searchLocation,
			},
		};
	}

	// Fallback: try the jsonkeeper API for legacy UK cities; default to New York
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
			searchResults: CITY_DATA["New York"],
			searchLocation: "New York",
		},
	};
}

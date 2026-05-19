import { useRouter } from "next/router";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({ searchResults, searchLocation }) {
	const router = useRouter();
	const { location, startDate, endDate, noOfGuests } = router.query;
	const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
	const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
	const range = `${formattedStartDate} - ${formattedEndDate}`;

	return (
		<div>
			<Header
				placeholder={`${location === "Unknown" ? searchLocation : location} | ${range} | ${noOfGuests} guests`}
			/>
			<main className="flex">
				<section className="flex-grow pt-14 px-6">
					<p className="text-xs text-gray-500">
						{searchResults.length} Stays · {range} · {noOfGuests} guests
					</p>
					<h1 className="text-3xl font-semibold mt-2 mb-6">
						{location === "Unknown"
							? `Sorry, we couldn't find matches. How about ${searchLocation}?`
							: `Stays in ${location}`}
					</h1>
					<div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
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
				<section className="hidden xl:inline-flex xl:min-w-[40%] sticky top-[76px] h-[calc(100vh-76px)]">
					<Map searchResults={searchResults} />
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default Search;

// ---------------------------------------------------------------------------
// Reliable Unsplash property images (cycled across listings)
// ---------------------------------------------------------------------------
const PROPERTY_IMGS = [
	"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
	"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
	"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
	"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
	"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
	"https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&q=80",
	"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
	"https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
];

// Hardcoded fallback listings per US city (used when API is unreachable)
const CITY_FALLBACKS = {
	"New York": [
		{ name: "Modern Loft in SoHo", message: "SoHo, New York", guests: "2 guests", beds: "1 bed", baths: "1 bath", amenities: ["Wifi", "Kitchen", "AC"], rating: 4.9, per_night: "$185", price: "$925 5 nights", lat: 40.723, long: -74.003 },
		{ name: "Brooklyn Brownstone", message: "Brooklyn, New York", guests: "4 guests", beds: "2 beds", baths: "1 bath", amenities: ["Wifi", "Washer", "Gym"], rating: 4.7, per_night: "$210", price: "$1,050 5 nights", lat: 40.678, long: -73.944 },
		{ name: "Manhattan Penthouse Studio", message: "Midtown, New York", guests: "2 guests", beds: "1 bed", baths: "1 bath", amenities: ["Wifi", "Doorman", "City views"], rating: 4.8, per_night: "$320", price: "$1,600 5 nights", lat: 40.754, long: -73.984 },
		{ name: "Cozy Upper West Side Apt", message: "Upper West Side, New York", guests: "3 guests", beds: "2 beds", baths: "1 bath", amenities: ["Wifi", "Kitchen", "Park views"], rating: 4.6, per_night: "$160", price: "$800 5 nights", lat: 40.787, long: -73.975 },
	],
	"Miami": [
		{ name: "South Beach Art Deco Suite", message: "South Beach, Miami", guests: "2 guests", beds: "1 bed", baths: "1 bath", amenities: ["Wifi", "Pool", "Beach access"], rating: 4.9, per_night: "$220", price: "$1,100 5 nights", lat: 25.780, long: -80.130 },
		{ name: "Brickell Luxury Condo", message: "Brickell, Miami", guests: "4 guests", beds: "2 beds", baths: "2 baths", amenities: ["Wifi", "Gym", "Rooftop pool"], rating: 4.8, per_night: "$295", price: "$1,475 5 nights", lat: 25.758, long: -80.195 },
		{ name: "Wynwood Loft", message: "Wynwood, Miami", guests: "2 guests", beds: "1 bed", baths: "1 bath", amenities: ["Wifi", "Kitchen", "Patio"], rating: 4.7, per_night: "$165", price: "$825 5 nights", lat: 25.800, long: -80.200 },
	],
	"Los Angeles": [
		{ name: "Hollywood Hills Villa", message: "Hollywood Hills, LA", guests: "6 guests", beds: "3 beds", baths: "2 baths", amenities: ["Wifi", "Pool", "City views"], rating: 4.9, per_night: "$450", price: "$2,250 5 nights", lat: 34.112, long: -118.335 },
		{ name: "Venice Beach Bungalow", message: "Venice, Los Angeles", guests: "4 guests", beds: "2 beds", baths: "1 bath", amenities: ["Wifi", "Beach access", "Bikes"], rating: 4.8, per_night: "$280", price: "$1,400 5 nights", lat: 33.985, long: -118.473 },
		{ name: "Silver Lake Modern Home", message: "Silver Lake, Los Angeles", guests: "4 guests", beds: "2 beds", baths: "2 baths", amenities: ["Wifi", "Pool", "Parking"], rating: 4.7, per_night: "$230", price: "$1,150 5 nights", lat: 34.087, long: -118.270 },
	],
	"Chicago": [
		{ name: "River North Designer Apt", message: "River North, Chicago", guests: "2 guests", beds: "1 bed", baths: "1 bath", amenities: ["Wifi", "Gym", "Doorman"], rating: 4.8, per_night: "$175", price: "$875 5 nights", lat: 41.892, long: -87.635 },
		{ name: "Lincoln Park Townhouse", message: "Lincoln Park, Chicago", guests: "5 guests", beds: "3 beds", baths: "2 baths", amenities: ["Wifi", "Parking", "Fireplace"], rating: 4.7, per_night: "$260", price: "$1,300 5 nights", lat: 41.924, long: -87.640 },
	],
	"San Francisco": [
		{ name: "Pacific Heights Victorian", message: "Pacific Heights, SF", guests: "4 guests", beds: "2 beds", baths: "1 bath", amenities: ["Wifi", "Kitchen", "Bay views"], rating: 4.9, per_night: "$310", price: "$1,550 5 nights", lat: 37.792, long: -122.436 },
		{ name: "SOMA Tech-Forward Loft", message: "SoMa, San Francisco", guests: "2 guests", beds: "1 bed", baths: "1 bath", amenities: ["Wifi", "Rooftop", "EV charger"], rating: 4.7, per_night: "$195", price: "$975 5 nights", lat: 37.778, long: -122.406 },
	],
	"Austin": [
		{ name: "East Austin Bungalow", message: "East Austin, TX", guests: "4 guests", beds: "2 beds", baths: "1 bath", amenities: ["Wifi", "BBQ", "Yard"], rating: 4.8, per_night: "$175", price: "$875 5 nights", lat: 30.260, long: -97.720 },
		{ name: "Downtown Luxury Studio", message: "Downtown Austin, TX", guests: "2 guests", beds: "1 bed", baths: "1 bath", amenities: ["Wifi", "Pool", "Gym"], rating: 4.7, per_night: "$210", price: "$1,050 5 nights", lat: 30.267, long: -97.743 },
	],
	"Nashville": [
		{ name: "The Gulch Modern Flat", message: "The Gulch, Nashville", guests: "2 guests", beds: "1 bed", baths: "1 bath", amenities: ["Wifi", "Rooftop", "Gym"], rating: 4.8, per_night: "$195", price: "$975 5 nights", lat: 36.149, long: -86.789 },
		{ name: "East Nashville Craftsman", message: "East Nashville, TN", guests: "6 guests", beds: "3 beds", baths: "2 baths", amenities: ["Wifi", "Yard", "Fire pit"], rating: 4.9, per_night: "$280", price: "$1,400 5 nights", lat: 36.175, long: -86.760 },
	],
	"Seattle": [
		{ name: "Capitol Hill Townhome", message: "Capitol Hill, Seattle", guests: "4 guests", beds: "2 beds", baths: "2 baths", amenities: ["Wifi", "Parking", "Mountain views"], rating: 4.8, per_night: "$225", price: "$1,125 5 nights", lat: 47.623, long: -122.319 },
		{ name: "Ballard Waterfront Studio", message: "Ballard, Seattle", guests: "2 guests", beds: "1 bed", baths: "1 bath", amenities: ["Wifi", "Water views", "Kayaks"], rating: 4.7, per_night: "$180", price: "$900 5 nights", lat: 47.668, long: -122.385 },
	],
};

function withUnsplashImages(results) {
	return results.map((item, i) => ({
		...item,
		img: PROPERTY_IMGS[i % PROPERTY_IMGS.length],
	}));
}

async function fetchResults(url, fallback) {
	try {
		const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
		if (!res.ok) return fallback;
		const data = await res.json();
		// Keep API data (coords, names, prices) but swap in reliable images
		return withUnsplashImages(data);
	} catch {
		return fallback;
	}
}

// jsonkeeper endpoint map (original project endpoints)
const LOCATION_APIS = {
	"New York": "https://www.jsonkeeper.com/b/OVTA",
	"London": "https://www.jsonkeeper.com/b/6S0I",
	"Dubai": "https://www.jsonkeeper.com/b/UHI7",
	"Paris": "https://www.jsonkeeper.com/b/C979",
	"Manchester": "https://www.jsonkeeper.com/b/MQRL",
	"Liverpool": "https://www.jsonkeeper.com/b/N9BA",
	"York": "https://www.jsonkeeper.com/b/B065",
	"Cardiff": "https://www.jsonkeeper.com/b/9NJS",
	"Birkenhead": "https://www.jsonkeeper.com/b/FWMV",
	"Newquay": "https://www.jsonkeeper.com/b/6R6B",
	"Hove": "https://www.jsonkeeper.com/b/UTSF",
};

export async function getServerSideProps(context) {
	const { location } = context.query;

	// Resolve actual city name
	let searchLocation = location;
	if (location === "Unknown") {
		const cities = Object.keys(CITY_FALLBACKS);
		searchLocation = cities[Math.floor(Math.random() * cities.length)];
	}

	const fallback = withUnsplashImages(
		CITY_FALLBACKS[searchLocation] ??
		CITY_FALLBACKS["New York"]
	);

	const apiUrl = LOCATION_APIS[searchLocation];
	const searchResults = apiUrl
		? await fetchResults(apiUrl, fallback)
		: fallback;

	return {
		props: { searchResults, searchLocation },
	};
}

import { useRouter } from "next/dist/client/router";
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
				placeholder={`${location === "Unknown" ? searchLocation : location
					} | ${range} | ${noOfGuests} guests`}
			/>
			<main className="flex">
				<section className="flex-grow pt-14 px-6">
					<p className="text-xs">
						{searchResults.length} Stays - {range} - {noOfGuests} guests
					</p>
					<h1 className="text-3xl font-semibold mt-2 mb-6">
						{location === "Unknown"
							? `Sorry, we couldn't find any matches. How about ${searchLocation}?`
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
						{searchResults?.map(
							({
								img,
								message,
								name,
								guests,
								beds,
								baths,
								amenities,
								rating,
								price,
								per_night,
							}) => (
								<InfoCard
									key={img}
									img={img}
									location={message}
									title={name}
									description={`${guests} · ${beds} · ${baths} · ${amenities
										.map((amenity) => amenity)
										.join(" · ")}`}
									star={rating}
									price={per_night}
									total={price}
								/>
							)
						)}
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

// export async function getServerSideProps() {
// 	const searchResults = await fetch('https://links.papareact.com/isz').then
// 		((res) => res.json()
// 		);
// 	return {
// 		props: {
// 			searchResults
// 		},
// 	};
// }

export async function getServerSideProps(context) {
	const { location } = context.query;
	var searchLocation = "";
	var searchResults = "";
	if (location === "Unknown") {
		const locations = [
			"London",
			"New York",
			"Dubai",
			"Paris",
			"Manchester",
			"Liverpool",
			"York",
			"Cardiff",
			"Birkenhead",
			"Newquay",
			"Hove",
		];
		searchLocation = locations[Math.floor(Math.random() * locations.length)];
	} else {
		searchLocation = location;
	}
	if (searchLocation === "New York") {
		searchResults = await fetch("https://www.jsonkeeper.com/b/OVTA").then(
			(res) => res.json()
		);
	} else if (searchLocation === "London") {
		searchResults = await fetch("https://www.jsonkeeper.com/b/6S0I").then(
			(res) => res.json()
		);
	} else if (searchLocation === "Dubai") {
		searchResults = await fetch("https://www.jsonkeeper.com/b/UHI7").then(
			(res) => res.json()
		);
	} else if (searchLocation === "Paris") {
		searchResults = await fetch("https://www.jsonkeeper.com/b/C979").then(
			(res) => res.json()
		);
	} else if (searchLocation === "Manchester") {
		searchResults = await fetch("https://www.jsonkeeper.com/b/MQRL").then(
			(res) => res.json()
		);
	} else if (searchLocation === "Liverpool") {
		searchResults = await fetch("https://www.jsonkeeper.com/b/N9BA").then(
			(res) => res.json()
		);
	} else if (searchLocation === "York") {
		searchResults = await fetch("https://www.jsonkeeper.com/b/B065").then(
			(res) => res.json()
		);
	} else if (searchLocation === "Cardiff") {
		searchResults = await fetch("https://www.jsonkeeper.com/b/9NJS").then(
			(res) => res.json()
		);
	} else if (searchLocation === "Birkenhead") {
		searchResults = await fetch("https://www.jsonkeeper.com/b/FWMV").then(
			(res) => res.json()
		);
	} else if (searchLocation === "Newquay") {
		searchResults = await fetch("https://www.jsonkeeper.com/b/6R6B").then(
			(res) => res.json()
		);
	} else if (searchLocation === "Hove") {
		searchResults = await fetch("https://www.jsonkeeper.com/b/UTSF").then(
			(res) => res.json()
		);
	} else {
		searchResults = await fetch("https://www.jsonkeeper.com/b/6S0I").then(
			(res) => res.json()
		);
	}

	return {
		props: {
			searchResults,
			searchLocation,
		},
	};
}

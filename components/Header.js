/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
	MagnifyingGlassIcon,
	GlobeAltIcon,
	Bars3Icon,
	UserCircleIcon,
	UsersIcon,
} from "@heroicons/react/24/solid";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

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

	const resetInput = () => {
		setSearchInput("");
	};

	const search = () => {
		if (searchInput !== "") {
			router.push({
				pathname: "/search",
				query: {
					location: location,
					startDate: startDate.toISOString(),
					endDate: endDate.toISOString(),
					noOfGuests,
				},
			});
			setSearchInput("");
		}
	};

	const selectionRange = {
		startDate: startDate,
		endDate: endDate,
		key: "selection",
	};

	const findLocation = (e) => {
		setSearchInput(e.target.value);
		setLocation("Unknown");
		if ("new york".includes(e.target.value.toLowerCase())) {
			setLocation("New York");
		}
		if ("london".includes(e.target.value.toLowerCase())) {
			setLocation("London");
		}
		if ("dubai".includes(e.target.value.toLowerCase())) {
			setLocation("Dubai");
		}
		if ("paris".includes(e.target.value.toLowerCase())) {
			setLocation("Paris");
		}
		if ("manchester".includes(e.target.value.toLowerCase())) {
			setLocation("Manchester");
		}
		if ("liverpool".includes(e.target.value.toLowerCase())) {
			setLocation("Liverpool");
		}
		if ("york".includes(e.target.value.toLowerCase())) {
			setLocation("York");
		}
		if ("cardiff".includes(e.target.value.toLowerCase())) {
			setLocation("Cardiff");
		}
		if ("birkenhead".includes(e.target.value.toLowerCase())) {
			setLocation("Birkenhead");
		}
		if ("newquay".includes(e.target.value.toLowerCase())) {
			setLocation("Newquay");
		}
		if ("hove".includes(e.target.value.toLowerCase())) {
			setLocation("Hove");
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			search();
		}
	};

	return (
		<header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-3 md:px-10">
			{/* left - Logo */}
			<div
				onClick={() => router.push("/")}
				className="relative flex items-center h-10 cursor-pointer my-auto"
			>
				<Image
					src="https://links.papareact.com/qd3"
					layout="fill"
					objectFit="contain"
					objectPosition="left"
				/>
			</div>

			{/* middle - Search */}
			<div className="flex items-center min-w-[230px] md:border-2 rounded-full py-2 md:shadow-sm">
				<input
					value={searchInput}
					onChange={(e) => findLocation(e)}
					className="hidden md:inline flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
					type="text"
					placeholder={
						placeholder || "Search London, New York, Dubai or Paris..."
					}
					onKeyDown={handleKeyDown}
				/>
				<MagnifyingGlassIcon
					onClick={search}
					className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"
				/>
			</div>

			{/* right - Become a host + Icons */}
			<div className="flex space-x-4 items-center justify-end text-gray-500">
				<p className="hidden lg:inline cursor-pointer">Become a host</p>
				<GlobeAltIcon className="h-6 cursor-pointer" />
				<div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer">
					<Bars3Icon className="h-6" />
					<UserCircleIcon className="h-6" />
				</div>
			</div>
			{searchInput && (
				<div className="flex flex-col col-span-3 mx-auto">
					<DateRangePicker
						ranges={[selectionRange]}
						minDate={new Date()}
						rangeColors={["#FD5B61"]}
						onChange={handleSelect}
					/>
					<div className="flex items-center border-b mb-4">
						<h2 className="text-2xl flex-grow font-semibold">
							Number of Guests
						</h2>
						<UsersIcon className="h-5" />
						<input
							value={noOfGuests}
							onChange={(e) => setNoOfGuests(e.target.value)}
							type="number"
							min={1}
							className="w-12 pl-2 text-lg outline-none text-red-400"
						/>
					</div>
					<div className="flex">
						<button className="flex-grow text-gray-500" onClick={resetInput}>
							Cancel
						</button>
						<button onClick={search} className="flex-grow text-red-400">
							Search
						</button>
					</div>
				</div>
			)}
		</header>
	);
}

export default Header;

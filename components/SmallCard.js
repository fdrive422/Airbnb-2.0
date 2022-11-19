import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function SmallCard({ img, location, distance }) {
	const router = useRouter();
	const search = () => {
		router.push({
			pathname: "/search",
			query: {
				location: location,
				startDate: new Date().toISOString(),
				endDate: new Date().toISOString(),
				noOfGuests: 1,
			},
		});
	};
	return (
		<div
			onClick={search}
			className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
			{/* left */}
			<div className="relative h-16 w-16">
				<Image src={img} alt="" layout="fill" className="rounded-lg" />
			</div>
			{/* right */}
			<div>
				<h2>{location}</h2>
				<h3 className='text-gray-500'>{distance}</h3>
			</div>
		</div>
	);
}

export default SmallCard;

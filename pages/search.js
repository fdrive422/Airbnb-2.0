import { useRouter } from "next/router";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from 'date-fns';

function Search() {
	const router = useRouter();
	const { location, startDate, endDate, noOfGuests } = router.query;
	const formattedStartDate = format(new Date(startDate), 'dd MMM yy');
	const formattedEndDate = format(new Date(endDate), 'dd MMM yy');
	const range = `${formattedStartDate} through ${formattedEndDate}`;

	return (
		<div className='h-screen'>
			<Header />

			<main className='flex'>
				<section className='flex-grow pt-14 px-6'>
					<p className='text-xs'>300+ Stays - {range} - {noOfGuests} guests</p>
					<h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>

					<div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
						<p className='button'>Cancellation Flexiblity</p>
						<p className='button'>Type of Place</p>
						<p className='button'>Price</p>
						<p className='button'>Rooms and Beds</p>
						<p className='button'>More Filters</p>
					</div>
				</section>

			</main>

			<Footer />
		</div>
	);
}

export default Search;

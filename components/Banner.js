import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

function Banner() {
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
	const location = locations[Math.floor(Math.random() * locations.length)];
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
		<div className='relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]'>
			<Image
				src='https://links.papareact.com/0fm'
				alt=''
				layout='fill'
				objectFit='cover'
				objectPosition='50% bottom'
			/>
			<div className='absolute top-1/2 w-full text-center text-gray-500'>
				<p className='text-sm sm:text-lg'>Not sure where to go?</p>
				<button
					onClick={search}
					className='text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 cursor-pointer hover:shadow-xl active:scale-90 transition duration-150'>I&apos;m flexible</button>
			</div>
		</div>

	);
}

export default Banner;

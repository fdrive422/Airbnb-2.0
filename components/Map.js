import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function MapBox({ searchResults }) {
	const [selectedLocation, setSelectedLocation] = useState({});
	// Transform the search results object into the  lat long object required
	const coordinates = searchResults?.map((result) => ({
		longitude: result.long,
		latitude: result.lat,
	}));

	const center = getCenter(coordinates);

	const [viewState, setViewState] = React.useState({
		width: "100%",
		height: "100%",
		latitude: center.latitude,
		longitude: center.longitude,
		zoom: 11,
	});

	useEffect(() => {
		setViewState({
			width: "100%",
			height: "100%",
			latitude: center.latitude,
			longitude: center.longitude,
			zoom: 12,
		});
	}, [center.latitude, center.longitude, searchResults]);

	return (
		<Map
			mapStyle="mapbox://styles/fdrive/clamnunrs002m16rw6wdkix34"
			mapboxAccessToken={process.env.mapbox_key}
			{...viewState}
			onMove={(evt) => setViewState(evt.viewState)}
		>
			{searchResults.map((result, index) => (
				<div key={index}>
					{searchResults.map((result) => (
						<div key={result.long}>
							<Marker
								longitude={result.long}
								latitude={result.lat}
								offsetLeft={-20}
								offsetTop={-10}
							>
								<p
									role='img'
									onClick={() => setSelectedLocation(result)}
									className='cursor-default text-2xl animate-bounce'
									aria-label="push-pin"
								>
									📌
								</p>
							</Marker>
						</div>
					))};
					{selectedLocation.long === result.long ? (
						<Popup
							onClose={() => setSelectedLocation({})}
							closeOnClick={false}
							latitude={result.lat}
							longitude={result.long}
							anchor="bottom-right"
						>
							{result.name}
						</Popup>
					) : (
						false
					)}
				</div>
			))}
		</Map>
	);
}

export default MapBox;

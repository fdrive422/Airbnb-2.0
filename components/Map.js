import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { formatUSD } from "../utils/currency";

function MapBox({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const coordinates = searchResults?.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewState, setViewState] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  useEffect(() => {
    setViewState((prev) => ({
      ...prev,
      latitude: center.latitude,
      longitude: center.longitude,
      zoom: 12,
    }));
  }, [center.latitude, center.longitude]);

  return (
    <Map
      mapStyle="mapbox://styles/fdrive/clamnunrs002m16rw6wdkix34"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100%", height: "100%" }}
    >
      {searchResults.map((result) => (
        <React.Fragment key={result.long}>
          <Marker longitude={result.long} latitude={result.lat}>
            <p
              role="img"
              onClick={() =>
                setSelectedLocation(
                  selectedLocation?.long === result.long ? null : result
                )
              }
              className="cursor-pointer text-2xl animate-bounce hover:scale-125 transition-transform"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>

          {selectedLocation?.long === result.long && (
            <Popup
              onClose={() => setSelectedLocation(null)}
              closeOnClick={false}
              latitude={result.lat}
              longitude={result.long}
              anchor="bottom"
            >
              <div className="p-1">
                <p className="font-semibold text-sm">{result.name}</p>
                {result.per_night && (
                  <p className="text-xs text-gray-600">
                    {formatUSD(result.per_night)}
                  </p>
                )}
              </div>
            </Popup>
          )}
        </React.Fragment>
      ))}
    </Map>
  );
}

export default MapBox;

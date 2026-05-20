import React, { useEffect, useRef, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { formatUSD } from "../utils/currency";

function MapBox({ searchResults, activeLocation, onSelect }) {
  const mapRef = useRef(null);

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

  // Re-centre when city changes (new search results)
  useEffect(() => {
    setViewState((prev) => ({
      ...prev,
      latitude: center.latitude,
      longitude: center.longitude,
      zoom: 11,
    }));
  }, [center.latitude, center.longitude]);

  // Fly to the actively selected listing
  useEffect(() => {
    if (!activeLocation || !mapRef.current) return;
    mapRef.current.flyTo({
      center: [activeLocation.long, activeLocation.lat],
      zoom: 14,
      duration: 1200,
      essential: true,
    });
  }, [activeLocation]);

  return (
    <Map
      ref={mapRef}
      mapStyle="mapbox://styles/fdrive/clamnunrs002m16rw6wdkix34"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100%", height: "100%" }}
    >
      {searchResults.map((result) => {
        const isActive = activeLocation?.long === result.long;

        return (
          <React.Fragment key={result.long}>
            <Marker longitude={result.long} latitude={result.lat}>
              {/* Price-badge marker — rose when active, white when idle */}
              <button
                onClick={() => onSelect(isActive ? null : result)}
                className={`
                  px-2 py-1 rounded-full text-xs font-bold shadow-lg
                  border transition-all duration-200 whitespace-nowrap
                  ${isActive
                    ? "bg-rose-500 text-white border-rose-500 scale-110 shadow-xl"
                    : "bg-white text-gray-800 border-gray-200 hover:scale-105 hover:shadow-xl"}
                `}
              >
                {formatUSD(result.per_night)}
              </button>
            </Marker>

            {isActive && (
              <Popup
                onClose={() => onSelect(null)}
                closeOnClick={false}
                latitude={result.lat}
                longitude={result.long}
                anchor="bottom"
                offset={20}
              >
                <div className="p-2 min-w-[140px]">
                  <p className="font-semibold text-sm leading-tight">{result.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{result.message}</p>
                  {result.per_night && (
                    <p className="text-xs font-bold text-rose-500 mt-1">
                      {formatUSD(result.per_night)} / night
                    </p>
                  )}
                </div>
              </Popup>
            )}
          </React.Fragment>
        );
      })}
    </Map>
  );
}

export default MapBox;

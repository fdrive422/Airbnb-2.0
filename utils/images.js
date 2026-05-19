// All images are local project assets in /public/images/
// Run `bash scripts/download-assets.sh` from repo root to (re)download them.

// -------------------------------------------------------------------
// 20 diverse property photos for search result cards
// -------------------------------------------------------------------
const PROPERTY_IMGS = [
  "/images/properties/p01.jpg",
  "/images/properties/p02.jpg",
  "/images/properties/p03.jpg",
  "/images/properties/p04.jpg",
  "/images/properties/p05.jpg",
  "/images/properties/p06.jpg",
  "/images/properties/p07.jpg",
  "/images/properties/p08.jpg",
  "/images/properties/p09.jpg",
  "/images/properties/p10.jpg",
  "/images/properties/p11.jpg",
  "/images/properties/p12.jpg",
  "/images/properties/p13.jpg",
  "/images/properties/p14.jpg",
  "/images/properties/p15.jpg",
  "/images/properties/p16.jpg",
  "/images/properties/p17.jpg",
  "/images/properties/p18.jpg",
  "/images/properties/p19.jpg",
  "/images/properties/p20.jpg",
];

// -------------------------------------------------------------------
// City thumbnail map for the Explore Nearby section
// -------------------------------------------------------------------
const CITY_THUMBS = {
  // US cities
  "New York":      "/images/cities/new-york.jpg",
  "Miami":         "/images/cities/miami.jpg",
  "Los Angeles":   "/images/cities/los-angeles.jpg",
  "Chicago":       "/images/cities/chicago.jpg",
  "San Francisco": "/images/cities/san-francisco.jpg",
  "Austin":        "/images/cities/austin.jpg",
  "Nashville":     "/images/cities/nashville.jpg",
  "Seattle":       "/images/cities/seattle.jpg",
  // UK/legacy locations from original project
  "London":        "/images/cities/london.jpg",
  "Paris":         "/images/cities/paris.jpg",
  "Dubai":         "/images/cities/dubai.jpg",
  "Manchester":    "/images/cities/manchester.jpg",
  "Liverpool":     "/images/cities/liverpool.jpg",
  "York":          "/images/cities/york.jpg",
  "Cardiff":       "/images/cities/cardiff.jpg",
  "Birkenhead":    "/images/cities/birkenhead.jpg",
  "Newquay":       "/images/cities/newquay.jpg",
  "Hove":          "/images/cities/hove.jpg",
};

// -------------------------------------------------------------------
// FNV-1a 32-bit hash — deterministic, well-distributed
// -------------------------------------------------------------------
function fnv32a(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/**
 * Returns a local property image path for any string key.
 * Same key → same image every time; different keys spread across all 20 photos.
 */
export function pickPropertyImg(key = "") {
  return PROPERTY_IMGS[fnv32a(key) % PROPERTY_IMGS.length];
}

/**
 * Returns the curated city thumbnail, or falls back to a hashed property image.
 */
export function pickExploreImg(location = "") {
  return CITY_THUMBS[location] ?? PROPERTY_IMGS[fnv32a(location) % PROPERTY_IMGS.length];
}

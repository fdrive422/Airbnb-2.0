// Unsplash stable URL helper — auto=format&fit=crop makes CDN serve
// the best format/size and prevents 404s on format mismatches
const u = (id, w = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// -------------------------------------------------------------------
// Diverse Unsplash property photos for search result cards (20 images)
// -------------------------------------------------------------------
const PROPERTY_IMGS = [
  u("1564013799919-ab600027ffc6"),  // luxury exterior w/ pool
  u("1580587771525-78b9dba3b914"),  // mid-century modern pool
  u("1512917774080-9991f1c4c750"),  // contemporary white home
  u("1600596542815-ffad4c1539a9"),  // modern glass facade
  u("1502672260266-1c1ef2d93688"),  // bright airy apartment
  u("1493809842364-78817add7ffb"),  // studio loft interior
  u("1560448204-e02f11c3d0e2"),     // city apartment
  u("1522708323590-d24dbb6b0267"),  // Scandinavian bedroom
  u("1484154218962-a197022b5858"),  // open-plan kitchen/living
  u("1555041469-a586c61ea9bc"),     // contemporary sofa/living
  u("1520250497591-112f2f40a3f4"),  // resort infinity pool
  u("1571003123894-1f0594d2b5d9"),  // tropical pool villa
  u("1449158743715-0a90ebb6d2d8"),  // forest cabin
  u("1543489822-c49534f3271f"),     // unique treehouse stays
  u("1583608205776-bfd35f0d9f83"),  // cottage exterior
  u("1598928506311-c55ded91a20c"),  // outdoor terrace/patio
  u("1416331108676-a22ccb276e35"),  // cozy warm interior
  u("1613490493576-7fde63acd811"),  // glass-wall modern home
  u("1600047508788-786f3865b0c0"),  // minimalist bedroom
  u("1536376072261-38c75010e6c9"),  // rooftop terrace city
];

// -------------------------------------------------------------------
// City thumbnail images for the Explore Nearby section
// Using high-traffic, stable Unsplash IDs + crop params
// -------------------------------------------------------------------
const CITY_THUMBS = {
  // US cities
  "New York":      u("1522083165195-3424ed129620", 300),  // Manhattan skyline
  "Miami":         u("1533106497176-45ae19e68ba2", 300),  // South Beach aerial
  "Los Angeles":   u("1579963333765-b4129b3250fc", 300),  // LA skyline at dusk
  "Chicago":       u("1477959858617-67f85cf4f1df", 300),  // Chicago waterfront
  "San Francisco": u("1501594907352-04cda38ebc29", 300),  // Golden Gate
  "Austin":        u("1531218150217-54595bc2b934", 300),  // Austin skyline
  "Nashville":     u("1545419913-775e6f6a7c01", 300),     // Nashville neon
  "Seattle":       u("1438401171849-74ac270044ee", 300),  // Space Needle
  // UK/legacy locations from original project
  "London":        u("1513635269975-59663e0ac1ad", 300),  // Tower Bridge
  "Paris":         u("1499856871958-5b9627545d1a", 300),  // Eiffel Tower
  "Dubai":         u("1512453979798-5ea266f8880c", 300),  // Dubai skyline
  "Manchester":    u("1567696153798-9111f9cd3d0d", 300),  // Manchester city
  "Liverpool":     u("1533929736458-ca588d08c8be", 300),  // Albert Dock
  "York":          u("1609951651556-5e7e6a2cd7f4", 300),  // York Minster
  "Cardiff":       u("1572036350880-c44bcd5ad9dd", 300),  // Cardiff Bay
  "Birkenhead":    u("1469854523086-cc02fe5d8800", 300),  // English coastline
  "Newquay":       u("1507525428034-b723cf961d3e", 300),  // coastal beach
  "Hove":          u("1467226632440-65f0b4957563", 300),  // seaside town
};

// -------------------------------------------------------------------
// FNV-1a 32-bit hash — fast, stable, well-distributed
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
 * Pick a property listing image based on any stable string key (e.g. listing name).
 * Same key always returns the same image; different keys spread across the full pool.
 */
export function pickPropertyImg(key = "") {
  return PROPERTY_IMGS[fnv32a(key) % PROPERTY_IMGS.length];
}

/**
 * Pick a city thumbnail — uses the curated map first, then hashes into the pool.
 */
export function pickExploreImg(location = "") {
  return CITY_THUMBS[location] ?? PROPERTY_IMGS[fnv32a(location) % PROPERTY_IMGS.length];
}

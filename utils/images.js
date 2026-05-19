// -------------------------------------------------------------------
// Diverse Unsplash property photos for search result cards (20 images)
// -------------------------------------------------------------------
const PROPERTY_IMGS = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80", // luxury exterior w/ pool
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80", // mid-century modern pool
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", // contemporary white home
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", // modern glass facade
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80", // bright airy apartment
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80", // studio loft interior
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", // city apartment
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", // Scandinavian bedroom
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80", // open-plan kitchen/living
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", // contemporary sofa/living
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80", // resort infinity pool
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80", // tropical pool villa
  "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=600&q=80", // forest cabin
  "https://images.unsplash.com/photo-1543489822-c49534f3271f?w=600&q=80", // unique treehouse stays
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80", // cottage exterior
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&q=80", // outdoor terrace/patio
  "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&q=80", // cozy warm interior
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80", // glass-wall modern home
  "https://images.unsplash.com/photo-1600047508788-786f3865b0c0?w=600&q=80", // minimalist bedroom
  "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&q=80", // rooftop terrace city
];

// -------------------------------------------------------------------
// City thumbnail images for the Explore Nearby section
// -------------------------------------------------------------------
const CITY_THUMBS = {
  "New York":      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=300&q=80",
  "Miami":         "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=300&q=80",
  "Los Angeles":   "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=300&q=80",
  "Chicago":       "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&q=80",
  "San Francisco": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&q=80",
  "Austin":        "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=300&q=80",
  "Nashville":     "https://images.unsplash.com/photo-1545419913-775e6f6a7c01?w=300&q=80",
  "Seattle":       "https://images.unsplash.com/photo-1438401171849-74ac270044ee?w=300&q=80",
  // Legacy UK locations from original project
  "London":        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&q=80",
  "Paris":         "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=300&q=80",
  "Dubai":         "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&q=80",
  "Manchester":    "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=300&q=80",
  "Liverpool":     "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&q=80",
  "York":          "https://images.unsplash.com/photo-1609951651556-5e7e6a2cd7f4?w=300&q=80",
  "Cardiff":       "https://images.unsplash.com/photo-1562158074-d49dd328dc9c?w=300&q=80",
  "Birkenhead":    "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&q=80",
  "Newquay":       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80", // coastal beach
  "Hove":          "https://images.unsplash.com/photo-1467226632440-65f0b4957563?w=300&q=80",
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
  return hash >>> 0; // unsigned
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
  return (
    CITY_THUMBS[location] ??
    PROPERTY_IMGS[fnv32a(location) % PROPERTY_IMGS.length]
  );
}

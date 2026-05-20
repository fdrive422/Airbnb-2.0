/**
 * Hardcoded city search data — 7-8 listings per city.
 * img fields are set explicitly so each property type gets a matching photo.
 * lat/long values are real geographic coordinates for the named neighbourhood.
 *
 * Image key (verified contents):
 *   p01 tropical white house + pool      p11 tropical resort pool
 *   p02 contemporary home + pool         p12 luxury infinity pool at dusk
 *   p03 modern home + pool/glass         p13 dark-wood contemporary exterior
 *   p04 modern white villa + pool        p14 infinity pool + ocean view
 *   p05 cozy apartment, warm plants      p15 American craftsman exterior
 *   p06 Scandinavian living room         p16 elegant formal white living room
 *   p07 spacious open-plan + views       p17 Spanish villa + pool at night
 *   p08 modern European flat interior    p18 modern luxury home + pool
 *   p09 white modern kitchen             p19 open-plan cozy living/kitchen
 *   p10 bright contemporary living room  p20 urban brick loft + dining
 */

const p = (n) => `/images/properties/p${String(n).padStart(2, "0")}.jpg`;

export const CITY_DATA = {
  /* ─────────────────────────── NEW YORK ─────────────────────────── */
  "New York": [
    {
      name: "SoHo Designer Loft",
      message: "SoHo, Manhattan",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Kitchen", "AC", "Doorman"],
      rating: 4.9, per_night: "$325", price: "$1,625 5 nights",
      lat: 40.7233, long: -74.0030, img: p(20),
    },
    {
      name: "Brooklyn Brownstone",
      message: "Park Slope, Brooklyn",
      guests: "4 guests", beds: "2 beds", baths: "1 bath",
      amenities: ["Wifi", "Washer", "Garden", "Parking"],
      rating: 4.7, per_night: "$245", price: "$1,225 5 nights",
      lat: 40.6782, long: -73.9442, img: p(15),
    },
    {
      name: "Upper West Side Apartment",
      message: "Upper West Side, Manhattan",
      guests: "3 guests", beds: "2 beds", baths: "1 bath",
      amenities: ["Wifi", "Kitchen", "Park views", "Doorman"],
      rating: 4.8, per_night: "$285", price: "$1,425 5 nights",
      lat: 40.7870, long: -73.9754, img: p(7),
    },
    {
      name: "Williamsburg Hipster Flat",
      message: "Williamsburg, Brooklyn",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Rooftop deck", "Bike storage"],
      rating: 4.6, per_night: "$195", price: "$975 5 nights",
      lat: 40.7081, long: -73.9571, img: p(10),
    },
    {
      name: "Midtown Manhattan Suite",
      message: "Midtown, Manhattan",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Gym", "City views", "Doorman"],
      rating: 4.8, per_night: "$395", price: "$1,975 5 nights",
      lat: 40.7549, long: -73.9840, img: p(16),
    },
    {
      name: "Astoria Queens Townhouse",
      message: "Astoria, Queens",
      guests: "5 guests", beds: "3 beds", baths: "2 baths",
      amenities: ["Wifi", "Kitchen", "Backyard", "Parking"],
      rating: 4.7, per_night: "$175", price: "$875 5 nights",
      lat: 40.7726, long: -73.9294, img: p(5),
    },
    {
      name: "Jersey City Waterfront Condo",
      message: "Jersey City, NJ",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Pool", "Gym", "Manhattan views"],
      rating: 4.6, per_night: "$195", price: "$975 5 nights",
      lat: 40.7178, long: -74.0431, img: p(9),
    },
    {
      name: "Harlem Cultural District Apt",
      message: "Harlem, Manhattan",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Kitchen", "Jazz nearby"],
      rating: 4.5, per_night: "$165", price: "$825 5 nights",
      lat: 40.8116, long: -73.9465, img: p(8),
    },
  ],

  /* ─────────────────────────── SAN FRANCISCO ─────────────────────── */
  "San Francisco": [
    {
      name: "Mission District Loft",
      message: "Mission District, San Francisco",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Kitchen", "Patio", "EV charger"],
      rating: 4.8, per_night: "$195", price: "$975 5 nights",
      lat: 37.7599, long: -122.4148, img: p(20),
    },
    {
      name: "Pacific Heights Victorian Home",
      message: "Pacific Heights, San Francisco",
      guests: "4 guests", beds: "2 beds", baths: "2 baths",
      amenities: ["Wifi", "Kitchen", "Bay views", "Parking"],
      rating: 4.9, per_night: "$310", price: "$1,550 5 nights",
      lat: 37.7925, long: -122.4382, img: p(15),
    },
    {
      name: "Oakland Modern Apartment",
      message: "Uptown Oakland, CA",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Gym", "Rooftop"],
      rating: 4.6, per_night: "$145", price: "$725 5 nights",
      lat: 37.8044, long: -122.2712, img: p(6),
    },
    {
      name: "Sausalito Waterfront Studio",
      message: "Sausalito, CA",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Bay views", "Boat dock", "Kayaks"],
      rating: 4.9, per_night: "$225", price: "$1,125 5 nights",
      lat: 37.8590, long: -122.4852, img: p(7),
    },
    {
      name: "Berkeley Craftsman Home",
      message: "Berkeley, CA",
      guests: "5 guests", beds: "3 beds", baths: "2 baths",
      amenities: ["Wifi", "Garden", "BBQ", "Parking"],
      rating: 4.7, per_night: "$175", price: "$875 5 nights",
      lat: 37.8716, long: -122.2727, img: p(19),
    },
    {
      name: "North Beach Italian Quarter Flat",
      message: "North Beach, San Francisco",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Espresso bar", "City views"],
      rating: 4.8, per_night: "$210", price: "$1,050 5 nights",
      lat: 37.8061, long: -122.4103, img: p(8),
    },
    {
      name: "Noe Valley Modern Townhouse",
      message: "Noe Valley, San Francisco",
      guests: "4 guests", beds: "2 beds", baths: "2 baths",
      amenities: ["Wifi", "Deck", "Smart home", "EV charger"],
      rating: 4.7, per_night: "$240", price: "$1,200 5 nights",
      lat: 37.7503, long: -122.4337, img: p(13),
    },
  ],

  /* ─────────────────────────── SEATTLE ─────────────────────────── */
  "Seattle": [
    {
      name: "Capitol Hill Modern Condo",
      message: "Capitol Hill, Seattle",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Gym", "Rooftop", "AC"],
      rating: 4.7, per_night: "$185", price: "$925 5 nights",
      lat: 47.6253, long: -122.3222, img: p(9),
    },
    {
      name: "Fremont Artisan Loft",
      message: "Fremont, Seattle",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Art studio", "Bike storage"],
      rating: 4.8, per_night: "$165", price: "$825 5 nights",
      lat: 47.6510, long: -122.3508, img: p(20),
    },
    {
      name: "Bellevue Luxury Suite",
      message: "Bellevue, WA",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Concierge", "Pool", "Spa"],
      rating: 4.9, per_night: "$245", price: "$1,225 5 nights",
      lat: 47.6101, long: -122.2015, img: p(16),
    },
    {
      name: "Queen Anne Hill Home",
      message: "Queen Anne, Seattle",
      guests: "4 guests", beds: "2 beds", baths: "2 baths",
      amenities: ["Wifi", "Space Needle views", "Fireplace"],
      rating: 4.8, per_night: "$220", price: "$1,100 5 nights",
      lat: 47.6376, long: -122.3567, img: p(13),
    },
    {
      name: "Ballard Waterfront Apartment",
      message: "Ballard, Seattle",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Sound views", "Kayaks"],
      rating: 4.7, per_night: "$175", price: "$875 5 nights",
      lat: 47.6680, long: -122.3851, img: p(7),
    },
    {
      name: "Kirkland Lakefront Cottage",
      message: "Kirkland, WA",
      guests: "4 guests", beds: "2 beds", baths: "1 bath",
      amenities: ["Wifi", "Lake access", "Paddleboard", "Fire pit"],
      rating: 4.9, per_night: "$265", price: "$1,325 5 nights",
      lat: 47.6815, long: -122.2087, img: p(19),
    },
    {
      name: "Redmond Tech Hub Studio",
      message: "Redmond, WA",
      guests: "1 guest", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Standing desk", "EV charger"],
      rating: 4.6, per_night: "$155", price: "$775 5 nights",
      lat: 47.6740, long: -122.1215, img: p(6),
    },
  ],

  /* ─────────────────────────── LOS ANGELES ─────────────────────── */
  "Los Angeles": [
    {
      name: "Hollywood Hills Villa",
      message: "Hollywood Hills, Los Angeles",
      guests: "6 guests", beds: "3 beds", baths: "2 baths",
      amenities: ["Wifi", "Pool", "City views", "Parking", "Chef's kitchen"],
      rating: 4.9, per_night: "$450", price: "$2,250 5 nights",
      lat: 34.1124, long: -118.3349, img: p(17),
    },
    {
      name: "Santa Monica Beach House",
      message: "Santa Monica, Los Angeles",
      guests: "6 guests", beds: "3 beds", baths: "2 baths",
      amenities: ["Wifi", "Pool", "Beach access", "Bikes"],
      rating: 4.9, per_night: "$395", price: "$1,975 5 nights",
      lat: 34.0195, long: -118.4912, img: p(1),
    },
    {
      name: "Venice Beach Bungalow",
      message: "Venice, Los Angeles",
      guests: "4 guests", beds: "2 beds", baths: "1 bath",
      amenities: ["Wifi", "Beach access", "Bikes", "Outdoor shower"],
      rating: 4.8, per_night: "$280", price: "$1,400 5 nights",
      lat: 33.9850, long: -118.4695, img: p(11),
    },
    {
      name: "Silver Lake Modern Home",
      message: "Silver Lake, Los Angeles",
      guests: "4 guests", beds: "2 beds", baths: "2 baths",
      amenities: ["Wifi", "Pool", "Parking", "Smart home"],
      rating: 4.7, per_night: "$230", price: "$1,150 5 nights",
      lat: 34.0870, long: -118.2700, img: p(3),
    },
    {
      name: "Malibu Oceanfront Estate",
      message: "Malibu, CA",
      guests: "8 guests", beds: "4 beds", baths: "3 baths",
      amenities: ["Wifi", "Private beach", "Infinity pool", "Home theater"],
      rating: 5.0, per_night: "$695", price: "$3,475 5 nights",
      lat: 34.0259, long: -118.7798, img: p(14),
    },
    {
      name: "Pasadena Craftsman Home",
      message: "Pasadena, CA",
      guests: "5 guests", beds: "3 beds", baths: "2 baths",
      amenities: ["Wifi", "Rose garden", "BBQ", "Parking"],
      rating: 4.7, per_night: "$195", price: "$975 5 nights",
      lat: 34.1478, long: -118.1445, img: p(15),
    },
    {
      name: "Long Beach Marina Condo",
      message: "Long Beach, CA",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Marina views", "Gym", "Boat slip"],
      rating: 4.6, per_night: "$175", price: "$875 5 nights",
      lat: 33.7701, long: -118.1937, img: p(9),
    },
  ],

  /* ─────────────────────────── AUSTIN ─────────────────────────── */
  "Austin": [
    {
      name: "South Congress Bungalow",
      message: "South Congress, Austin",
      guests: "4 guests", beds: "2 beds", baths: "1 bath",
      amenities: ["Wifi", "Porch", "BBQ", "Bike rentals"],
      rating: 4.8, per_night: "$195", price: "$975 5 nights",
      lat: 30.2483, long: -97.7502, img: p(5),
    },
    {
      name: "East Austin Artist Loft",
      message: "East Austin, TX",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Studio space", "Record player", "Patio"],
      rating: 4.7, per_night: "$175", price: "$875 5 nights",
      lat: 30.2587, long: -97.7198, img: p(20),
    },
    {
      name: "Downtown Austin Penthouse",
      message: "Downtown Austin, TX",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Skyline views", "Gym", "Concierge"],
      rating: 4.9, per_night: "$295", price: "$1,475 5 nights",
      lat: 30.2749, long: -97.7398, img: p(16),
    },
    {
      name: "Travis Heights Craftsman",
      message: "Travis Heights, Austin",
      guests: "4 guests", beds: "2 beds", baths: "2 baths",
      amenities: ["Wifi", "Pool", "Garden", "Parking"],
      rating: 4.8, per_night: "$215", price: "$1,075 5 nights",
      lat: 30.2467, long: -97.7370, img: p(15),
    },
    {
      name: "Zilker Park Guest House",
      message: "Zilker, Austin",
      guests: "3 guests", beds: "2 beds", baths: "1 bath",
      amenities: ["Wifi", "Yard", "Park access", "BBQ"],
      rating: 4.8, per_night: "$215", price: "$1,075 5 nights",
      lat: 30.2669, long: -97.7694, img: p(13),
    },
    {
      name: "Round Rock Family Home",
      message: "Round Rock, TX",
      guests: "6 guests", beds: "3 beds", baths: "2 baths",
      amenities: ["Wifi", "Pool", "Backyard", "2-car garage"],
      rating: 4.6, per_night: "$145", price: "$725 5 nights",
      lat: 30.5083, long: -97.6789, img: p(19),
    },
    {
      name: "Cedar Park Modern Estate",
      message: "Cedar Park, TX",
      guests: "8 guests", beds: "4 beds", baths: "3 baths",
      amenities: ["Wifi", "Pool", "Game room", "EV charger"],
      rating: 4.7, per_night: "$285", price: "$1,425 5 nights",
      lat: 30.5052, long: -97.8203, img: p(18),
    },
  ],

  /* ─────────────────────────── CHICAGO ─────────────────────────── */
  "Chicago": [
    {
      name: "Lincoln Park Victorian",
      message: "Lincoln Park, Chicago",
      guests: "4 guests", beds: "2 beds", baths: "2 baths",
      amenities: ["Wifi", "Fireplace", "Backyard", "Parking"],
      rating: 4.8, per_night: "$215", price: "$1,075 5 nights",
      lat: 41.9214, long: -87.6513, img: p(15),
    },
    {
      name: "Wicker Park Artist Loft",
      message: "Wicker Park, Chicago",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "High ceilings", "Art collection"],
      rating: 4.7, per_night: "$175", price: "$875 5 nights",
      lat: 41.9083, long: -87.6786, img: p(20),
    },
    {
      name: "River North Penthouse",
      message: "River North, Chicago",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Floor-to-ceiling views", "Concierge", "Gym"],
      rating: 4.9, per_night: "$345", price: "$1,725 5 nights",
      lat: 41.8927, long: -87.6319, img: p(16),
    },
    {
      name: "Gold Coast Luxury Suite",
      message: "Gold Coast, Chicago",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Lake views", "Doorman", "Spa access"],
      rating: 4.8, per_night: "$285", price: "$1,425 5 nights",
      lat: 41.9032, long: -87.6269, img: p(7),
    },
    {
      name: "Evanston Lakefront Home",
      message: "Evanston, IL",
      guests: "6 guests", beds: "3 beds", baths: "2 baths",
      amenities: ["Wifi", "Lake Michigan access", "Kayaks", "BBQ"],
      rating: 4.8, per_night: "$235", price: "$1,175 5 nights",
      lat: 42.0451, long: -87.6877, img: p(13),
    },
    {
      name: "Hyde Park University Flat",
      message: "Hyde Park, Chicago",
      guests: "3 guests", beds: "2 beds", baths: "1 bath",
      amenities: ["Wifi", "Library", "Garden", "Near Museum of Science"],
      rating: 4.6, per_night: "$155", price: "$775 5 nights",
      lat: 41.7943, long: -87.5907, img: p(8),
    },
    {
      name: "Oak Park Prairie Home",
      message: "Oak Park, IL",
      guests: "5 guests", beds: "3 beds", baths: "2 baths",
      amenities: ["Wifi", "Frank Lloyd Wright district", "Porch", "Parking"],
      rating: 4.7, per_night: "$195", price: "$975 5 nights",
      lat: 41.8850, long: -87.7845, img: p(19),
    },
  ],

  /* ─────────────────────────── MIAMI ─────────────────────────── */
  "Miami": [
    {
      name: "South Beach Art Deco Suite",
      message: "South Beach, Miami",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Pool", "Beach access", "Rooftop bar"],
      rating: 4.9, per_night: "$285", price: "$1,425 5 nights",
      lat: 25.7826, long: -80.1340, img: p(6),
    },
    {
      name: "Brickell Luxury Penthouse",
      message: "Brickell, Miami",
      guests: "4 guests", beds: "2 beds", baths: "2 baths",
      amenities: ["Wifi", "Infinity pool", "City views", "Gym", "Valet"],
      rating: 4.9, per_night: "$375", price: "$1,875 5 nights",
      lat: 25.7617, long: -80.1918, img: p(4),
    },
    {
      name: "Coral Gables Mediterranean Villa",
      message: "Coral Gables, FL",
      guests: "8 guests", beds: "4 beds", baths: "3 baths",
      amenities: ["Wifi", "Pool", "Jacuzzi", "Outdoor kitchen", "Parking"],
      rating: 4.9, per_night: "$445", price: "$2,225 5 nights",
      lat: 25.7215, long: -80.2684, img: p(17),
    },
    {
      name: "Fort Lauderdale Beach House",
      message: "Fort Lauderdale, FL",
      guests: "6 guests", beds: "3 beds", baths: "2 baths",
      amenities: ["Wifi", "Pool", "Private beach", "Boat dock"],
      rating: 4.8, per_night: "$295", price: "$1,475 5 nights",
      lat: 26.1224, long: -80.1373, img: p(1),
    },
    {
      name: "Aventura Golf Course Home",
      message: "Aventura, FL",
      guests: "6 guests", beds: "3 beds", baths: "2 baths",
      amenities: ["Wifi", "Pool", "Golf access", "Gated community"],
      rating: 4.7, per_night: "$255", price: "$1,275 5 nights",
      lat: 25.9565, long: -80.1393, img: p(18),
    },
    {
      name: "Wynwood Arts District Loft",
      message: "Wynwood, Miami",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Murals & galleries nearby", "Patio"],
      rating: 4.7, per_night: "$185", price: "$925 5 nights",
      lat: 25.8003, long: -80.1997, img: p(20),
    },
    {
      name: "Key Biscayne Island Retreat",
      message: "Key Biscayne, FL",
      guests: "6 guests", beds: "3 beds", baths: "2 baths",
      amenities: ["Wifi", "Private pool", "Ocean views", "Snorkeling gear"],
      rating: 5.0, per_night: "$515", price: "$2,575 5 nights",
      lat: 25.6908, long: -80.1626, img: p(14),
    },
  ],

  /* ─────────────────────────── LONDON ─────────────────────────── */
  "London": [
    {
      name: "Shoreditch Creative Loft",
      message: "Shoreditch, East London",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "High ceilings", "Art nearby", "Bike storage"],
      rating: 4.8, per_night: "$195", price: "$975 5 nights",
      lat: 51.5228, long: -0.0795, img: p(20),
    },
    {
      name: "Notting Hill Victorian House",
      message: "Notting Hill, West London",
      guests: "6 guests", beds: "3 beds", baths: "2 baths",
      amenities: ["Wifi", "Garden", "Fireplace", "Portobello Road nearby"],
      rating: 4.9, per_night: "$345", price: "$1,725 5 nights",
      lat: 51.5138, long: -0.2031, img: p(15),
    },
    {
      name: "Canary Wharf Modern Flat",
      message: "Canary Wharf, East London",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Gym", "Concierge", "Thames views"],
      rating: 4.7, per_night: "$225", price: "$1,125 5 nights",
      lat: 51.5052, long: -0.0235, img: p(9),
    },
    {
      name: "Chelsea Garden Apartment",
      message: "Chelsea, South West London",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Private garden", "King's Road nearby"],
      rating: 4.9, per_night: "$345", price: "$1,725 5 nights",
      lat: 51.4875, long: -0.1687, img: p(7),
    },
    {
      name: "Camden Market Studio",
      message: "Camden Town, North London",
      guests: "2 guests", beds: "1 bed", baths: "1 bath",
      amenities: ["Wifi", "Market on doorstep", "Live music nearby"],
      rating: 4.6, per_night: "$165", price: "$825 5 nights",
      lat: 51.5390, long: -0.1426, img: p(10),
    },
    {
      name: "Greenwich Historic Home",
      message: "Greenwich, South East London",
      guests: "4 guests", beds: "2 beds", baths: "1 bath",
      amenities: ["Wifi", "Period features", "Garden", "Observatory nearby"],
      rating: 4.7, per_night: "$195", price: "$975 5 nights",
      lat: 51.4825, long: -0.0016, img: p(8),
    },
    {
      name: "Richmond Park Retreat",
      message: "Richmond, South West London",
      guests: "5 guests", beds: "3 beds", baths: "2 baths",
      amenities: ["Wifi", "Park access", "Garden", "Quiet village feel"],
      rating: 4.8, per_night: "$255", price: "$1,275 5 nights",
      lat: 51.4613, long: -0.3037, img: p(19),
    },
  ],
};

import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";

const OUTDOORS_IMG = "/images/outdoors.jpg";

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <Head>
        <title>StayFinder — Property Rental Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5 dark:text-white">Explore Popular Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ img, distance, location }) => (
              <SmallCard
                key={location}
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8 dark:text-white">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({ img, title }) => (
              <MediumCard key={title} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img={OUTDOORS_IMG}
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  );
}

// Hardcoded explore destinations — distances from Los Angeles (home base).
// Never fetched from an external API; guarantees correct cities, images, and labels.
const EXPLORE_DESTINATIONS = [
  { img: "/images/cities/san-francisco.jpg", location: "San Francisco", distance: "1.5-hour flight" },
  { img: "/images/cities/seattle.jpg",       location: "Seattle",       distance: "2.5-hour flight" },
  { img: "/images/cities/los-angeles.jpg",   location: "Los Angeles",   distance: "Local"           },
  { img: "/images/cities/austin.jpg",        location: "Austin",        distance: "2.5-hour flight" },
  { img: "/images/cities/chicago.jpg",       location: "Chicago",       distance: "4-hour flight"   },
  { img: "/images/cities/new-york.jpg",      location: "New York",      distance: "5.5-hour flight" },
  { img: "/images/cities/miami.jpg",         location: "Miami",         distance: "5-hour flight"   },
  { img: "/images/cities/london.jpg",        location: "London",        distance: "11-hour flight"  },
];

// Original repo images — restored as requested
const FALLBACK_CARDS = [
  { img: "https://links.papareact.com/2io", title: "Entire homes" },
  { img: "https://links.papareact.com/Xp9", title: "Cabins & cottages" },
  { img: "https://links.papareact.com/7eh", title: "Unique stays" },
];

async function safeFetch(url, fallback, pickImg) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return fallback;
    const data = await res.json();
    if (!pickImg) return data; // pass-through — use images as returned by API
    return data.map((item) => ({ ...item, img: pickImg(item) }));
  } catch {
    return fallback;
  }
}

export async function getServerSideProps() {
  // Explore destinations: always use the hardcoded list — never call external API.
  // The jsonkeeper 4G1G endpoint returns UK cities which would override our 8 cities.
  const exploreData = EXPLORE_DESTINATIONS;

  // Live Anywhere cards: try API, fall back to papareact originals
  const cardsData = await safeFetch(
    "https://www.jsonkeeper.com/b/VHHT",
    FALLBACK_CARDS,
    null
  );

  return {
    props: { exploreData, cardsData },
  };
}

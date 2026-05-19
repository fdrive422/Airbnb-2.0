import Head from "next/head";
import { pickExploreImg, pickPropertyImg } from "../utils/images";
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
        <title>Airbnb Clone - Unofficial Build</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5 dark:text-white">Explore Nearby</h2>
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

// Reliable Unsplash fallbacks — used when the external API is unreachable
const FALLBACK_EXPLORE = [
  {
    img: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400&q=80",
    location: "New York",
    distance: "45-minute drive",
  },
  {
    img: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&q=80",
    location: "Miami",
    distance: "4-hour flight",
  },
  {
    img: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=400&q=80",
    location: "Los Angeles",
    distance: "5-hour flight",
  },
  {
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80",
    location: "Chicago",
    distance: "2-hour flight",
  },
  {
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&q=80",
    location: "San Francisco",
    distance: "6-hour flight",
  },
  {
    img: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=400&q=80",
    location: "Austin",
    distance: "3-hour flight",
  },
  {
    img: "https://images.unsplash.com/photo-1545419913-775e6f6a7c01?w=400&q=80",
    location: "Nashville",
    distance: "2-hour flight",
  },
  {
    img: "https://images.unsplash.com/photo-1438401171849-74ac270044ee?w=400&q=80",
    location: "Seattle",
    distance: "4-hour flight",
  },
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
  const [exploreData, cardsData] = await Promise.all([
    // Explore: always swap in curated city thumbnails (muscache URLs unreliable)
    safeFetch("https://www.jsonkeeper.com/b/4G1G", FALLBACK_EXPLORE,
      (item) => pickExploreImg(item.location)),
    // Live Anywhere: use original API images as-is; fall back to papareact originals
    safeFetch("https://www.jsonkeeper.com/b/VHHT", FALLBACK_CARDS, null),
  ]);

  return {
    props: { exploreData, cardsData },
  };
}

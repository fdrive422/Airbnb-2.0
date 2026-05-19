import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Airbnb Clone - Unofficial Build</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ img, distance, location }) => (
              <SmallCard
                key={img}
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  );
}

const FALLBACK_EXPLORE = [
  { img: "https://links.papareact.com/ygk", location: "New York", distance: "45-minute drive" },
  { img: "https://links.papareact.com/e0p", location: "Miami", distance: "4-hour flight" },
  { img: "https://links.papareact.com/43p", location: "Los Angeles", distance: "5-hour flight" },
  { img: "https://links.papareact.com/s1o", location: "Chicago", distance: "2-hour flight" },
];

const FALLBACK_CARDS = [
  { img: "https://links.papareact.com/2io", title: "Entire homes" },
  { img: "https://links.papareact.com/Xp9", title: "Cabins &amp; cottages" },
  { img: "https://links.papareact.com/7eh", title: "Unique stays" },
];

async function safeFetch(url, fallback) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return fallback;
    return res.json();
  } catch {
    return fallback;
  }
}

export async function getServerSideProps() {
  const [exploreData, cardsData] = await Promise.all([
    safeFetch("https://www.jsonkeeper.com/b/4G1G", FALLBACK_EXPLORE),
    safeFetch("https://www.jsonkeeper.com/b/VHHT", FALLBACK_CARDS),
  ]);

  return {
    props: { exploreData, cardsData },
  };
}

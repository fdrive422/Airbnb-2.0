import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { ThemeProvider } from "../context/ThemeContext";

const progress = new ProgressBar({
  size: 4,
  color: "#FF385C",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

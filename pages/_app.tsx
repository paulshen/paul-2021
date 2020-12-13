import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";
import * as gtag from "../GoogleAnalytics";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className="text-gray-900">
      <Head>
        <title>Paul Shen</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

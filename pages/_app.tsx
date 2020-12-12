import Head from "next/head";
import Header from "../components/Header";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
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

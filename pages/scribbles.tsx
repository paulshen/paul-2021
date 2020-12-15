import Head from "next/head";
import Image from "next/image";
import React from "react";
import { SCRIBBLE_PAGE_ID } from "../Constants";

export async function getStaticProps() {
  const scribbles = await fetch(
    `https://notion-api.bypaulshen.com/v1/table/${SCRIBBLE_PAGE_ID}`
  ).then((res) => res.json());

  return {
    props: {
      scribbles,
    },
    revalidate: 10,
  };
}

const Page = ({ scribbles }) => {
  return (
    <div className="max-w-6xl w-11/12 sm:w-4/5 pt-24 pb-32 px-4 mx-auto">
      <Head>
        <title>Scribbles | Paul Shen</title>
      </Head>
      <h1 className="text-3xl mb-12 font-semibold text-center">Scribbles</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {scribbles.map((scribble, i) => (
          <div className="" key={i}>
            <Image
              src={scribble["Image"][0].url}
              layout="intrinsic"
              width={640}
              height={640}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Page;

import { GetStaticProps } from "next";
import React from "react";
import { NotionRenderer } from "react-notion/src";
import { ABOUT_PAGE_ID } from "../Constants";

export const getStaticProps: GetStaticProps = async () => {
  const blocks = await fetch(
    `https://notion-api.bypaulshen.com/v1/page/${ABOUT_PAGE_ID}`
  ).then((res) => res.json());

  return {
    props: {
      blocks,
    },
    revalidate: 10,
  };
};

function AboutPage({ blocks }) {
  return (
    <div className="max-w-xl pt-24 pb-32 px-4 mx-auto">
      <h1 className="text-3xl mb-12 font-semibold">Hi!</h1>
      <NotionRenderer
        blockMap={blocks}
        panes={[]}
        exercises={[]}
        renderEditor={() => null}
      />
    </div>
  );
}

export default AboutPage;

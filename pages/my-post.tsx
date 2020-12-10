import { NotionRenderer } from "react-notion/src/index";

export async function getStaticProps() {
  const data = await fetch(
    "https://notion-api.splitbee.io/v1/page/56e1d1eabd4f42a2bb591134f742535a"
  ).then((res) => res.json());

  return {
    props: {
      blockMap: data,
    },
  };
}

const Page = ({ blockMap }) => (
  <div className="max-w-lg">
    <NotionRenderer blockMap={blockMap} />
  </div>
);
export default Page;

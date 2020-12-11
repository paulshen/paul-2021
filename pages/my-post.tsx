import { NotionRenderer } from "react-notion/src/index";

const addDashesToUUID = (s: string) =>
  `${s.substr(0, 8)}-${s.substr(8, 4)}-${s.substr(12, 4)}-${s.substr(
    16,
    4
  )}-${s.substr(20)}`;

export async function getStaticProps() {
  const pageId = "56e1d1eabd4f42a2bb591134f742535a";
  const data = await fetch(
    `https://notion-api.splitbee.io/v1/page/${pageId}`
  ).then((res) => res.json());

  return {
    props: {
      pageId,
      blockMap: data,
    },
  };
}

const Page = ({ pageId, blockMap }) => {
  const pageTitle = blockMap[addDashesToUUID(pageId)].value.properties.title[0];
  return (
    <div className="max-w-xl pt-16 mx-auto">
      <h1 className="text-3xl mb-8 font-bold">{pageTitle}</h1>
      <NotionRenderer blockMap={blockMap} />
    </div>
  );
};
export default Page;

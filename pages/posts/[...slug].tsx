import { NotionRenderer } from "react-notion/src";
import { getAllPosts } from "../";

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map((row) => `/posts/${row["Slug"]}`),
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const posts = await getAllPosts();
  const post = posts.find((p) => p["Slug"] === slug.join("/"));
  const blocks = await fetch(
    `https://notion-api.splitbee.io/v1/page/${post.id}`
  ).then((res) => res.json());

  return {
    props: {
      blocks,
      post,
    },
  };
}

const Page = ({ post, blocks }) => {
  return (
    <div className="max-w-xl pt-16 pb-32 mx-auto">
      <h1 className="text-3xl mb-8 font-bold">{post["Title"]}</h1>
      <NotionRenderer blockMap={blocks} />
    </div>
  );
};
export default Page;

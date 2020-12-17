import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { NotionRenderer } from "react-notion/src";
import { renderEditor } from "../../components/renderEditor";
import { formatDate } from "../../Utils";
import { getAllPosts } from "./";

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map((row) => `/posts/${row["Slug"]}`),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string[] };
}) => {
  const posts = await getAllPosts();
  const post = posts.find((p) => p["Slug"] === slug.join("/"));
  const blocks = await fetch(
    `https://notion-api.bypaulshen.com/v1/page/${post.id}`
  ).then((res) => res.json());

  let panes = [];
  let exercises = [];
  for (const blockId in blocks) {
    const block = blocks[blockId];
    if (
      block.value.type === "collection_view" &&
      block.collection?.title![0][0] === "Exercises"
    ) {
      exercises = block.collection.data.map((row) => ({
        id: row.id,
        name: row["Name"][0][0],
        prompt: row["Prompt"],
        exercise: row["Exercise"][0][0],
        solution: row["Solution"][0][0],
      }));
    }
    if (
      block.value.type === "collection_view" &&
      block.collection?.title![0][0] === "Panes"
    ) {
      panes = await Promise.all(
        block.collection.data.map(async (row) => {
          const blocks = await fetch(
            `https://notion-api.bypaulshen.com/v1/page/${row.id}`
          ).then((res) => res.json());
          return {
            id: row.id,
            name: row.Name[0][0],
            blocks,
          };
        })
      );
    }
  }

  return {
    props: {
      blocks,
      post,
      panes,
      exercises,
    },
    revalidate: 10,
  };
};

const Page = ({ post, blocks, panes, exercises }) => {
  if (post === undefined) {
    return null;
  }
  return (
    <div className="max-w-xl pt-24 pb-32 px-4 mx-auto">
      <Head>
        <title>{`${post["Title"]} | Paul Shen`}</title>
        <meta property="og:title" content={post["Title"]} />
        {post["Description"] ? (
          <meta property="og:description" content={post["Description"]} />
        ) : null}
        {post["Image"] !== undefined && post["Image"][0] !== undefined ? (
          <>
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="og:image" content={post["Image"][0].url} />
          </>
        ) : (
          <>
            <meta property="twitter:card" content="summary" />
          </>
        )}
      </Head>
      <h1 className="text-3xl mb-12 font-semibold">{post["Title"]}</h1>
      <NotionRenderer
        blockMap={blocks}
        panes={panes}
        exercises={exercises}
        renderEditor={renderEditor}
      />
      <div className="mt-4 mb-16 text-gray-400 text-xs">
        {formatDate(post["Date"], true)}
      </div>
      <div className="border-t border-gray-100 pt-4 text-xs text-gray-400">
        Browse more{" "}
        <Link href="/posts">
          <a className="underline">posts</a>
        </Link>{" "}
        or follow on{" "}
        <a href="https://twitter.com/_paulshen" className="underline">
          Twitter
        </a>
        .
      </div>
    </div>
  );
};
export default Page;

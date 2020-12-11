import Link from "next/link";

const NOTION_BLOG_ID = "d60770573fee487984f182b3a72fa803";

export const getAllPosts = async () => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`
  ).then((res) => res.json());
};

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

function HomePage({ posts }) {
  return (
    <div className="max-w-xl pt-16 pb-32 mx-auto">
      {posts.map((post) => (
        <div key={post.id}>
          <Link href="/posts/[slug]" as={`/posts/${post["Slug"]}`}>
            <a className="hover:underline">{post["Title"]}</a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default HomePage;

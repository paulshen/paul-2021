import Link from "next/link";
import { POSTS_TABLE_ID } from "../../Constants";
import { formatDate } from "../../Utils";

export const getAllPosts = async () => {
  const posts = await fetch(
    `https://notion-api.bypaulshen.com/v1/table/${POSTS_TABLE_ID}`
  ).then((res) => res.json());
  return process.env.NODE_ENV === "development"
    ? posts
    : posts.filter((p) => p["Publish"]);
};

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

function PostItem({ post }: { post: any }) {
  return (
    <div className="border-t border-gray-100">
      <Link href="/posts/[slug]" as={`/posts/${post["Slug"]}`}>
        <a className="block py-3 sm:py-4 sm:flex sm:items-center group">
          <div className="text-xs text-gray-400 sm:w-32">
            {post["Date"] !== undefined ? formatDate(post["Date"]) : null}
          </div>
          <div className="font-semibold group-hover:underline">
            {post["Title"]}
          </div>
        </a>
      </Link>
    </div>
  );
}

function PostsPage({ posts }) {
  return (
    <div className="max-w-xl pt-24 pb-32 px-4 mx-auto">
      <h1 className="text-3xl mb-12 font-semibold">Posts</h1>
      <div className="border-b border-gray-100">
        {posts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}

export default PostsPage;

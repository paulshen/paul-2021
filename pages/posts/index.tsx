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

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDate(dateString: string): string {
  const segments = dateString.split("-").map((s) => parseInt(s));
  return `${MONTHS[segments[1] - 1]} ${segments[0]}`;
}

function PostItem({ post }: { post: any }) {
  return (
    <div className="border-t border-gray-100 py-3 sm:py-4 group">
      <Link href="/posts/[slug]" as={`/posts/${post["Slug"]}`}>
        <a className="sm:flex sm:items-center">
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

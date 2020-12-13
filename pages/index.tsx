import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function StyledLink(props) {
  const { children, ...restProps } = props;
  return (
    <Link {...restProps}>
      <a className="text-gray-500 underline">{children}</a>
    </Link>
  );
}

const Page = ({ scribbles }) => {
  return (
    <div className="max-w-3xl sm:w-11/12 md:w-4/5 pt-24 lg:pt-32 pb-32 px-4 mx-auto">
      <Head>
        <title>Paul Shen</title>
      </Head>
      <div className="flex flex-col-reverse sm:flex-row sm:space-x-4">
        <div className="flex-1">
          <Image
            src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe498b6c0-e92f-4405-9ee5-6a38b8ba983a%2F35999786_217229322446458_3470015180652412928_n.jpg?table=block&id=cdaa3df5-bf38-45e9-8efc-66f9dd0d22dc&width=600&userId=61d31f4e-3212-4161-86d4-88c06257e749&cache=v2"
            layout="intrinsic"
            width={640}
            height={640}
          />
        </div>
        <div className="flex-1 pt-4">
          <p className="mb-4">Hi! I'm Paul.</p>
          <p className="mb-4">
            I'm trying to <StyledLink href="/posts">write</StyledLink> more
            about product engineering, developer tools, React, and other random
            things that pop in my head.
          </p>
          <p className="mb-4">
            I also <StyledLink href="/scribbles">draw</StyledLink> squiggly
            lines.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Page;

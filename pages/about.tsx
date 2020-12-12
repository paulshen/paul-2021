import React from "react";

function Paragraph({ children }) {
  return <p className="mb-4">{children}</p>;
}

function AboutPage() {
  return (
    <div className="max-w-xl pt-24 pb-32 px-4 mx-auto">
      <h1 className="text-3xl mb-12 font-semibold">Hi!</h1>
      <Paragraph>My name is Paul.</Paragraph>
      <Paragraph>
        I'm an engineer with a passion for design and technology. I've
        previously worked at Discord and Facebook.
      </Paragraph>
      <Paragraph>
        I enjoy making tools and working with programming languages. I usually
        work on product infrastructure, thinking about code ergonomics and
        scalable product engineering.
      </Paragraph>
      <Paragraph>
        You can find me occasionally posting on{" "}
        <a
          href="https://twitter.com/_paulshen"
          className="text-gray-500 underline"
        >
          Twitter
        </a>
        .
      </Paragraph>
    </div>
  );
}

export default AboutPage;

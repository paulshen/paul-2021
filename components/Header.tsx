import Link from "next/link";
import * as React from "react";

function MenuItem({ href, children }: { href: string; children: string }) {
  return (
    <div className="ml-4 lg:ml-0">
      <Link href={href}>
        <a className="text-gray-400 group-hover:text-gray-700 transition-colors text-xs leading-2 font-medium hover:underline">
          {children}
        </a>
      </Link>
    </div>
  );
}

export default function Header() {
  return (
    <div className="absolute group pt-4 px-4 flex left-0 top-0 right-0 items-center justify-between md:px-6 lg:fixed lg:right-auto lg:block lg:pl-10 lg:pt-10">
      <Link href="/">
        <a className="inline-block text-gray-200 lg:mb-8 hover:text-gray-800 transition-colors">
          paul shen
        </a>
      </Link>
      <div className="flex lg:block">
        <MenuItem href="/posts">Posts</MenuItem>
        <MenuItem href="/scribbles">Scribbles</MenuItem>
        <MenuItem href="/about">About</MenuItem>
      </div>
    </div>
  );
}

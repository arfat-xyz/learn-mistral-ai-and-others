"use client";
import Link from "next/link";
import React from "react";

const LinkButton = ({ href, value }: { href: string; value: string }) => {
  return (
    <Link
      href={href}
      className="mt-3 text-lg font-bold border-2 rounded-lg px-3 py-1 hover:text-white hover:border-transparent hover:bg-black transition-colors duration-300"
    >
      {value}
    </Link>
  );
};

export default LinkButton;

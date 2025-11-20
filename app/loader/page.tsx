"use client";
import React from 'react';
import dynamic from "next/dynamic";

const Page = () => {
  const LoaderHTML = dynamic(
    () => import('./LoaderHTML'),
    {ssr: false}
  );
  return (
    <div>
      <LoaderHTML/>
    </div>
  );
};

export default Page;

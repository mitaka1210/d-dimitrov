"use client";
import React from 'react';
import dynamic from "next/dynamic";

const Page = () => {
  const AddCommentsHTML = dynamic(
    () => import('./addCommentsHTML'),
    {ssr: false}
  );
  return (
    <div>
    </div>
  );
};

export default Page;

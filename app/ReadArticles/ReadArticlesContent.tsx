"use client";
import dynamic from "next/dynamic";

const ReadHtml = dynamic(() => import('./ReadHTML'), { ssr: false });
const FooterHTML = dynamic(() => import('../Footer-page/page'), { ssr: false });
const Navigation = dynamic(() => import('../Navigation-component/navigation'), { ssr: false });

export default function ReadArticlesContent() {
  return (
    <div>
      <Navigation />
      <ReadHtml />
      <FooterHTML />
    </div>
  );
}

'use client'

import React from 'react';
import dynamic from "next/dynamic";

const ProjectsPage = () => {
  const ProjectsHtml = dynamic(
    () => import('./ProjectsHTML'),
    {ssr: false}
  );
  const FooterHTML = dynamic(
    () => import('../Footer-page/page'),
    {ssr: false}
  );
  const Navigation = dynamic(
    () => import('../Navigation-component/navigation'),
    {ssr: false}
  );
  return (
    <div className="projects-page">
      <div className="projects-nav flex-horizontal-container text-align-center justify-content-end align-items-center">
        <Navigation/>
      </div>
      <ProjectsHtml/>
      <FooterHTML/>
    </div>
  );
};

export default ProjectsPage;

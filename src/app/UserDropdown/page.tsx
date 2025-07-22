'use client'

import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import './about.scss';
import SEO from "@/app/SEO/seo";
const AboutHtml = dynamic(
    () => import('./userDropdown'),
    {ssr: false}
);
const AboutPage = () => {
    return (
        <>     {/* SEO мета тагове */}
            <main className="images">
                <div>
                        <section>
                            <main className='user-dropdown-section'>
                                <AboutHtml/>
                            </main>
                        </section>
                </div>
            </main>
        </>
    )

};

export default AboutPage;

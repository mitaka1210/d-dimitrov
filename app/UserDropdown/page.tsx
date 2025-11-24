'use client'

import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import SEO from "../SEO/seo";
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
                                <AboutHtml userLoginName={undefined}/>
                            </main>
                        </section>
                </div>
            </main>
        </>
    )

};

export default AboutPage;

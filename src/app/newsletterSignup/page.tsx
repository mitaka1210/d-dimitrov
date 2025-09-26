'use client'

import React from 'react';
import dynamic from 'next/dynamic';

const Newsletter = dynamic(() => import('./newsletterSignup'), { ssr: false });
const Page = () => {
    return (
        <>
            {/* Основно съдържание */}
            <div className="blog-page">
                <Newsletter />
            </div>
        </>
    );
};

export default Page;

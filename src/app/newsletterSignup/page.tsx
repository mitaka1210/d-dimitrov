'use client'

import React, { useEffect, useState } from 'react';
import './blog.scss';
import dynamic from 'next/dynamic';
import SEO from '../SEO/seo';

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

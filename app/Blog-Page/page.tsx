'use client'

import React, { useEffect, useState } from 'react';
import './blog.scss';
import dynamic from 'next/dynamic';
import SEO from '../SEO/seo';

const BlogHtml = dynamic(() => import('./BlogHTML'), { ssr: false });
const FooterHTML = dynamic(() => import('../Footer-page/page'), { ssr: false });
const Navigation = dynamic(() => import('../Navigation-component/navigation'), { ssr: false });

const Page = () => {
    const [language, setLanguage] = useState('en');
    const [pageUrl, setUrl ] = useState('');

    useEffect(() => {
        const storedLang = localStorage.getItem("i18nextLng") || 'en';
        setLanguage(storedLang);
        document.title = storedLang === 'bg' ? 'Блог - Димитър Димитров' : 'Blog - Dimitar Dimitrov';
        setUrl (window.location.href != '' ? window.location.href : window.location.origin);
    }, []);
    const title = language === 'bg' ? 'Блог - Димитър Димитров' : 'Blog - Dimitar Dimitrov';
    const description = language === 'bg'
        ? "Чети статии за програмиране и акваристика. Последните новини и съвети от Димитър Димитров."
        : "Read articles about programming and aquariums. Latest news and tips from Dimitar Dimitrov.";
    return (
        <>
            {/* SEO мета тагове */}
            <SEO title={title} description={description} url={pageUrl} lang={language} />
            {/* Основно съдържание */}
            <div className="blog-page">
                <div className="nav-bar-blog flex-vertical-container text-align-center justify-content-end">
                    <Navigation />
                </div>
                <BlogHtml />
                <FooterHTML />
            </div>
        </>
    );
};

export default Page;

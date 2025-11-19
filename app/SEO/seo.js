import Head from 'next/head';
import img from '../../assets/images/blog-img.png'
const SEO = ({ title, description, url, lang = 'en' }) => {
    const siteName = "eng.Dimitar Dimitrov";
    const defaultImage = {img};
    const image = defaultImage;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content="blog, programming, frontend, React, Angular, aquariums, аквариуми, програмиране" />
            <meta name="author" content="Dimitar Dimitrov" />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image || defaultImage} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image || defaultImage} />

            {/* Schema.org Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": title,
                    "description": description,
                    "url": url,
                    "image": image || defaultImage,
                    "publisher": {
                        "@type": "Person",
                        "name": "Dimitar Dimitrov"
                    }
                })}
            </script>
        </Head>
    );
};

export default SEO;

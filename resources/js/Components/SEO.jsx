import React from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function SEO({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website'
}) {
    const { settings = {} } = usePage().props;

    const siteName = settings.site_name || 'Izymail';
    const defaultDescription = settings.site_description || 'Solution d\'emailing professionnelle haute performance pour le marché africain.';
    const finalTitle = title ? `${title} | ${siteName}` : `${siteName} - ${defaultDescription}`;
    const finalDescription = description || defaultDescription;
    const finalUrl = url || window.location.href;
    const finalImage = image || `${window.location.origin}/images/og-image.png`; // Fallback to a default OG image

    return (
        <Head>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            {keywords && <meta name="keywords" content={keywords} />}

            <link rel="canonical" href={finalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={finalUrl} />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />

            {/* Theme Color for mobile browsers */}
            <meta name="theme-color" content="#4f46e5" />
        </Head>
    );
}

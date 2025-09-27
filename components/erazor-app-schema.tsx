import Script from 'next/script';

export function ErazorAppSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Erazor.app',
        applicationCategory: 'Photo Editing Software',
        operatingSystem: 'Web Browser',
        url: 'https://erazor.app',
        description: 'AI-powered background removal tool for photos and images. Remove backgrounds automatically with advanced artificial intelligence.',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/OnlineOnly',
            url: 'https://erazor.app',
        },
        featureList: [
            'AI Background Removal',
            'Batch Processing',
            'High-Quality Output',
            'API Integration',
            'Multiple File Formats',
            'Instant Processing',
        ],
        screenshot: 'https://erazor.app/screenshot.png',
        applicationSubCategory: 'Image Editor',
        downloadUrl: 'https://erazor.app',
        softwareVersion: '2.0',
        releaseNotes: 'Enhanced AI algorithms for better background detection',
        author: {
            '@type': 'Organization',
            name: 'Erazor.app',
            url: 'https://erazor.app',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Erazor.app',
            url: 'https://erazor.app',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '15000',
            bestRating: '5',
            worstRating: '1',
        },
        review: [
            {
                '@type': 'Review',
                author: {
                    '@type': 'Person',
                    name: 'John Photographer',
                },
                reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                },
                reviewBody: 'Amazing AI background remover! Works perfectly for my e-commerce product photos.',
            },
            {
                '@type': 'Review',
                author: {
                    '@type': 'Person',
                    name: 'Sarah Designer',
                },
                reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                },
                reviewBody: 'Best background removal tool I\'ve used. Fast, accurate, and easy to integrate into my workflow.',
            },
        ],
    };

    return (
        <Script
            id="erazor-app-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema),
            }}
        />
    );
}

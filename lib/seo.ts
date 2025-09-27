import { siteConfig } from './site';

export interface SEOData {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    author?: {
        name: string;
        url?: string;
    };
    datePublished?: string;
    dateModified?: string;
    type?: 'website' | 'article' | 'blog';
    readTime?: string;
    wordCount?: number;
    category?: string;
}

export function generateCanonicalUrl(path: string): string {
    return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function generateOpenGraphTags(data: SEOData) {
    const url = data.url || siteConfig.url;
    const image = data.image ? `${siteConfig.url}${data.image}` : `${siteConfig.url}/blog-og-image.png`;

    return {
        'og:type': data.type === 'article' ? 'article' : 'website',
        'og:title': data.title,
        'og:description': data.description,
        'og:image': image,
        'og:url': url,
        'og:site_name': siteConfig.name,
        'og:locale': 'en_US',
        ...(data.type === 'article' && {
            'article:published_time': data.datePublished,
            'article:modified_time': data.dateModified || data.datePublished,
            'article:author': data.author?.name || 'Erazor.app Team',
            'article:section': data.category || 'Photo Editing',
            'article:tag': data.keywords?.join(','),
        }),
    };
}

export function generateTwitterTags(data: SEOData) {
    const image = data.image ? `${siteConfig.url}${data.image}` : `${siteConfig.url}/blog-og-image.png`;

    return {
        'twitter:card': 'summary_large_image',
        'twitter:site': '@erazorapp', // Erazor.app Twitter handle
        'twitter:creator': '@erazorapp', // Erazor.app Twitter handle
        'twitter:title': data.title,
        'twitter:description': data.description,
        'twitter:image': image,
    };
}

export function generateMetaKeywords(data: SEOData): string[] {
    const baseKeywords = [
        'Erazor.app',
        'AI Background Remover',
        'Photo Editing',
        'Background Removal',
        'Image Processing',
        'AI Tools',
    ];

    return [
        ...baseKeywords,
        ...(data.keywords || []),
        data.title.toLowerCase(),
    ].filter((keyword, index, self) => self.indexOf(keyword) === index);
}

export function generateRobotsTags(options: {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
    maxSnippet?: number;
    maxImagePreview?: 'none' | 'standard' | 'large';
    maxVideoPreview?: number;
} = {}) {
    const {
        index = true,
        follow = true,
        noarchive = false,
        nosnippet = false,
        noimageindex = false,
        maxSnippet,
        maxImagePreview = 'large',
        maxVideoPreview,
    } = options;

    const robots = [];

    robots.push(index ? 'index' : 'noindex');
    robots.push(follow ? 'follow' : 'nofollow');

    if (noarchive) robots.push('noarchive');
    if (nosnippet) robots.push('nosnippet');
    if (noimageindex) robots.push('noimageindex');
    if (maxSnippet) robots.push(`max-snippet:${maxSnippet}`);
    if (maxImagePreview) robots.push(`max-image-preview:${maxImagePreview}`);
    if (maxVideoPreview) robots.push(`max-video-preview:${maxVideoPreview}`);

    return robots.join(', ');
}

export function calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
}

export function extractWordCount(content: string): number {
    return content.trim().split(/\s+/).length;
}

export function generateAlternateLanguages(path: string) {
    // Add support for multiple languages if needed
    return {
        'en-US': generateCanonicalUrl(path),
        // 'es-ES': generateCanonicalUrl(`/es${path}`),
        // Add more languages as needed
    };
}

export function generateBreadcrumbs(path: string, title?: string) {
    const segments = path.split('/').filter(Boolean);
    const breadcrumbs = [
        { name: 'Home', url: '/' },
    ];

    let currentPath = '';
    segments.forEach((segment, index) => {
        currentPath += `/${segment}`;

        if (index === segments.length - 1 && title) {
            breadcrumbs.push({
                name: title,
                url: currentPath,
            });
        } else {
            breadcrumbs.push({
                name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
                url: currentPath,
            });
        }
    });

    return breadcrumbs;
}

export function generateArticleSchema(data: SEOData & {
    url: string;
    content?: string;
}) {
    const wordCount = data.content ? extractWordCount(data.content) : data.wordCount || 0;
    const readTime = data.content ? calculateReadTime(data.content) : data.readTime || '5 min read';

    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image ? `${siteConfig.url}${data.image}` : `${siteConfig.url}/blog-og-image.png`,
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        author: {
            '@type': 'Person',
            name: data.author?.name || 'Erazor AI',
            url: data.author?.url || siteConfig.url,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Erazor.app',
            url: 'https://erazor.app',
            logo: {
                '@type': 'ImageObject',
                url: `${siteConfig.url}/logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url,
        },
        wordCount,
        timeRequired: readTime,
        keywords: data.keywords?.join(', '),
        articleSection: data.category || 'Photo Editing',
        inLanguage: 'en-US',
    };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

export function generateHowToSchema(steps: { name: string; text: string; image?: string }[], name: string, description: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text,
            ...(step.image && {
                image: {
                    '@type': 'ImageObject',
                    url: `${siteConfig.url}${step.image}`,
                },
            }),
        })),
    };
}

// Helper to generate comprehensive metadata for Next.js
export function generatePageMetadata(data: SEOData) {
    const canonical = data.url || siteConfig.url;
    const ogTags = generateOpenGraphTags(data);
    const twitterTags = generateTwitterTags(data);
    const keywords = generateMetaKeywords(data);

    return {
        title: data.title,
        description: data.description,
        keywords: keywords.join(', '),
        authors: data.author ? [{ name: data.author.name, url: data.author.url }] : undefined,
        creator: data.author?.name || 'Erazor AI',
        publisher: 'Erazor AI',
        robots: generateRobotsTags(),
        alternates: {
            canonical,
            languages: generateAlternateLanguages(new URL(canonical).pathname),
        },
        openGraph: {
            type: ogTags['og:type'] as 'website' | 'article',
            title: ogTags['og:title'],
            description: ogTags['og:description'],
            url: ogTags['og:url'],
            siteName: ogTags['og:site_name'],
            images: [
                {
                    url: ogTags['og:image'],
                    width: 1200,
                    height: 630,
                    alt: data.title,
                },
            ],
            locale: ogTags['og:locale'],
            ...(data.type === 'article' && {
                publishedTime: data.datePublished,
                modifiedTime: data.dateModified || data.datePublished,
                authors: [data.author?.name || 'Erazor.app Team'],
                section: data.category || 'Photo Editing',
                tags: data.keywords,
            }),
        },
        twitter: {
            card: 'summary_large_image',
            site: twitterTags['twitter:site'],
            creator: twitterTags['twitter:creator'],
            title: twitterTags['twitter:title'],
            description: twitterTags['twitter:description'],
            images: [twitterTags['twitter:image']],
        },
    };
}

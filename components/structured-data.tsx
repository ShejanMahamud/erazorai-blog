import { siteConfig } from '@/lib/site';
import Script from 'next/script';

interface ArticleData {
    title: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    author?: {
        name: string;
        url?: string;
    };
    url: string;
    wordCount?: number;
    readTime?: string;
    keywords?: string[];
    category?: string;
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbData {
    items: BreadcrumbItem[];
}

interface StructuredDataProps {
    type: 'Website' | 'Blog' | 'Article' | 'Organization' | 'Breadcrumb';
    data: ArticleData | BreadcrumbData | null;
}export function StructuredData({ type, data }: StructuredDataProps) {
    const generateStructuredData = () => {
        switch (type) {
            case 'Website':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    name: siteConfig.name,
                    url: siteConfig.url,
                    description: siteConfig.description,
                    potentialAction: {
                        '@type': 'SearchAction',
                        target: {
                            '@type': 'EntryPoint',
                            urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
                        },
                        'query-input': 'required name=search_term_string',
                    },
                    publisher: {
                        '@type': 'Organization',
                        name: 'Erazor.app',
                        url: 'https://erazor.app',
                        logo: {
                            '@type': 'ImageObject',
                            url: `${siteConfig.url}/logo.png`,
                        },
                        description: 'AI-powered background removal tool for photos',
                    },
                };

            case 'Organization':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: 'Erazor.app',
                    url: 'https://erazor.app',
                    logo: {
                        '@type': 'ImageObject',
                        url: `${siteConfig.url}/logo.png`,
                    },
                    description: 'AI-powered background removal tool for photos and images',
                    applicationCategory: 'Photo Editing Software',
                    operatingSystem: 'Web Browser',
                    sameAs: [
                        'https://twitter.com/erazor_ai',
                        'https://github.com/erazor-ai',
                        'https://erazor.app',
                    ],
                    contactPoint: {
                        '@type': 'ContactPoint',
                        contactType: 'customer service',
                        availableLanguage: 'English',
                    },
                };

            case 'Blog':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'Blog',
                    name: `${siteConfig.name} - Blog`,
                    description: siteConfig.description,
                    url: `${siteConfig.url}/blog`,
                    publisher: {
                        '@type': 'Organization',
                        name: 'Erazor.app',
                        url: 'https://erazor.app',
                    },
                    mainEntityOfPage: {
                        '@type': 'WebPage',
                        '@id': `${siteConfig.url}/blog`,
                    },
                };

            case 'Article':
                if (!data || !('title' in data)) return null;
                const articleData = data as ArticleData;
                return {
                    '@context': 'https://schema.org',
                    '@type': 'Article',
                    headline: articleData.title,
                    description: articleData.description,
                    image: articleData.image ? `${siteConfig.url}${articleData.image}` : undefined,
                    datePublished: articleData.datePublished,
                    dateModified: articleData.dateModified || articleData.datePublished,
                    author: {
                        '@type': 'Person',
                        name: articleData.author?.name || 'Erazor.app Team',
                        url: articleData.author?.url || 'https://erazor.app',
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
                        '@id': articleData.url,
                    },
                    wordCount: articleData.wordCount,
                    timeRequired: articleData.readTime,
                    keywords: articleData.keywords?.join(', '),
                    articleSection: articleData.category,
                    inLanguage: 'en-US',
                };

            case 'Breadcrumb':
                if (!data || !('items' in data)) return null;
                const breadcrumbData = data as BreadcrumbData;
                return {
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: breadcrumbData.items?.map((item: BreadcrumbItem, index: number) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        name: item.name,
                        item: item.url,
                    })),
                };

            default:
                return null;
        }
    };

    const structuredData = generateStructuredData();

    if (!structuredData) return null;

    return (
        <Script
            id={`structured-data-${type.toLowerCase()}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData),
            }}
        />
    );
}

// Specific components for common use cases
export function WebsiteStructuredData() {
    return <StructuredData type="Website" data={null} />;
}

export function OrganizationStructuredData() {
    return <StructuredData type="Organization" data={null} />;
}

export function BlogStructuredData() {
    return <StructuredData type="Blog" data={null} />;
}

interface ArticleStructuredDataProps {
    title: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    author?: {
        name: string;
        url?: string;
    };
    url: string;
    wordCount?: number;
    readTime?: string;
    keywords?: string[];
    category?: string;
}

export function ArticleStructuredData(props: ArticleStructuredDataProps) {
    return <StructuredData type="Article" data={props} />;
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbStructuredDataProps {
    items: BreadcrumbItem[];
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
    return <StructuredData type="Breadcrumb" data={{ items }} />;
}

import { siteConfig } from '@/lib/site';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    // Manual list of blog posts - you can also generate this dynamically
    const blogSlugs = [
        'best-ai-image-upscaling-tools-2025',
        'the-best-ai-background-remover-tools-in-2025',
        'top-ai-photo-editing-tools-2025',
    ];

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: siteConfig.url,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${siteConfig.url}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ];

    const blogPosts: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
        url: `${siteConfig.url}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...blogPosts];
}

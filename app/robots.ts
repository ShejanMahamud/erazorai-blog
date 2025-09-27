import { siteConfig } from '@/lib/site';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/private/',
                    '/admin/',
                    '/_next/',
                    '/api/',
                ],
            },
            {
                userAgent: 'GPTBot',
                disallow: '/', // Block OpenAI's GPT bot if desired
            },
            {
                userAgent: 'ChatGPT-User',
                disallow: '/', // Block ChatGPT user agent if desired
            },
            {
                userAgent: 'CCBot',
                disallow: '/', // Block Common Crawl bot if desired
            },
            {
                userAgent: 'anthropic-ai',
                disallow: '/', // Block Anthropic's Claude bot if desired
            },
        ],
        sitemap: `${siteConfig.url}/sitemap.xml`,
        host: siteConfig.url,
    };
}

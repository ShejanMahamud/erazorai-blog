import { docs, meta } from "@/.source";
import { getAuthor } from "@/lib/authors";
import { calculateReadTime, extractWordCount, generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { Metadata } from "next";

const blogSource = loader({
  baseUrl: "/blog",
  source: createMDXSource(docs, meta),
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;

    if (!slug || slug.length === 0) {
      return {
        title: "Blog Post Not Found - Erazor AI Blog",
        description: "The requested blog post could not be found.",
        robots: "noindex, nofollow",
      };
    }

    const page = blogSource.getPage([slug]);

    if (!page) {
      return {
        title: "Blog Post Not Found - Erazor AI Blog",
        description: "The requested blog post could not be found.",
        robots: "noindex, nofollow",
      };
    }

    const url = `${siteConfig.url}/blog/${slug}`;
    const author = page.data.author ? getAuthor(page.data.author) : null;

    // Extract content for word count and read time calculation
    const content = page.data.body?.toString() || '';
    const wordCount = extractWordCount(content);
    const readTime = calculateReadTime(content);

    // Enhanced keywords combining page tags and content analysis
    const enhancedKeywords = [
      page.data.title,
      ...(page.data.tags || []),
      "Erazor.app",
      "AI Background Remover",
      "Photo Editing",
      "Image Processing",
      "Background Removal",
      "AI Tools",
      "Photo Enhancement",
      "Image Editor",
      siteConfig.name,
      ...(author?.name ? [author.name] : []),
    ];

    return generatePageMetadata({
      title: `${page.data.title} | ${siteConfig.name}`,
      description: page.data.description || "Read this comprehensive guide on our blog.",
      keywords: enhancedKeywords,
      url,
      type: 'article',
      author: author ? {
        name: author.name,
        url: 'https://erazor.app', // Link to main Erazor.app site
      } : {
        name: 'Erazor.app Team',
        url: 'https://erazor.app',
      },
      datePublished: page.data.date,
      dateModified: page.data.date, // Using datePublished as dateModified since updatedDate doesn't exist
      image: page.data.thumbnail,
      readTime,
      wordCount,
      category: page.data.tags?.[0] || 'Photo Editing',
    });
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error Loading Blog Post - Erazor AI Blog",
      description: "An error occurred while loading the blog post.",
      robots: "noindex, nofollow",
    };
  }
}

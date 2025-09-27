import { siteConfig } from "@/lib/site";
import { Metadata } from "next";

export const metadataKeywords = [
    "Erazor.app",
    "Erazor AI",
    "AI Background Remover",
    "Remove Background",
    "Photo Background Remover",
    "Image Background Removal",
    "AI Photo Editor",
    "Automatic Background Removal",
    "Background Eraser",
    "Photo Editing Tool",
    "AI Image Processing",
    "Remove Photo Background",
    "Background Removal API",
    "Bulk Background Removal",
    "E-commerce Photo Editing",
    "Product Photo Editor",
    "Portrait Background Remover",
    "Green Screen Alternative",
    "Cut Out Background",
    "Transparent Background",
    "PNG Background Remover",
    "Background Changer",
    "AI Cutout Tool",
    "Photo Editing Tutorial",
    "Background Removal Tips",
    "Image Editing Blog",
    "AI Tools Blog",
    "Creative Photography",
    "Digital Art Tools",
    "Online Photo Editor"
]

export const metadata: Metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
    keywords: metadataKeywords,
    authors: [
        {
            name: "Erazor.app Team",
            url: "https://erazor.app",
        },
    ],
    creator: "Erazor.app",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: `${siteConfig.url}/blog-og-image.png`,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        creator: "@erazorapp", // Update with Erazor.app's Twitter handle
        images: [`${siteConfig.url}/blog-og-image.png`],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    category: "Photography & AI Tools",
    classification: "AI Background Removal and Photo Editing Blog",
    referrer: "origin-when-cross-origin",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
};
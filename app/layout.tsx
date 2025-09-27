import "@/app/globals.css";
import { ErazorAppSchema } from "@/components/erazor-app-schema";
import Footer from "@/components/footer";
import { SiteNav } from "@/components/site-nav";
import { OrganizationStructuredData, WebsiteStructuredData } from "@/components/structured-data";
import { ThemeProvider } from "@/components/theme-provider";
import { generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { metadataKeywords } from "./metadata";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = generatePageMetadata({
  title: `${siteConfig.name} - AI-Powered Background Remover & Photo Editor | Blog`,
  description: siteConfig.description,
  keywords: metadataKeywords,
  url: siteConfig.url,
  type: 'website',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
        <WebsiteStructuredData />
        <OrganizationStructuredData />
        <ErazorAppSchema />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteNav />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

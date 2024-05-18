import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/layout/Nav";
import Providers from "@/components/layout/CustomProviders";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers";
import { customColors } from "@/lib/colors";
import GoogleAnalytics from "@/components/layout/CustomGoogleAnalytics";
import { Footer } from "@/components/layout/Footer";
import getConfig from "next/config";
import { GeistSans } from "geist/font/sans";

const { publicRuntimeConfig } = getConfig();

export const metadata: Metadata = {
  title: "Akash Network Stats",
  description: "Akash Network Stats",
  metadataBase: new URL("https://stats.akash.network"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stats.akash.network/",
    siteName: "Akash Stats",
    description: "Akash Network Analytics. The #1 decentralized supercloud.",
    images: [
      {
        url: "https://stats.akash.network/akash-stats.png",
        width: 1200,
        height: 630,
        alt: "Akash Stats Cover Image"
      }
    ]
  },
  twitter: {
    site: "@akashnet_",
    card: "summary_large_image"
  },
  icons: [
    {
      url: "/favicon.ico",
      href: "/favicon.ico",
      rel: "shortcut icon"
    },
    {
      sizes: "16x16",
      url: "/favicon-16x16.png",
      href: "/favicon-16x16.png",
      rel: "icon",
      type: "image/png"
    },
    {
      sizes: "32x32",
      url: "/favicon-32x32.png",
      href: "/favicon-32x32.png",
      rel: "icon",
      type: "image/png"
    },
    {
      url: "/safari-pinned-tab.svg",
      href: "/safari-pinned-tab.svg",
      rel: "mask-icon",
      color: customColors.dark
    },
    {
      url: "/apple-touch-icon.png",
      href: "/apple-touch-icon.png",
      rel: "apple-touch-icon"
    }
  ]
};

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: "device-width"
};

/**
 * Get the theme from the cookie
 * next-themes doesn't support SSR
 * https://github.com/pacocoursey/next-themes/issues/169
 */
function getTheme() {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get("theme");
  const theme = themeCookie ? themeCookie.value : "system";
  return theme;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = getTheme() as string;
  const version = publicRuntimeConfig?.version;

  return (
    <html lang="en" className={theme} style={{ colorScheme: theme }} suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background tracking-wide antialiased font-sans", GeistSans.variable)}>
        <Providers>
          <div className="flex min-h-[calc(100vh-60px)] flex-col justify-between">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

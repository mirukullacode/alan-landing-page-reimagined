import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Barlow_Condensed,
  DM_Mono,
} from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor" 
import { ThemeProvider } from "@/components/ui/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tryalan.ai"),

  title: "Alan — Ship software. Faster.",

  description:
    "Alan orchestrates your agents, code, tests, and deployments.",

  openGraph: {
    title: "Alan — Ship software. Faster.",

    description:
      "Alan orchestrates your agents, code, tests, and deployments.",

    url: "https://tryalan.ai",

    siteName: "Alan",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alan — Ship software. Faster.",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Alan — Ship software. Faster.",

    description:
      "Alan orchestrates your agents, code, tests, and deployments.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: "/tryalanai_logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`
        dark
        ${geistSans.variable}
        ${geistMono.variable}
        ${instrumentSerif.variable}
        ${barlowCondensed.variable}
        ${dmMono.variable}
        antialiased
      `}
    >
      <body className="min-h-screen flex flex-col bg-[#111111] text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <Navbar />
          <CustomCursor/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
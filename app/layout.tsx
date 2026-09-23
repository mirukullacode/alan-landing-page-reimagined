import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Barlow_Condensed, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import SmoothScroll from "@/components/SmoothScroll";

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
  title: "Alan",
  description: "The control plane for Software Teams",
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
      className={`dark ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${barlowCondensed.variable} ${dmMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ChatLauncher from "@/components/ui/ChatLauncher";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohamadhanafi.io"),
  title: "Mohamad Hanafi",
  description:
    "Portfolio website for Mohamad Hanafi, AI and software developer.",
  openGraph: {
    title: "Mohamad Hanafi",
    description:
      "Portfolio website for Mohamad Hanafi, AI and software developer.",
    url: "/",
    siteName: "Mohamad Hanafi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohamad Hanafi portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamad Hanafi",
    description:
      "Portfolio website for Mohamad Hanafi, AI and software developer.",
    images: ["/og-image.png"],
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
      className={`${jakarta.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="h-full overflow-hidden">
        <Navbar />
        <div
          data-page-content
          className="portfolio-page-shell flex h-screen flex-col overflow-y-auto px-0 pb-20 pt-24"
        >
          {children}
        </div>
        <ChatLauncher />
        <Footer />
      </body>
    </html>
  );
}

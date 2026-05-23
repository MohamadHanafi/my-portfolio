import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohamad Hanafi",
  description: "Portfolio website",
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
        <div className="flex h-screen flex-col overflow-y-auto px-0 pb-20 pt-24">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

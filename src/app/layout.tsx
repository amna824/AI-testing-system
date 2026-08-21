"use client";

import { Lato, Urbanist } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";

import Header from "@/layout/header";
import Footer from "@/layout/footer";

const headingFont = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
      >
        {!isAuthPage && (
          <div className="header-wrapper">
            <Header />
          </div>
        )}
        
        <main>{children}</main>
        
        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}
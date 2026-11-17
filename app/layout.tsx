import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Atmosphere from "@/components/Atmosphere";
import FloatingHUD from "@/components/FloatingHUD";

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Huỳnh Anh Tuấn — Full-stack Developer",
  description:
    "Portfolio của Huỳnh Anh Tuấn (GitHub @tuanhuynh1704), Full-stack Developer — React/TypeScript frontend, Java/Go backend. Các dự án: EaAgri, INNTECH CLUB.",
  openGraph: {
    title: "Huỳnh Anh Tuấn — Full-stack Developer",
    description:
      "Portfolio của Huỳnh Anh Tuấn (GitHub @tuanhuynh1704), Full-stack Developer — React/TypeScript frontend, Java/Go backend. Các dự án: EaAgri, INNTECH CLUB.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={sans.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={sans.className}>
        <Atmosphere />
        <Header />
        {children}
        <Footer />
        <FloatingHUD />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Layashree Adepu | Data Engineer & Analyst",
  description: "Professional portfolio of Layashree Adepu, a Data Engineer and Analyst specializing in data mining, ETL pipelines, and analytics",
  keywords: [
    "Data Engineer",
    "Data Analyst",
    "Python",
    "SQL",
    "ETL",
    "Data Mining",
    "Big Data",
    "Tableau",
    "Power BI",
    "Portfolio"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <CustomCursor />
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

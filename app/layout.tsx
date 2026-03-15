import type { Metadata } from "next";

import "./globals.css";
import { ThemeProviderWrapper } from "./providers/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import * as fonts  from './font/fonts' 
import Accmanager from "./components/accmanager";
import { IoSettings } from "react-icons/io5";
// import  {}


export const metadata: Metadata = {
  metadataBase: new URL("https://tudortodo.vercel.app"),

  title: {
    default: "TudorTodo",
    template: "%s | TudorTodo",
  },

  description:
    "TudorTodo is a customizable minimalist to-do app built with Next.js for focused productivity.",

  authors: [{ name: "RK | Red" }],
  creator: "RK | Red",
  publisher: "TudorTodo",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "TudorTodo",
    description:
      "A customizable minimalist to-do app designed for focus and productivity.",
    url: "https://tudortodo.vercel.app",
    siteName: "TudorTodo",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TudorTodo",
    description:
      "A customizable minimalist to-do app designed for focus and productivity.",
  },

  category: "technology",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`top-10 antialiased ${fonts.geistMono.className} bg-background/50  font-sans`}
      >

        <ThemeProviderWrapper>
          {children}
          </ThemeProviderWrapper>
      </body>
    </html>
  );
}

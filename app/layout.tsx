import type { Metadata } from "next";

import "./globals.css";
import { ThemeProviderWrapper } from "./providers/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import * as fonts from "./font/fonts";

export const metadata: Metadata = {
	metadataBase: new URL("https://tudortodo.vercel.app"),

	title: {
		default: "TudorTodo",
		template: "%s | TudorTodo",
	},

	description:
		"TudorTodo is a customizable minimalist to-do app built with Next.js for focused productivity and clean task management.",

	keywords: [
		"TudorTodo",
		"to-do app",
		"task manager",
		"productivity",
		"minimalist",
		"customizable",
		"daily planner",
		"task tracking",
		"focus",
		"time management",
		"Next.js",
		"React",
		"TypeScript",
		"Tailwind CSS",
	],

	authors: [{ name: "RK | Red" }],
	creator: "RK | Red",
	publisher: "TudorTodo",

	applicationName: "TudorTodo",
	generator: "Next.js",
	referrer: "origin-when-cross-origin",

	alternates: {
		canonical: "/",
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-video-preview": -1,
			"max-snippet": -1,
		},
	},

	icons: {
		icon: "/WebIconList.ico",
	},

	openGraph: {
		title: "TudorTodo",
		description:
			"A customizable minimalist to-do app designed for focus and productivity.",
		url: "https://tudortodo.vercel.app",
		siteName: "TudorTodo",
		type: "website",
		images: ["/WebIconList.ico"],
	},

	twitter: {
		card: "summary_large_image",
		title: "TudorTodo",
		description:
			"A customizable minimalist to-do app designed for focus and productivity.",
		images: ["/WebIconList.ico"],
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
				<ThemeProviderWrapper>{children}</ThemeProviderWrapper>
			</body>
		</html>
	);
}

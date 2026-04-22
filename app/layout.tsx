import type { Metadata, Viewport } from "next";

import "./globals.css";
import { ThemeProviderWrapper } from "./providers/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import * as fonts from "./font/fonts";

const description =
	"Customizable minimalist to-do app for focused task management and productivity with Next.js.";

export const metadata: Metadata = {
	metadataBase: new URL("https://tudortodo.vercel.app"),

	title: {
		default: "TudorTodo",
		template: "%s | TudorTodo",
	},

	description,

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
		"task organizer",
		"project management",
	],

	authors: [{ name: "RK | Red" }],
	creator: "RK | Red",
	publisher: "TudorTodo",

	applicationName: "TudorTodo",
	category: "productivity",
	classification: "Task Management",
	generator: "Next.js",
	referrer: "origin-when-cross-origin",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},

	alternates: {
		canonical: "/",
	},

	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},

	icons: {
		icon: "/TudorLogo.ico",
		shortcut: "/favicon.ico",
		apple: "/TudorLogo.png",
		other: [
			{
				rel: "icon",
				url: "/TudorLogo.png",
			},
		],
	},

	openGraph: {
		title: "TudorTodo",
		description:
			"Customizable minimalist task management for focused productivity.",
		url: "https://tudortodo.vercel.app",
		siteName: "TudorTodo",
		type: "website",
		locale: "en_US",
		images: [
			{
				url: "https://tudortodo.vercel.app/TudorLogo.png",
				width: 512,
				height: 512,
				alt: "TudorTodo Logo",
			},
		],
	},

	twitter: {
		card: "summary_large_image",
		title: "TudorTodo",
		description:
			"Customizable minimalist task management for focused productivity.",
		creator: "@RiteshKharal",
		images: [
			{
				url: "https://tudortodo.vercel.app/TudorLogo.png",
				width: 512,
				height: 512,
				alt: "TudorTodo Logo",
			},
		],
	},
};

export const generateViewport = (): Viewport => ({
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
	colorScheme: "light dark",
});

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

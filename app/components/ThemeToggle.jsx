// Temporary button, add color choosings later on

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// eslint-disable-next-line react-hooks/set-state-in-effect
	useEffect(() => setMounted(true), []);
	if (!mounted) return null;

	return (
		<div className="flex gap-5">
			<button
				className="ColorThemeCard bg-white"
				onClick={() => {
					setTheme("light");
				}}
			></button>

			<button
				className="ColorThemeCard bg-black"
				onClick={() => {
					setTheme("dark");
				}}
			></button>

			<button
				className="ColorThemeCard bg-blue-900"
				onClick={() => {
					setTheme("blue");
				}}
			>
				{" "}
			</button>

			<button
				className="ColorThemeCard bg-red-900"
				onClick={() => {
					setTheme("red");
				}}
			>
				{" "}
			</button>
		</div>
	);
}

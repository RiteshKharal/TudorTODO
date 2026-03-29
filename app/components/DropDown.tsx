"use client";

import { ChevronDown } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Ubuntu, Nunito } from "next/font/google";
import { Ellipsis } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { ToggleTaskRead } from "../backend/TaskManager";

const ubuntu = Ubuntu({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	variable: "--font-ubuntu",
});

const nunito = Nunito({
	subsets: ["latin"],
	weight: ["200", "400", "600", "700", "900"],
	variable: "--font-nunito",
});

type ComponentTypes = {
	title: string | React.ReactNode;
	options: {
		OptionName: string | React.ReactNode;
		OptionCallBack: () => void;
	}[];
};

export function Component({ title, options }: ComponentTypes) {
	const [filterOpen, setFilterOpen] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setFilterOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="text-center content-center z-10">
			<div
				className={`${ubuntu.className} flex flex-row text-center gap-4 rounded-2xl overflow-visible z-10`}
			>
				<div ref={containerRef} className="relative h-2">
					<div
						onClick={() => setFilterOpen(!filterOpen)}
						className={`${nunito.className} flex items-center gap-2 rounded-lg text-center content-center place-content-center transition group`}
					>
						<span
							className={`text-center  ${
								filterOpen
									? "text-[hsla(240,10%,3.9%,0.8)] dark:text-[hsla(0,0%,98%,0.8)]"
									: "text-[hsla(240,10%,3.9%,0.6)] dark:text-[hsla(0,0%,98%,0.6)]"
							}`}
						>
							<span className="text-[hsla(240,10%,3.9%,0.9)] dark:text-[hsla(0,0%,98%,0.9)] font-bold mr-3 text-center  ">
								{title}
							</span>
						</span>
					</div>

					{filterOpen && (
						<div className="absolute top-full left-0 mt-2 w-44 bg-[hsla(0,0%,100%,0.9)] dark:bg-[hsla(240,10%,3%,0.9)] rounded-xl z-99 backdrop-blur-xl border border-border">
							<ul className="py-1 text-sm text-[hsla(240,10%,3.9%,1)] dark:text-[hsla(0,0%,98%,1)] text-center p-1">
								{options.map((opt, i) => (
									<li
										className="px-4 py-2 hover:bg-[hsla(240,10%,3.9%,0.1)] dark:hover:bg-[hsla(0,0%,98%,0.1)] cursor-pointer transition"
										onClick={() => {
											opt.OptionCallBack();
											setFilterOpen(false);
										}}
										key={i}
									>
										{opt.OptionName}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export function NavigationDropDown({
	TaskId,
	OnRead,
	OnDelete,
}: {
	TaskId: number;
	OnRead: () => void;
	OnDelete: () => void;
}) {
	return (
		<div className="invisible md:visible">
			<Component
				title={
					<span className="flex flex-row gap-3 text-center place-items-center justify-center self-center p-0 h-0 group-hover:animate-[Rotate180_1s_ease-in-out]">
						<Ellipsis className="drop-shadow-[0px_0px_10px_hsla(0,0%,0%,0.5)] dark:drop-shadow-[0px_0px_10px_hsla(100,100%,100%,0.5)]" />
					</span>
				}
				options={[
					{
						OptionName: <span className="">Toggle Task</span>,
						OptionCallBack: () => {
							OnRead();
						},
					},
					{
						OptionName: (
							<span className="text-red-600 font-semibold">Delete Task</span>
						),
						OptionCallBack: () => {
							OnDelete();
						},
					},
				]}
			/>
		</div>
	);
}

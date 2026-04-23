"use client";
import React, { useState, useEffect } from "react";
import * as fonts from "../font/fonts";
import TaskManager, {
	DeleteTask,
	ToggleTaskRead,
	UserTasks,
} from "../backend/TaskManager";

import { useSession } from "@/app/lib/auth-client";
import { NavigationDropDown } from "./DropDown";
import {
	LocalDeleteTask,
	LocalTaskManager,
	LocalToggleTaskRead,
	LocalUserTasks,
} from "../backend/LocalTaskManager";

export function TaskCard({
	id,
	title,
	desc,
	date,
	read,
	readToggle,
	HandleDelete,
}: {
	id: number;
	title: string;
	desc: string;
	date: string;
	read: boolean;
	readToggle: () => void;
	HandleDelete: () => void;
}) {
	const [checked, setChecked] = useState(read ?? false);
	const completed = checked;
	const hasDesc = Boolean(desc);

	useEffect(() => {
		setChecked(read ?? false);
	}, [read]);

	return (
		<button
			type="button"
			onClick={() => {
				readToggle();
			}}
			aria-pressed={checked}
			// title="Mark as Done"
			className={`
					w-full rounded-2xl
					min-h-20
					transition-all duration-300 ease-out
					border
					active:scale-102
					focus:outline-none cursor-pointer
					${
						completed
							? "bg-primary/15 border-primary/10"
							: "bg-foreground/5 border-foreground/7 hover:bg-foreground/10"
					}
					text-center
					`}
		>
			<div
				className={`relative flex flex-col  px-5 py-5
        ${hasDesc ? "gap-3" : "items-center gap-2"}`}
			>
				<h3
					className={`
						font-semibold tracking-tight
						transition-all duration-300
						${completed ? "line-through text-foreground/40" : "text-foreground"}
						${hasDesc ? "text-lg" : "text-2xl"}
						${fonts.quicksand.className}
					`}
				>
					{title}
				</h3>

				{hasDesc && (
					<p
						className={`
							text-sm leading-relaxed
							${completed ? "line-through text-foreground/30" : "text-foreground/70"}
							`}
					>
						{desc}
					</p>
				)}

				<div
					className={`
						absolute bottom-10 right-4
						bg-primary/10 text-primary
						px-3 py-1
						rounded-full
						text-xs font-semibold
						${completed ? "text-primary/50 bg-primary/20" : ""}
					`}
					title={date}
				>
					{date}
				</div>

				<div className="absolute top-6 left-4 cursor-pointer">
					<div
						className=""
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
					>
						<NavigationDropDown
							TaskId={id}
							OnRead={() => {
								readToggle();
							}}
							OnDelete={() => {
								HandleDelete();
							}}
						/>
					</div>
				</div>
			</div>
		</button>
	);
}

type TasksType = {
	id: number;
	title: string;
	description: string | null;
	date: string;
	read: boolean;
};

export function Task() {
	const session = useSession();
	const user = session?.data?.user;
	const [tasks, setTasks] = useState<TasksType[] | null>(null);

	useEffect(() => {
		UpdateTasks();
	}, [user]);

	async function UpdateTasks() {
		if (!user) {
			const t = LocalUserTasks;
			if (t) setTasks(t);
			return;
		}

		const t = await UserTasks();
		if (t) setTasks(t ?? null);
	}

	async function handleReadToggle(taskId: number) {
		if (!user) {
			LocalToggleTaskRead(taskId);

			UpdateTasks();

			return;
		}

		await ToggleTaskRead(taskId);
		UpdateTasks();
	}

	async function HandleDelete(TaskId: number) {
		if (!user) {
			LocalDeleteTask(TaskId);
			UpdateTasks();
			return;
		}
		await DeleteTask(TaskId);
		UpdateTasks();
	}

	return (
		<>
			<section className="w-full mt-[10%]">
				<form
					className="flex flex-col gap-5"
					action={async (formdata: FormData) => {
						if (!user) {
							const result = LocalTaskManager(formdata);
							if (result && result.toLowerCase().includes("success")) {
								UpdateTasks();
							}
						}

						const result = await TaskManager(formdata);
						if (result && result.toLowerCase().includes("success")) {
							UpdateTasks();
						}
					}}
				>
					<input
						type="text"
						name="TaskTitle"
						placeholder="Task"
						className="p-2 border border-border rounded-sm"
						required
					/>

					<textarea
						name="TaskDesc"
						placeholder="Task Description"
						className="p-2 resize-none border border-border rounded-sm"
						rows={4}
					/>

					<div className="w-full flex justify-between items-center">
						<input
							type="date"
							name="TaskDueTime"
							placeholder="Task Due time"
							className="p-2 rounded-xl cursor-pointer accent-foreground"
							min={new Date().toISOString().split("T")[0]}
							defaultValue={new Date().toISOString().split("T")[0]}
						/>
						<input
							type="submit"
							className={`p-3 bg-primary rounded-xl ${fonts.geistMono.className} text-background cursor-pointer hover:bg-primary/90`}
						/>
					</div>
				</form>
			</section>

			<section className="mt-[10%] w-full mb-[10%]">
				<h1 className={`text-2xl ${fonts.lilitaOne.className} mb-[2%]`}>
					Tasks
				</h1>
				<section className="flex flex-col gap-5">
					{tasks &&
						tasks.map((task, i) => (
							<TaskCard
								key={i}
								id={task.id}
								title={task.title}
								desc={task.description || ""}
								date={task.date}
								read={task.read}
								readToggle={() => handleReadToggle(task.id)}
								HandleDelete={() => {
									HandleDelete(task.id);
								}}
							/>
						))}
				</section>
			</section>
		</>
	);
}

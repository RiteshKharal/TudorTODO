"use client";

interface Task {
	id: number;
	title: string;
	description: string | null;
	date: string;
	read: boolean;
}

export function LocalTaskManager(formdata: FormData) {
	const Task = formdata.get("TaskTitle")?.toString();
	const TaskDesc = formdata.get("TaskDesc")?.toString() || null;
	const TaskDate = formdata.get("TaskDueTime")?.toString();

	if (!Task || !TaskDate) return null;

	const LocalTasks = localStorage.getItem("tasks");
	if (LocalTasks) {
		try {
			const current = JSON.parse(LocalTasks);

			current.push({
				id: current.length + 1,
				title: Task,
				description: TaskDesc,
				date: TaskDate,
				read: false,
			});

			localStorage.setItem("tasks", JSON.stringify(current));
			return "success";
		} catch (er) {
			console.log(er);
			return null;
		}
	} else {
		try {
			localStorage.setItem(
				"tasks",
				JSON.stringify([
					{
						id: 1,
						title: Task,
						description: TaskDesc,
						date: TaskDate,
						read: false,
					},
				]),
			);

			return "success";
		} catch (er) {
			console.log(er);
			return null;
		}
	}
}

export function LocalUserTasks() {
	const LocalTasks = localStorage.getItem("tasks");

	if (LocalTasks) {
		const current: Task[] = JSON.parse(LocalTasks);

		current.sort((a, b) => {
			if (a.read !== b.read) return Number(a.read) - Number(b.read);
			return b.id - a.id;
		});
		return current;
	}

	return null;
}

export function LocalToggleTaskRead(TaskID: number) {
	const LocalTasks = localStorage.getItem("tasks");

	if (LocalTasks) {
		const current: Task[] = JSON.parse(LocalTasks);

		const task = current.find((t) => t.id === TaskID);

		if (task) {
			task.read = !task.read;
			localStorage.setItem("tasks", JSON.stringify(current));
		}
	}

	return null;
}

export function LocalDeleteTask(TaskID: number) {
	const LocalTasks = localStorage.getItem("tasks");
	if (LocalTasks) {
		const current: Task[] = JSON.parse(LocalTasks);
		const updated = current.filter((t) => t.id !== TaskID);
		localStorage.setItem("tasks", JSON.stringify(updated));
	}
	return null;
}

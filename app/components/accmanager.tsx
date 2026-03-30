"use client";
import React, { useState, useEffect, ReactElement } from "react";
import * as fonts from "@/app/font/fonts";
import { MdAccountCircle } from "react-icons/md";
import { redirect, useRouter } from "next/navigation";
import { signIn, signUp, useSession } from "../lib/auth-client";
import { Loader, X, Check } from "lucide-react";

type AccManagerProps = {
	cardtype: string;
};

type UserType = {
	id: string;
	email: string;
	name: string;
	password: string;
};

interface FormErrorTypes {
	action: String | null;
	message: String | null;
}

type AuthError = {
	code?: string;
	message?: string;
	status: number;
	statusText: string;
};

type EmailVerefCardProps = {
	email: string | null;
};

export default function Accmanager({ cardtype }: AccManagerProps) {
	const router = useRouter();
	const { data: user, isPending } = useSession();
	const [lstype, setLstype] = useState<string | null>(null);
	const [out, setOut] = useState<ReactElement | null>(null);
	const [FormError, setFormError] = useState<null | AuthError | string>();
	const [loading, setLoading] = useState<boolean>(false);
	const [EmailVerefOpen, setEmailVerefOpen] = useState<string | null>(null);

	function ValidateData(formdata: FormData, exclude: string | null = null) {
		const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
		const email = EmailRegex.test(String(formdata.get("email")))
			? formdata.get("email")
			: null;
		const name = nameRegex.test(String(formdata.get("name")))
			? formdata.get("name")
			: null;
		const pass = formdata.get("password");

		if (!email && exclude !== "email") {
			setFormError("Invalid Email.");
		} else if (!name && exclude !== "name") {
			setFormError("Invalid Name.");
		} else if (!pass && exclude !== "password") {
			setFormError("Invalid Password.");
		} else {
			return formdata;
		}

		return null;
	}

	async function HandleSignSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formdata = new FormData(event.currentTarget);
		const ValidatedData = ValidateData(formdata);
		setLoading(true);

		if (
			!ValidatedData?.get("name") &&
			!ValidatedData?.get("password") &&
			!ValidatedData?.get("email")
		) {
			FormError ?? setFormError("Missing valid Info");
			setLoading(false);
			return;
		}

		const name = ValidatedData.get("name")?.toString() ?? "";
		const email = ValidatedData.get("email")?.toString() ?? "";
		const password = ValidatedData.get("password")?.toString() ?? "";

		const { data, error } = await signUp.email({
			name: name,
			email: email,
			password: password,
		});

		if (error) setFormError(error || "Something went wrong!");
		setLoading(false);

		if (data) {
			setLstype(null);
			setFormError(null);
			setLoading(false);
			setEmailVerefOpen(email);
			router.push("/");
		}
	}

	async function HandleLogSubmit(event: React.FormEvent<HTMLFormElement>) {
		setLoading(true);
		setFormError(null);
		event.preventDefault();
		const formdata = new FormData(event.currentTarget);
		const ValidatedData = ValidateData(formdata, "name");

		if (!ValidatedData?.get("password") && !ValidatedData?.get("email")) {
			setFormError("Missing valid Info");
			setLoading(false);
			return;
		}

		const email = ValidatedData.get("email")?.toString() ?? "";
		const password = ValidatedData.get("password")?.toString() ?? "";

		const { data, error } = await signIn.email({
			email: email,
			password: password,
		});

		if (error) setFormError(error || "Something went wrong!");
		setLoading(false);

		if (data) {
			setLstype(null);
			setLoading(false);
			setFormError(null);
			router.push("/");
		}
	}

	function Login({ close }: { close: () => void }) {
		return (
			<div className="relative w-full max-w-md text-primary rounded-2xl p-8 flex flex-col bg-secondary transition-transform">
				<button
					onClick={close}
					className="absolute top-4 left-4 text-sm opacity-70 hover:opacity-100 cursor-pointer"
				>
					<X />
				</button>

				<h2 className="text-xl font-semibold text-center mb-8">
					Log onto Account
				</h2>

				<form onSubmit={HandleLogSubmit}>
					<div className="flex flex-col gap-5 flex-1">
						<div className="transition-transform">
							<input
								type="email"
								placeholder="Email"
								className={`w-full p-3 rounded-lg outline-none focus:ring-1  border border-border ${FormError ? "focus:ring-primary/20" : "focus:ring-primary/10"} `}
								name="email"
								required
							/>
						</div>

						<div className="transition-transform">
							<input
								type="password"
								placeholder="Password"
								name="password"
								className="w-full p-3 rounded-lg outline-none focus:ring-1 focus:ring-primary/10 border border-border"
								required
							/>

							<span
								className={`font-medium leading-relaxed text-sm ml-2 mt-4 italic text-start block ${fonts.workSans.className} transition-transform animate-[FlowIn_0.4s_ease_forwards]`}
							>
								{typeof FormError === "string" ? FormError : FormError?.message}
							</span>
						</div>
					</div>

					<button
						type="submit"
						className="mt-8 w-20 p-3 rounded-xl font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors cursor-pointer"
					>
						<div className="flex items-center justify-center text-center">
							{loading ? (
								<Loader className="animate-[spin_2s_linear_infinite] transition-transform" />
							) : (
								"Log in"
							)}
						</div>
					</button>
				</form>

				<small className="mt-5 ">
					<button
						onClick={() => {
							setLstype("signup");
							setFormError(null);
						}}
						className="cursor-pointer"
					>
						Don't have a account? Click here to sign up
					</button>
				</small>
			</div>
		);
	}

	function Signup({ close }: { close: () => void }) {
		return (
			<div className="relative w-full max-w-md text-primary rounded-2xl p-8 flex flex-col bg-secondary transition-transform">
				<button
					onClick={close}
					className="absolute top-4 left-4 text-sm opacity-70 hover:opacity-100 cursor-pointer"
				>
					<X />
				</button>

				<h2 className="text-xl font-semibold text-center mb-8">
					Create Account
				</h2>

				<form onSubmit={HandleSignSubmit}>
					<div className="flex flex-col gap-5 flex-1">
						<div className="transition-transform">
							<input
								type="text"
								name="name"
								placeholder="Username"
								className="w-full p-3 rounded-lg text-foreground outline-none focus:ring-1 focus:ring-primary/10 transition-all border border-border"
							/>
						</div>

						<div className="transition-transform">
							<input
								type="email"
								name="email"
								placeholder="Email"
								className="w-full p-3 rounded-lg text-foreground outline-none focus:ring-1 focus:ring-primary/10 transition-all border border-border"
							/>
						</div>

						<div className="transition-transform">
							<input
								type="password"
								name="password"
								placeholder="Password"
								className="w-full p-3 rounded-lg text-foreground outline-none focus:ring-1 focus:ring-primary/10 transition-all border border-border"
							/>
							<span
								className={`font-medium leading-relaxed text-sm ml-2 mt-1 italic text-start block ${fonts.workSans.className} animate-[FlowIn_0.4s_ease_forwards]`}
							>
								{typeof FormError === "string" ? FormError : FormError?.message}
							</span>
						</div>
					</div>

					<button
						type="submit"
						className="mt-8 w-30 p-3 rounded-xl font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors cursor-pointer"
					>
						<div className="flex items-center justify-center text-center">
							{loading ? (
								<Loader className="animate-[spin_2s_linear_infinite] transition-transform" />
							) : (
								"Sign Up"
							)}
						</div>
					</button>
				</form>
				<small>
					<button
						onClick={() => {
							setLstype("login");
							setFormError(null);
						}}
						className="mt-5 cursor-pointer"
					>
						Already got a account? Click here to login
					</button>
				</small>
			</div>
		);
	}

	function options() {
		user
			? setOut(
					<div
						className={`
                flex items-center gap-2
                rounded-2xl
                backdrop-blur-md
                transition-all duration-200
                cursor-pointer
                ${fonts.comfortaa.className}
              `}
					>
						<MdAccountCircle className="text-2xl text-primary" />
						<span className="text-[1rem] font-medium">{user.user.name}</span>
					</div>,
				)
			: setOut(
					<div
						onClick={() => setLstype("signup")}
						className={`
                rounded-2xl
                text-primary
                text-sm font-semibold
                hover:shadow-lg
                hover:scale-105
                transition-all duration-200
                cursor-pointer
                ${fonts.cabin.className}
              `}
					>
						Sign Up
					</div>,
				);
	}

	function EmailVerefCard({
		email = "The provided Email",
	}: EmailVerefCardProps) {
		if (!EmailVerefOpen) return null;

		return (
			<div
				className={`relative w-full max-w-md rounded-2xl p-8 bg-secondary text-primary shadow-xl border border-border/40 flex flex-col gap-6 animate-[fadeIn_0.3s_ease] ${fonts.cabin.className}`}
			>
				<button
					className="absolute top-4 right-4 p-1 rounded-md hover:bg-primary/10 transition cursor-pointer"
					onClick={() => {
						setEmailVerefOpen(null);
					}}
				>
					<X size={18} />
				</button>

				<div className="flex items-center justify-center">
					<div className="h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center">
						<Check size={26} className="text-green-500" />
					</div>
				</div>

				<h2
					className={`text-xl font-semibold text-center ${fonts.firaSans.className}`}
				>
					Verification Email Sent
				</h2>

				<div className="text-center flex flex-col gap-2">
					<span className="text-sm opacity-90">
						A verification email has been sent to
					</span>

					<span
						className={`text-sm font-medium px-2 py-1 mt-4 rounded-md bg-primary/10 inline-block ${fonts.geistMono.className}`}
					>
						{email ? email : "The provided email"}
					</span>

					<span className="text-sm opacity-80 mt-2">
						Please verify your email within <strong>2 days</strong> to activate
						your account.
					</span>
				</div>

				<a
					className="mt-2 w-full py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium cursor-pointer"
					href="https://mail.google.com/mail/u/0/#inbox"
					target="_blank"
				>
					Check Email
				</a>
			</div>
		);
	}

	useEffect(options, [user]);

	return (
		<>
			{out}

			{lstype && (
				<div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
					{lstype && lstype === "login" && (
						<Login close={() => setLstype(null)} />
					)}

					{lstype && lstype === "signup" && (
						<Signup close={() => setLstype(null)} />
					)}
				</div>
			)}

			{EmailVerefOpen && (
				<div className="fixed inset-0 z-53 flex justify-center items-center backdrop-blur-sm">
					{EmailVerefOpen ? <EmailVerefCard email={EmailVerefOpen} /> : ""}
				</div>
			)}
		</>
	);
}

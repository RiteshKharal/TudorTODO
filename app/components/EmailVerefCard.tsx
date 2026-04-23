"use client";
import * as fonts from "@/app/font/fonts";
import { Check, X } from "lucide-react";
import { sendVerificationEmail } from "../lib/auth-client";
import { useEffect, useState } from "react";

export function EmailVerefCard({
	email = "The provided Email",
	onClose,
}: {
	email?: string;
	onClose: () => void;
}) {
	const [cd, setCd] = useState<number | null>(null);

	useEffect(() => {
		if (cd) {
			setTimeout(() => {
				setCd(cd - 1);

				if (cd <= 0) {
					setCd(null);
				}
			}, 1000);
		}
	}, [cd]);

	return (
		<div
			className={`relative w-full max-w-md rounded-2xl p-8 bg-secondary text-primary shadow-xl border border-border/40 flex flex-col gap-6 animate-[fadeIn_0.3s_ease] ${fonts.cabin.className} text-foreground`}
		>
			<button
				className="absolute top-4 right-4 p-1 rounded-md hover:bg-primary/10 transition cursor-pointer"
				onClick={() => {
					onClose();
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
				className={`text-xl font-semibold text-center ${fonts.firaSans.className} text-foreground`}
			>
				Verification Email Sent
			</h2>

			<div className="text-center flex flex-col gap-2">
				<span className="text-sm opacity-90 text-foreground">
					A verification email has been sent to
				</span>

				<span
					className={`text-sm font-medium px-2 py-1 mt-4 rounded-md bg-primary/10 inline-block ${fonts.geistMono.className} text-foreground`}
				>
					{email ? email : "The provided email"}
				</span>

				<span className="text-sm opacity-80 mt-2 text-foreground">
					Please verify your email within <strong>2 days</strong> to activate
					your account.
				</span>
			</div>

			<div className="w-full mt-2 flex flex-row gap-2 text-primary-foreground">
				<a
					className=" flex-1 py-2 rounded-xl bg-primary  hover:bg-primary/90 transition font-medium cursor-pointer"
					href="https://mail.google.com/mail/u/0/#inbox"
					target="_blank"
				>
					Check Email
				</a>

				<button
					className={`flex-1 bg-primary text-primary-foreground rounded-xl cursor-pointer ${cd ? "opacity-70 bg-primary/90" : "opacity-100"}`}
					onClick={async () => {
						if (!cd) {
							setCd(5);
							await sendVerificationEmail({ email: email });
						}
					}}
				>
					Resend {cd ? `(${cd})` : ''}
				</button>
			</div>
		</div>
	);
}

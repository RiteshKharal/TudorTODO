"use client";

import React from "react";
import * as fonts from "@/app/font/fonts";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ThemeToggle } from "../components/ThemeToggle";
import Accmanager from "@/app/components/accmanager";
import { IoSettings } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();

  return (
    <div
      className={`min-h-screen flex flex-col ${fonts.inconsolata.className} transition-transform  overflow-hidden`}
    >
      <nav className="flex justify-between items-center px-10 py-6 animate-[StretchOut_0.2s_ease-in] ">
        <div className={`text-2xl ${fonts.lilitaOne.className}`}>Tudor</div>

        <div className="flex items-center gap-10">
          <Accmanager cardtype="signup" />

          <button onClick={() => router.back()}>
            <IoSettings className="text-xl rotate-180 hover:scale-110 transition-transform cursor-pointer hover:animate-[Rotate180_1s_infinite]" />
          </button>
        </div>
      </nav>

      <div className="flex justify-center items-center ">
        <div className="w-full backdrop-blur-md rounded-2xl p-8">
          <button
            className="flex items-center gap-2 mb-6 hover:-translate-x-1 transition-all ml-40 cursor-pointer "
            onClick={() => router.back()}
          >
            <IoIosArrowRoundBack size={22} />
            Back
          </button>


          <div className="flex flex-col gap-6 ">
            <div className="flex items-center justify-evenly p-4 rounded-xl">
              <span className="text-lg font-medium">Theme</span>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

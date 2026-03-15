'use client';
import React, { useState } from 'react';
import { IoSettings } from 'react-icons/io5';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useTheme } from 'next-themes';
import { ThemeToggle } from './ThemeToggle';
import * as fonts from '../font/fonts'

export default function Settings() {
  const [open, setOpen] = useState(!true);
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <>
      <IoSettings
        onClick={() => setOpen(true)}
        cursor="pointer"
        className=" text-xl"
      />

      {open && (
        <div className=" inset-0 z-50 flex items-center justify-center  backdrop-blur-xl border border-border shadow-2xl shadow-foreground transition-all ">
          <div className={` rounded-xl w-[45%] h-[70%] p-6 flex flex-col text-center font-semibold transition-all ${fonts.inconsolata.className } pl-10 border border-border`} >
            
            <button
              className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded cursor-pointer hover:-translate-x-1 transition-all"
              onClick={() => setOpen(false)}
            >
              <IoIosArrowRoundBack size={20} /> Close
            </button>

          
            <h2 className="text-2xl font-bold mb-10">Settings</h2>

            <div className="flex flex-col gap-4 w-full">
              <h1 className='flex flex-row gap-10 text-xl'><p>Select Theme:</p></h1>
            <ThemeToggle/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
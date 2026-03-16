import Image from "next/image";
import { ThemeToggle } from "./components/ThemeToggle";
import * as fonts from "./font/fonts";
import Settings from "./components/Settings";
import Accmanager from "./components/accmanager";
import TaskManager, { UserTasks } from "./backend/TaskManager";
import { Task } from "./components/TaskCard";
import { IoSettings } from "react-icons/io5";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex items-center justify-center  font-sans ">
      <main className="flex w-full max-w-3xl flex-col items-center justify-between p-10  sm:items-start ">
        <nav className="top-10 flex justify-between w-full animate-[StretchIn_0.2s_ease-in] ">
          <div className={`text-xl ${fonts.lilitaOne.className} `}>Tudor</div>

          <div>
            <div className="flex flex-row gap-5 text-center justify-center ">
              <Accmanager cardtype="signup" />

              <div>
                <a href="/settings">
                  <IoSettings cursor="pointer" className=" text-xl hover:animate-[Rotate180_1s_infinite] " />
                </a>
              </div>
            </div>
          </div>
        </nav>





        <section className=" w-full mt-[5%] ">
          <Task />
        </section>
      </main>
    </div>
  );
}

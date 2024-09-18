"use client";

import { LockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Sidebar() {
  const [showProjects, setShowProjects] = React.useState(true);
  const [showPriority, setShowPriority] = React.useState(true);

  const sidebarClassNames = `fixed flex flex-col h-full justify-between shadow-xl transition-all duration-300 z-40 dark:bg-black overflow-y-auto bg-white w-64`;
  return (
    <div className={sidebarClassNames}>
      <div className="flex size-full flex-col justify-start">
        {/* top logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <Link
            href="/"
            className="text-xl font-bold text-gray-500 dark:text-white"
          >
            ProjeX
          </Link>
        </div>

        {/* team */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.webp" alt="logo" width={40} height={40} />

          <div>
            <h3 className="text-lg font-bold tracking-wide dark:text-gray-200">
              ProjeX Team
            </h3>

            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] size-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>

        {/* Navbar Links */}
      </div>
    </div>
  );
}

export default Sidebar;

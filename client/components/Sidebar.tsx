"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Icon,
  Layers3,
  LockIcon,
  LucideIcon,
  Menu,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar() {
  const [showProjects, setShowProjects] = React.useState(true);
  const [showPriority, setShowPriority] = React.useState(true);

  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarClassNames = `fixed flex flex-col h-full justify-between shadow-xl transition-all duration-300 ease-in z-40 dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;
  return (
    <div className={sidebarClassNames}>
      <div className="relative flex size-full flex-col justify-start">
        <div className="fixed left-0 top-0 z-50 bg-white dark:bg-black">
          {/* top logo */}
          <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
            <Link
              href="/"
              className="text-xl font-bold text-gray-500 dark:text-white"
            >
              ProjeX
            </Link>

            {!isSidebarCollapsed && (
              <button
                className="py-3"
                onClick={() =>
                  dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
                }
              >
                <X className="size-6 text-gray-800 hover:text-gray-500 dark:text-white" />
              </button>
            )}
          </div>

          {/* team */}
          <div className="flex items-center gap-5 border-y-[1.5px] px-8 py-4 dark:border-gray-700">
            <Image src="/logo.webp" alt="logo" width={40} height={40} />

            <div>
              <h3 className="text-lg font-bold tracking-wide dark:text-gray-200">
                ProjeX Team
              </h3>

              <div className="mt-1 flex items-start gap-2">
                <LockIcon className="mt-[0.1rem] size-3 text-gray-500 dark:text-gray-200" />
                <p className="text-xs text-gray-500 dark:text-white">Private</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar Links */}
        <nav className="z-10 w-full">
          <SidebarLink href="/" label="home" icon={Home} />
          <SidebarLink href="/timeline" label="timeline" icon={Briefcase} />
          <SidebarLink href="/search" label="Search" icon={Search} />
          <SidebarLink href="/settings" label="Settings" icon={Settings} />
          <SidebarLink href="/users" label="Users" icon={User} />
          <SidebarLink href="/teams" label="Team" icon={Users} />
        </nav>

        <button
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          onClick={() => setShowProjects((prev) => !prev)}
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          )}
        </button>

        {/* Project Lists */}
        {showProjects && projects && (
          <nav className="z-10 w-full">
            {projects.map(({ id, name }) => (
              <SidebarLink
                href={`/projects/${id}`}
                label={name}
                icon={Briefcase}
                key={id}
              />
            ))}
          </nav>
        )}

        <button
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          onClick={() => setShowPriority((prev) => !prev)}
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUp className="size-5" />
          ) : (
            <ChevronDown className="size-5" />
          )}
        </button>

        {/* Priority Lists */}
        {showPriority && (
          <nav className="z-10 w-full">
            <SidebarLink
              href="/priority/Urgent"
              label="Urgent"
              icon={AlertCircle}
            />
            <SidebarLink
              href="/priority/High"
              label="High"
              icon={ShieldAlert}
            />
            <SidebarLink
              href="/priority/Medium"
              label="Medium"
              icon={AlertTriangle}
            />
            <SidebarLink href="/priority/Low" label="Low" icon={AlertOctagon} />
            <SidebarLink
              href="/priority/Backlog"
              label="Backlog"
              icon={Layers3}
            />
          </nav>
        )}
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center justify-start gap-3 px-8 py-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""}`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-[5px] bg-blue-200"></div>
        )}
        <Icon className="size-6 text-gray-800 dark:text-gray-100" />
        <span
          className={`font-medium capitalize text-gray-800 dark:text-gray-100`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;

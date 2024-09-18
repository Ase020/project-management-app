import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

function DashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar />
      <main
        className={`dark:bg-dark-bg flex w-full flex-col bg-gray-50 md:pl-64`}
      >
        {/* Navbar */}
        <Navbar />
        {children}
      </main>
    </div>
  );
}

export default DashboardWrapper;

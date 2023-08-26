"use client";

import Image from "next/image";

import SidebarMenu from "@/components/ui/sidebar-menu";

import logo from "../assets/img/logo-ct.png";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 flex-wrap items-center justify-between block w-64 p-0 my-4 overflow-y-auto transition-all duration-200 bg-white border-0 shadow-none xl:ml-4 dark:bg-gray-600 z-100 rounded-2xl xl:translate-x-0">
      <div className="h-auto">
        <div className="flex flex-col justify-center items-center py-12 text-2xl text-slate-700 dark:text-slate-200">
          <Image src={logo} width={96} height={96} alt="logo" />
          <span className="mt-3">Financiallence</span>
        </div>
      </div>

      <hr className="h-px mt-0" />

      <SidebarMenu />
    </div>
  );
};

export default Sidebar;

"use client";

import Image from "next/image";

import SidebarMenu from "@/components/ui/sidebar-menu";

import logo from "../assets/img/logo-ct.png";
import { LuPanelLeftClose } from "react-icons/lu";
import SidebarDivider from "./ui/sidebar-divider";

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto transition-all duration-200 -translate-x-full bg-white border-0 shadow-none xl:ml-4 dark:bg-gray-950 ease-soft-in-out z-990 max-w-64 rounded-2xl xl:translate-x-0 xl:bg-transparent">
      <div className="h-auto">
        <div className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer text-slate-400 dark:text-white xl:hidden">
          <LuPanelLeftClose />
        </div>
        <div className="flex flex-col justify-center items-center py-12 text-2xl">
          <Image src={logo} width={96} height={96} alt="logo" />
          <span className="mt-3">Financiallence</span>
        </div>
      </div>

      <SidebarDivider />

      <div className="my-6 w-full">
        <SidebarMenu />
      </div>
      
      <SidebarDivider />
    </div>
  );
};

export default Sidebar;

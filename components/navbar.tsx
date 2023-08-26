"use client";

import { useRouter } from "next/navigation";

import HamburgerMenu from "@/components/ui/hamburger-menu";
import { FaBell, FaUser } from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="relative transition-all shadow-none duration-250 ease-soft-in rounded-2xl border border-slate-500">
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center">
          <HamburgerMenu />
        </div>

        <div className="flex justify-end items-center gap-4">
          <div className="ease-nav-brand text-slate-500 dark:text-white">
            <FaUser className="cursor-pointer" />
          </div>
          <div className="ease-nav-brand text-slate-500 dark:text-white">
            <FaBell className="cursor-pointer" />
          </div>
          <div className="flex items-center xl:hidden">
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

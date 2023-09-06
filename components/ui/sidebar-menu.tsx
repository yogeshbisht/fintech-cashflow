"use client";

import {
  LuChevronDown,
  LuCog,
  LuHome,
  LuLayoutDashboard,
  LuNewspaper,
  LuTable2,
} from "react-icons/lu";

interface SidebarMenuItem {
  title: string;
  icon: React.ReactNode;
  link: string;
  subMenu?: boolean;
}

const menuList: SidebarMenuItem[] = [
  { title: "Home", icon: <LuHome />, link: "/" },
  { title: "Dashboard", icon: <LuLayoutDashboard />, link: "/dashboard" },
  { title: "Transactions", icon: <LuTable2 />, link: "/transactions" },
  {
    title: "Assets/Liabilities",
    icon: <LuNewspaper />,
    link: "/assets-liabilities",
  },
  { title: "Settings", icon: <LuCog />, link: "/settings" },
];

const SidebarMenu = () => {
  return (
    <div>
      <ul className="flex flex-wrap pl-4 mb-0 list-none">
        {menuList.map((menu) => (
          <li className="w-full" key={menu.title}>
            <a
              className="py-3 pl-4 relative my-0 mr-4 flex items-center whitespace-nowrap bg-transparent pr-4 text-slate-500 dark:text-white"
              href={menu.link}
            >
              <div className="flex items-center justify-center mr-4 rounded-md p-2 bg-slate-900 dark:bg-slate-200 text-slate-200 dark:text-slate-950">
                {menu.icon}
              </div>
              <span className="text-sm pointer-events-none text-slate-900 dark:text-slate-200">
                {menu.title}
              </span>
              {menu.subMenu && (
                <div className="absolute right-0">
                  <LuChevronDown className="text-xs text-slate-900 dark:text-slate-200" />
                </div>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;

import { formatter } from "@/lib/utils";
import React from "react";

interface StatisticsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  percentage: number;
  type?: "amount" | null;
  increase?: boolean;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  icon,
  percentage,
  type,
  increase = true,
}) => {
  return (
    <div className="relative p-4 bg-white dark:bg-gray-950 shadow-soft-xl dark:shadow-soft-dark-xl rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="mb-0 text-sm dark:opacity-60">{title}</p>
          <h5 className="mb-0 font-medium dark:text-white">
            {type === "amount" ? formatter.format(value) : value}
            <span
              className={`text-sm font-bold pl-2 ${
                increase ? "text-lime-500" : "text-red-600"
              }`}
            >
              {increase ? "+" : "-"}
              {percentage}%
            </span>
          </h5>
        </div>
        <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;

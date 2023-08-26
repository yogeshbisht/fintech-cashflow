import { LuBarChart, LuCoins, LuUserPlus, LuUsers } from "react-icons/lu";
import StatisticsCard from "./components/statistics-card";
import PanelTitle from "@/components/ui/panel-title";

const statisticsData = [
  {
    title: "Today's Money",
    value: 12545,
    icon: <LuCoins size="2em" />,
    percentage: 21,
    type: "amount",
  },
  {
    title: "Newly Added Users",
    value: 357,
    icon: <LuUsers size="2em" />,
    percentage: 12,
  },
  {
    title: "New Transactions Done",
    value: 65,
    icon: <LuUserPlus size="2em" />,
    percentage: 8,
    increase: false,
  },
  {
    title: "Total Sales",
    value: 75326,
    icon: <LuBarChart size="2em" />,
    percentage: 5,
    type: "amount",
  },
];

export default function Home() {
  return (
    <div className="relative">
      <PanelTitle title="General Statistics" />
      <div className="w-full">
        <div className="grid grid-cols-2 gap-6 2xl:grid-cols-4">
          {statisticsData.map((statistic, index) => (
            <StatisticsCard
              key={index}
              title={statistic.title}
              value={statistic.value}
              icon={statistic.icon}
              percentage={statistic.percentage}
              increase={statistic.increase}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

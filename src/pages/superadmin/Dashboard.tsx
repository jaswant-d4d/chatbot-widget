import { useMemo } from "react";
import { Users, ShoppingBag, Wallet, Activity, Home } from "lucide-react";
import Chart from "react-apexcharts"
import type { ApexOptions } from "apexcharts";
import { useTheme } from "@/hooks/useTheme";

const widgets = [
  {
    title: "Total Users",
    value: "12,450",
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: "Total Orders",
    value: "3,982",
    icon: <ShoppingBag className="w-8 h-8" />,
  },
  {
    title: "Revenue",
    value: "$87,230",
    icon: <Wallet className="w-8 h-8" />,
  },
  {
    title: "Active Sessions",
    value: "245",
    icon: <Activity className="w-8 h-8" />,
  },
];
export default function SuperAdminDashboard() {
  const { theme } = useTheme();
  const chartData = useMemo(() => {
    return {
      series: [
        {
          name: "Messages",
          data: [120, 180, 150, 200, 300, 250, 400],
        },
      ],
      options: {
        theme: { mode: theme },
        chart: {
          type: "area",
          height: 350,
          toolbar: { show: false },
          foreColor: theme === "dark" ? "#ffffff" : "#1e2939",
          background: "transparent" // Change this to transparent
        },
        grid: {
          borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
        },
        stroke: {
          curve: "smooth",
        },
        dataLabels: { enabled: false },
        xaxis: {
          categories: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
          ],
          labels: {
            style: {
              colors: theme === "dark" ? "#9ca3af" : "#6b7280",
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: theme === "dark" ? "#9ca3af" : "#6b7280",
            }
          }
        },
        colors: ["#4f46e5"],
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.5,
            opacityTo: 0.1,
          },
        },
        tooltip: {
          theme: theme, // Add this
        }
      } as ApexOptions
    }
  }, [theme]);


  return (
    <div className=" space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
          <Home className="size-5" />
          Dashboard</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {widgets.map((w, i) => (
          <div
            key={i}
            className="rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800"
          >
            <div className="p-4 sm:p-6 flex items-center gap-4">
              <div className="p-4 rounded-full bg-gray-100 flex items-center justify-center">
                {w.icon}
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-400 text-sm">{w.title}</p>
                <h2 className="text-2xl text-gray-900 dark:text-white  font-bold">{w.value}</h2>
              </div>
            </div>
          </div>
        ))}

      </div>
      <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white p-4 sm:p-6 rounded-xl shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4 ">Today's Usage</h2>
        <Chart
          key={theme}
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
}

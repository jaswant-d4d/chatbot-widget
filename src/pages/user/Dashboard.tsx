import { BookOpen, Bot, Home, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import Chart from "react-apexcharts";

const stats = [
  {
    title: "Total Chats",
    value: "245",
    icon: MessageSquare,
    bg: "bg-blue-100 dark:bg-blue-800/60",
    text: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Knowledge Base",
    value: "120",
    icon: BookOpen,
    bg: "bg-purple-100 dark:bg-purple-800/60",
    text: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Active Bots",
    value: "3",
    icon: Bot,
    bg: "bg-green-100 dark:bg-green-800/60",
    text: "text-green-600 dark:text-green-400",
  },
  {
    title: "Unread Chats",
    value: "14",
    icon: MessageSquare,
    bg: "bg-yellow-100 dark:bg-yellow-800/60",
    text: "text-yellow-600 dark:text-yellow-400",
  },
];

export default function UserDashboard() {
  const [chartData] = useState({
    series: [
      {
        name: "Messages",
        data: [120, 180, 150, 200, 300, 250, 400],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        toolbar: { show: false },
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
      },
      colors: ["#4f46e5"], // Indigo
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.5,
          opacityTo: 0.1,
        },
      },
    },
  });

  return (
    <div className="flex-1 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
          <Home className="size-5" />
          Dashboard
        </h2>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`p-5 rounded-xl 
              shadow-md hover:shadow-lg transition-all cursor-pointer ${item.bg}`}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm text-gray-700 dark:text-gray-300">{item.title}</h4>
              <item.icon size={22} className={item.text} />
            </div>
            <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-gray-100">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white text-gray-900 dark:bg-indigo-50  p-6 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Today's Usage</h2>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
        />
      </div>

      {/* Recent Conversations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Recent Conversations
        </h3>

        <div className="space-y-4">
          {["John Doe", "Priya Singh", "Alex Roy"].map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg 
                hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">{name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  “How to track my order?”
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 mins ago</p>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}
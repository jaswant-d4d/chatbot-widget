import { UserCog } from "lucide-react";
import { Link } from "react-router-dom";

interface LinkType {
  key: string
  name: string
  path: string
  icon: any
}

interface Props {
  links: LinkType[]
  activeTab: string
  setActiveTab: (status: string) => void
}

export default function SettingsTabs({ links, activeTab, setActiveTab }: Props) {
  return (
    <aside className="w-[220px] md:w-64 md:shadow-lg h-full bg-white dark:bg-gray-800 dark:text-gray-400 rounded-2xl p-4 flex flex-col ">
      <h2 className="text-lg font-semibold mb-4 px-2 flex items-center gap-3 text-gray-900 dark:text-white "><UserCog className="size-5" /> Settings</h2>
      <div className="space-y-2 flex-1">
        {links.map((tab) => (
          <Link to={tab.path} className="flex">
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center w-full gap-3 px-3 py-2 rounded-lg text-sm transition-colors 
                text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white ${activeTab === tab.key ? "bg-gray-100 dark:bg-gray-700 dark:text-white" : ""}`}
            >
              {tab.icon}
              {tab.name}
            </button>
          </Link>

        ))}
      </div>
    </aside>
  );
}

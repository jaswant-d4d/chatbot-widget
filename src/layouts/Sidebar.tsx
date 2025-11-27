import { memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, LogOut, MessageCircleMore } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { sidebarLinks } from "@/data/sidebarLinks";
import type { LinkType } from "@/types/LinkType";

interface SidebarProps {
    isOpen: boolean,
}

const Sidebar = memo(({ isOpen }: SidebarProps) => {
    const [openSections, setOpenSections] = useState<string[]>([]);
    const { pathname } = useLocation();
    const { user, logout } = useAuth();
    const links: LinkType[] = sidebarLinks[user?.role === "admin" ? "admin" : "user"];

    // Toggle accordion open/close
    const toggleSection = (id: string) => {
        setOpenSections((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    return (
        <>
            <div
                id="hs-application-sidebar"
                className={`*:hs-overlay [--auto-close:lg] ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-all transform w-[220px] md:w-64 h-full fixed inset-y-0 start-0 z-60 bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 open opened`}
                role="dialog"
                tabIndex={-1}
                aria-label="Sidebar"
                style={{ outline: "none" }}>
                <div className="relative flex flex-col h-full max-h-full">
                    <div className="px-6 py-4 flex items-center mb-1">
                        <a className="flex items-center justify-between gap-3 rounded-xl text-xl dark:text-white font-semibold focus:outline-hidden focus:opacity-80"
                            href="#" aria-label="Chatboat">
                            <MessageCircleMore />
                            <span>Chatbot</span>
                        </a>
                        <div className="hidden lg:block ms-2">
                        </div>
                    </div>

                    <div
                        className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-gray-800">
                        {/* Links */}
                        <nav className="flex-1 space-y-2 px-1.5 overflow-y-auto">
                            {links.map((item) => {
                                // If it has subLinks → render accordion
                                if ("subLinks" in item) {
                                    const isSectionOpen = openSections.includes(item.id);
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.id} className="">
                                            <button
                                                onClick={() => toggleSection(item.id)}
                                                className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white text-sm rounded"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Icon size={18} />
                                                    <span>{item.title}</span>
                                                </div>
                                                {
                                                    isSectionOpen ? (
                                                        <ChevronUp size={16} />
                                                    ) : (
                                                        <ChevronDown size={16} />
                                                    )
                                                }
                                            </button>

                                            {/* Sub Links */}
                                            {isSectionOpen && (
                                                <div className={`pl-10 py-2 space-y-2 `}>
                                                    {item.subLinks.map((sub: any) => (
                                                        <Link
                                                            key={sub.path}
                                                            to={sub.path}
                                                            className={`block text-sm py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white ${pathname === sub.path ? "bg-gray-100 dark:bg-gray-700 dark:text-white" : ""
                                                                }`}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                // Normal link (no subLinks)
                                const Icon = item.icon;
                                const isActive = (path: string) => {
                                    const dashboardPaths = ["/user", "/admin"];

                                    // Dashboard should only activate on exact match
                                    if (dashboardPaths.includes(path)) {
                                        return pathname === path;
                                    }

                                    // Other sections: activate if path starts with menu path
                                    return pathname.startsWith(path);
                                };
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white
                                            ${isActive(item.path) ? "bg-gray-100 dark:bg-gray-700 dark:text-white" : ""
                                            }`}
                                    >
                                        <Icon size={18} />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={logout}
                        className="cursor-pointer flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-100 border-t dark:hover:bg-gray-700 dark:hover:text-white border-gray-700 "
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
})
export default Sidebar;
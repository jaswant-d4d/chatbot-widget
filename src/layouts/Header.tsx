import React, { useEffect } from 'react'
import Avatar from '@/components/ui/Avatar'
import { LogOut, Moon, PanelRightClose, Settings, Sun, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import { Link } from 'react-router-dom';

interface Props {
    openMenu: boolean,
    menuToggle: (open: boolean) => void
}
const Header = ({ openMenu, menuToggle }: Props) => {
    const [isOpenDropdown, setIsOpenDropdown] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const { logout } = useAuth();
    const { theme, setTheme } = useTheme();


    const handleThemeChange = (value: "light" | "dark" | "auto") => {
        setTheme(value);
    };
    // const handleThemeChange = (value: "light" | "dark" | "auto") => {
    //     if (value === "auto") {
    //         const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    //         setTheme(prefersDark ? "dark" : "light");
    //         localStorage.setItem("theme", "auto");
    //     } else {
    //         setTheme(value);
    //         localStorage.setItem("theme", value);
    //     }
    // };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpenDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header
            className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-white dark:bg-gray-800 dark:text-gray-400 border-b border-gray-200 text-sm py-2.5 lg:ps-65">
            <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
                <div className="w-full flex items-center justify-between ms-auto md:justify-between gap-x-1 md:gap-x-3">
                    <div className="flex items-center py-2 ">
                        <button type="button"
                            onClick={() => menuToggle(!openMenu)}
                            className="lg:hidden size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-hidden focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                            aria-haspopup="dialog" aria-expanded={openMenu} aria-controls="hs-application-sidebar"
                            aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
                            <span className="sr-only">Toggle Navigation</span>
                            <PanelRightClose />
                        </button>
                    </div>

                    <div className="flex flex-row items-center justify-end gap-1">

                        <button type="button"
                            className="size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 dark:text-gray-400 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                            </svg>
                            <span className="sr-only">Notifications</span>
                        </button>
                        <div ref={dropdownRef} className="relative inline-flex text-start">
                            <button
                                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                                type="button"
                                className="p-0.5 inline-flex shrink-0 items-center gap-x-3 text-start rounded-full hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200"
                                aria-haspopup="menu"
                                aria-expanded={isOpenDropdown}
                            >
                                <Avatar
                                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                                    name="Avatar"
                                />
                            </button>
                            {isOpenDropdown && (
                                <div
                                    className="absolute mt-2 w-60 transition-[opacity,margin] bg-white border border-gray-200 rounded-xl shadow-xl dark:bg-gray-800 dark:text-gray-400 dark:border-neutral-700 z-20"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="hs-dnad"
                                    data-placement="bottom-end"
                                    style={{ position: "absolute", transform: "translate3d(-208px, 42px, 0px)", margin: "0px" }}
                                >
                                    <div className="py-2 px-3.5">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            James Collison
                                        </span>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            jamescollison@site.com
                                        </p>
                                    </div>

                                    <div className="px-4 py-2 border-t border-gray-200 dark:border-neutral-800">
                                        <div className="flex flex-wrap justify-between items-center gap-2">
                                            <span className="flex-1 cursor-pointer text-sm text-gray-900 dark:text-white">Theme</span>
                                            <div className="p-0.5 inline-flex cursor-pointer bg-gray-100 rounded-full dark:bg-gray-700">

                                                <button type="button" onClick={() => handleThemeChange("light")}
                                                    className={`size-7 flex justify-center items-center ${theme === "light" ? "bg-white shadow-sm" : ""}  text-gray-800 rounded-full dark:text-gray-200 hs-auto-mode-active:bg-transparent hs-auto-mode-active:shadow-none hs-dark-mode-active:bg-transparent hs-dark-mode-active:shadow-none`} data-hs-theme-click-value="default">
                                                    <Sun className='size-4' />
                                                </button>

                                                <button type="button" onClick={() => handleThemeChange("dark")}
                                                    className={`size-7 flex justify-center items-center ${theme === "dark" ? "bg-white dark:text-green-950 shadow-sm" : ""} text-gray-700 rounded-full dark:text-neutral-800 hs-dark-mode-active:bg-white hs-dark-mode-active:shadow-sm hs-dark-mode-active:text-neutral-800`} data-hs-theme-click-value="dark">
                                                    <Moon className="size-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-1 border-t border-gray-200 dark:border-neutral-800 space-y-2">
                                        <Link
                                            className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-900 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-gray-400  hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                                            to="/user/settings/profile"
                                        >
                                            <User className='size-4' />
                                            Profile
                                        </Link>
                                        <Link
                                            className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                                            to="/user/settings"
                                        >
                                            <Settings className='size-4' />
                                            Settings
                                        </Link>
                                    </div>
                                    <div className="p-2 border-t border-gray-200 dark:border-neutral-800">
                                        <button
                                            className="flex justify-center items-center w-full gap-x-3 py-2 px-3 text-sm bg-gray-800 text-white rounded-lg focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-950 dark:hover:text-gray-900 dark:text-white hover:bg-white "
                                            onClick={logout}
                                        >
                                            <LogOut className='size-4' />
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header >

    )
}

export default Header

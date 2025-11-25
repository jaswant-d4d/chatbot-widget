import { useState } from "react";
import { Bell, Globe, Video, Cog, HelpCircle, BookOpen, Settings } from "lucide-react";
import Button from "@/components/ui/Button";

export default function SiteSettings() {
    const [activeTab, setActiveTab] = useState("General");

    const tabs = [
        { name: "General", icon: Cog },
        { name: "Navigation", icon: Globe },
        { name: "Video & Audio", icon: Video },
        { name: "Notifications", icon: Bell },
    ];

    return (
        <div className="flex min-h-[calc(100vh-111px)] text-gray-100">
            {/* Sidebar */}
            <div className="w-[220px] md:w-64 text-gray-900 bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg p-4 flex flex-col">
                <h2 className="text-lg font-semibold mb-4 px-2 flex items-center gap-3"><Settings className="size-5" /> Settings</h2>

                <div className="space-y-2 flex-1">
                    {tabs.map(({ name, icon: Icon }) => (
                        <button
                            key={name}
                            onClick={() => setActiveTab(name)}
                            className={`flex items-center w-full px-3 py-2 rounded-lg text-sm transition-all ${activeTab === name
                                ? "bg-gray-100 dark:bg-gray-700 dark:text-white"
                                : "hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                }`}
                        >
                            <Icon className="w-4 h-4 mr-3" />
                            {name}
                        </button>
                    ))}
                </div>

                <div className="mt-auto border-t border-gray-800 pt-3 space-y-2">
                    <button className="flex items-center text-gray-400 hover:text-white w-full px-3 py-2 text-sm rounded-lg hover:bg-gray-700">
                        <HelpCircle className="w-4 h-4 mr-2" /> Help
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-white w-full px-3 py-2 text-sm rounded-lg hover:bg-gray-700">
                        <BookOpen className="w-4 h-4 mr-2" /> Documentation
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-6 text-gray-900 bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg p-6">
                {activeTab === "General" && <GeneralSettings />}
                {activeTab === "Navigation" && <NavigationSettings />}
                {activeTab === "Video & Audio" && <VideoSettings />}
                {activeTab === "Notifications" && <NotificationSettings />}
            </div>
        </div>
    );
}

/* ------- Subcomponents ------- */

function GeneralSettings() {
    return (
        <div className="">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-3"><Cog className="size-5" /> General</h3>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm dark:text-gray-400 mb-1">Language</label>
                    <select className="dark:bg-gray-700 border dark:border-gray-700 rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-blue-500">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>French</option>
                        <option>Spanish</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm dark:text-gray-400 mb-1">Time Zone</label>
                    <select className="dark:bg-gray-700 border dark:border-gray-700 rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-blue-500">
                        <option>New York (GMT-4)</option>
                        <option>London (GMT+1)</option>
                        <option>Dubai (GMT+4)</option>
                        <option>Tokyo (GMT+9)</option>
                    </select>
                </div>

                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="presence" className="accent-blue-500 w-4 h-4" />
                    <label htmlFor="presence" className="text-sm dark:text-gray-300">
                        Change status to "Away" when inactive for 10 minutes
                    </label>
                </div>

                <div>
                    <label className="block text-sm dark:text-gray-400 mb-2">Emoji</label>
                    <div className="flex space-x-3">
                        {["👋🏻", "👋🏼", "👋🏽", "👋🏾", "👋🏿"].map((emoji, i) => (
                            <button
                                key={i}
                                className={`text-xl rounded-full border-2 p-2 ${i === 0 ? "border-blue-500" : "border-transparent hover:border-gray-600"
                                    }`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t dark:border-gray-400">
                    <Button label={"Cancel"} variant={"secondary"} onClick={() => { }} />
                    <Button label={"Save changes"} variant={"primary"} onClick={() => { }} />
                </div>
            </div>
        </div>
    );
}

function NavigationSettings() {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-3"><Globe className="size-5" /> Navigations</h3>

            <div className="space-y-6">
                <p className="text-gray-400">Navigation preferences go here.</p>
            </div>
        </div>
    );
}
function VideoSettings() {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-3"><Video className="size-5" /> Navigations</h3>

            <div className="space-y-6">
                <p className="text-gray-400">Video and audio settings go here.</p>
            </div>
        </div>
    );
}
function NotificationSettings() {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-3"><Bell className="size-5" /> Navigations</h3>

            <div className="space-y-6">
                <p className="text-gray-400">Notification settings go here.</p>
            </div>
        </div>
    );
}

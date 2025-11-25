import { useEffect, useState } from "react";
import SettingsTabs from "@/components/SettingsTabs";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import Profile from "./Profile";
import { Edit, Lock, Menu, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";


const settingsLinks = [
  { name: "Profile", key: "profile", path: "/user/settings/profile", icon: <User className="w-4 h-4" /> },
  { name: "Edit Profile", key: "edit-profile", path: "/user/settings/edit-profile", icon: <Edit className="w-4 h-4" /> },
  { name: "Change Password", key: "change-password", path: "/user/settings/change-password", icon: <Lock className="w-4 h-4" /> },
];

export default function SettingsPage() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/user/settings/edit-profile") {
      setActiveTab("edit-profile")
    } else if (location.pathname === "/user/settings/change-password") {
      setActiveTab("change-password")
    } else {
      setActiveTab("profile")
    }
  }, [location]);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "edit-profile":
        return <EditProfile />;
      case "change-password":
        return <ChangePassword />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-111px)] text-gray-100 ">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SettingsTabs
          links={settingsLinks}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* 📱 Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed top-0 left-0 h-full w-[220px] md:w-64 bg-white text-gray-900 dark:text-gray-400 dark:bg-gray-800 z-40 py-5 flex flex-col shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Settings</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close Menu"
                  className="p-1 rounded-md hover:bg-gray-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <SettingsTabs
                links={settingsLinks}
                activeTab={activeTab}
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setIsSidebarOpen(false);
                }}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 📱 Mobile Header */}
      <div className="flex-1">
        <div className="md:hidden flex items-center justify-between transition-all duration-300 bg-gray-800 text-white p-3 px-6 rounded-lg mb-4 shadow-md">
          <h1 className="text-base font-semibold">Settings</h1>
          <button onClick={() => setIsSidebarOpen(true)} aria-label="Open Settings Menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className={`flex-1 md:ml-6 h-full bg-white text-gray-900 dark:text-gray-400 dark:bg-gray-800 rounded-2xl shadow-lg p-6`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

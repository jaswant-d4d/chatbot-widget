import { Home, Users, Settings, UserCog, Book, CreditCard, ClipboardList, MessageCircle, Building2 } from "lucide-react";

export const sidebarLinks = {
  admin: [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Companies", path: "/admin/companies", icon: Building2 },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Chatbots", path: "/admin/chatbots", icon: MessageCircle },
    { name: "Billing", path: "/admin/billing", icon: CreditCard },
    { name: "Audit Logs", path: "/admin/logs", icon: ClipboardList },
    // {
    //   id: "settings",
    //   title: "Settings",
    //   icon: Settings,
    //   subLinks: [
    //     { name: "Profile", path: "/admin/settings/profile" },
    //     { name: "Edit Profile", path: "/admin/settings/edit-profile" },
    //     { name: "Change Password", path: "/admin/settings/change-password" },
    //   ],
    // },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ],


  user: [
    { name: "Dashboard", path: "/user/dashboard", icon: Home },
    { name: "FAQ", path: "/user/faq", icon: Book },
    // {
    //   id: "account",
    //   title: "Account",
    //   icon: UserCog,
    //   subLinks: [
    //     { name: "Profile", path: "/user/profile" },
    //     { name: "Billing", path: "/user/billing" },
    //     { name: "Security", path: "/user/security" },
    //   ],
    // },
    { name: "Settings", path: "/user/settings", icon: UserCog },
    { name: "Site Settings", path: "/user/site-settings", icon: Settings },
  ],
};

import { useState } from "react";
import { Building } from "lucide-react";

import CompanyList from "./components/CompanyList";
import AddCompany from "./components/AddCompany";
import EditCompany from "./components/EditCompany";
import ViewCompany from "./components/ViewCompany";
import SettingsTabs from "@/components/SettingsTabs";

const settingsLinks = [
    { name: "Companies", key: "list", path: "/admin/companies", icon: <Building className="w-4 h-4" /> },
    { name: "Add Company", key: "add", path: "/admin/companies", icon: <Building className="w-4 h-4" /> },
];


export default function Companies() {

    const [mode, setMode] = useState("list"); // list | add | edit | view
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleTab = (tab: string) => {
        setMode(tab)
    }

    const handleEdit = (id: string) => {
        setSelectedId(id);
        setMode("edit");
    };

    const handleView = (id: string) => {
        setSelectedId(id);
        setMode("view");
    };

    return (
        <div className="h-screen ">
            <div className="flex h-[calc(100vh-111px)] text-gray-100 ">
                {/* Desktop Sidebar */}
                <div className="hidden md:block">
                    <SettingsTabs
                        links={settingsLinks}
                        activeTab={mode}
                        setActiveTab={handleTab}
                    />
                </div>
                <div className="flex-1 md:ml-6 h-full w-full overflow-hidden">
                    {mode === "list" && (
                        <CompanyList
                            onAdd={() => setMode("add")}
                            onEdit={handleEdit}
                            onView={handleView}
                        />
                    )}

                    {mode === "add" && <AddCompany onBack={() => setMode("list")} />}

                    {mode === "edit" && selectedId && (
                        <EditCompany id={selectedId} onBack={() => setMode("list")} />
                    )}

                    {mode === "view" && selectedId && (
                        <ViewCompany id={selectedId} onBack={() => setMode("list")} />
                    )}
                </div>
            </div>
        </div>
    );
}

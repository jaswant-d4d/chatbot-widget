import { useEffect, useState } from "react";
import { getCompanyById } from "../api/companyApi";
import type { CompanyType } from "./CompanyList";
import { Building } from "lucide-react";

export default function ViewCompany({ id, onBack }: any) {
    const [company, setCompany] = useState<CompanyType>();

    useEffect(() => {
        setCompany({ id: 1, name: "Digital4design", email: "digital4designs@gmail.com", status: "Active" });
        load();
    }, []);

    const load = async () => {
        const data = await getCompanyById(id);
        setCompany(data);
    };

    if (!company) return <p>Loading...</p>;

    return (
        <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white p-6 rounded-xl shadow space-y-6">
            <h2 className="text-lg font-semibold flex items-center dark:text-white gap-3"><Building className="size-5" /> Company Details</h2>
            <div className="text-sm">
                <p><strong>Name:</strong> {company.name}</p>
                <p><strong>Email:</strong> {company.email}</p>
                <p><strong>Status:</strong> {company.status || "Active"}</p>
            </div>

            <button onClick={onBack} className="mt-4 border px-4 py-2 rounded">
                Back
            </button>
        </div>
    );
}

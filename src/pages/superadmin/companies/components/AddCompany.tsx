import { useState } from "react";
import { createCompany } from "../api/companyApi";
import Button from "@/components/ui/Button";
import { Building } from "lucide-react";

export default function AddCompany({ onBack }: any) {
    const [form, setForm] = useState({ name: "", email: "" });

    const handleSubmit = async () => {
        await createCompany(form);
        onBack();
    };

    return (
        <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white p-6 rounded-xl shadow space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-3 dark:text-white"><Building className="size-5"/> Add Company</h2>

            <div className="space-y-3 text-sm">
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        className="w-full border p-2 rounded "
                        placeholder="Company Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="w-full border p-2 rounded"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>
                <div className="flex gap-3 pt-4">
                    <Button
                        variant="primary"
                        label="Save"
                        onClick={handleSubmit}
                        
                    />
                    <Button variant="secondary" label="Cancel" onClick={onBack} className="" />

                </div>
            </div>
        </div>
    );
}

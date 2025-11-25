import { useEffect, useState } from "react";
import { getCompanyById, updateCompany } from "../api/companyApi";
import { Building } from "lucide-react";
import Button from "@/components/ui/Button";

export default function EditCompany({ id, onBack }: any) {
    const [form, setForm] = useState({ name: "", email: "" });

    useEffect(() => {
        getCompany();
    }, []);

    const getCompany = async () => {
        const data = await getCompanyById(id);
        setForm(data);
    };

    const handleSubmit = async () => {
        await updateCompany(id, form);
        onBack();
    };

    return (
        <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white p-6 rounded-xl shadow space-y-6">
            <h2 className="text-lg font-semibold flex items-center dark:text-white gap-3"><Building className="size-5" /> Edit Company</h2>

            <div className="space-y-3 text-sm">
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id={"name"}
                        className="w-full border p-2 rounded "
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id={"email"}
                        className="w-full border p-2 rounded "
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <Button
                        label="Update"
                        onClick={handleSubmit}
                        className=""
                    />
                    <Button label="Cancel" variant="secondary" onClick={onBack} className="" />

                </div>
            </div>
        </div >
    );
}

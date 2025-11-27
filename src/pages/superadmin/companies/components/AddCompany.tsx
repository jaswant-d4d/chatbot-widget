import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Building } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AddCompany({ onBack }: any) {
    const { apiBaseUrl } = useAuth()
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        ownerName: "",
        email: "",
        phone: "",
        description: "",
        domains: "", // CSV
    });

    const submit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const domains = form.domains.split(",").map((d) => d.trim()).filter(Boolean);
            const res = await fetch(`${apiBaseUrl}/companies`, {
            // const res = await fetch(`http://localhost:9999/api/companies`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, domains }),
            });
            const data = await res.json();
            if (res.ok) {
                onBack();
                setForm({ name: "", ownerName: "", email: "", phone: "", description: "", domains: "" });
            } else {
                alert(data.error || "Create failed");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-3 dark:text-white"><Building className="size-5" /> Add Company</h2>

            <form onSubmit={submit} className="space-y-3 text-sm">
                <div>
                    <label htmlFor="name" className="block mb-1">Company Name</label>
                    <input
                        id="name"
                        className="w-full border p-2 rounded-md "
                        placeholder="Company Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="ownerName" className="block mb-1">Owner Name</label>
                    <input
                        id="ownerName"
                        className="w-full border p-2 rounded-md "
                        placeholder="Owner Name"
                        value={form.ownerName}
                        onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input
                        id="email"
                        className="w-full border p-2 rounded-md"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-1">Phone</label>
                    <input
                        id="phone"
                        className="w-full border p-2 rounded-md"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block mb-1">Description</label>
                    <textarea
                        id="description"
                        className="w-full border p-2 rounded-md"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="domains" className="block mb-1">Domains</label>
                    <input
                        id="domains"
                        className="w-full border p-2 rounded-md"
                        placeholder="Domains (comma separated)"
                        value={form.domains}
                        onChange={(e) => setForm({ ...form, domains: e.target.value })}
                    />
                </div>
                <div className="flex gap-3 pt-4">
                    <Button
                        variant="primary"
                        label={loading ? "Saving Changes..." : "Save Changes"}
                        type="submit"
                        disabled={loading}
                    />
                    <Button variant="secondary" label="Cancel" onClick={onBack} className="" />
                </div>
            </form>
        </div>
    );
}

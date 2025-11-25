import { useState } from "react";
import type { FAQItem } from "./faq/FAQForm";
import FAQListing from "./faq/FAQListing";
import FAQForm from "./faq/FAQForm";
import CsvImporter from "./faq/CSVImporter";
import { Book } from "lucide-react";
import Button from "@/components/ui/Button";

export default function KnowledgeBasePage() {
    // initial demo data
    const [categories, setCategories] = useState<string[]>(["Orders", "Shipping", "Billing"]);
    const [faqs, setFaqs] = useState<FAQItem[]>([
        {
            id: "1",
            question: "How do I track my order?",
            answer: "Go to Orders -> Track order and input your tracking ID.",
            category: "Orders",
            tags: ["tracking"],
            updatedAt: new Date().toISOString(),
        },
        {
            id: "2",
            question: "What are the shipping times?",
            answer: "Shipping typically takes 3-5 business days.",
            category: "Shipping",
            tags: [],
            updatedAt: new Date().toISOString(),
        },
    ]);

    const [editing, setEditing] = useState<FAQItem | null>(null);

    // CRUD handlers (replace with API calls)
    const handleSave = (item: FAQItem) => {
        setFaqs((prev) => {
            const found = prev.find((p) => p.id === item.id);
            if (found) {
                return prev.map((p) => (p.id === item.id ? item : p));
            }
            return [item, ...prev];
        });
        setEditing(null);
    };

    const handleDelete = (id: string) => {
        if (!confirm("Delete this FAQ?")) return;
        setFaqs((p) => p.filter((x) => x.id !== id));
    };

    // const handleCreateCategory = (name: string) => {
    //     if (categories.includes(name)) return alert("Category already exists");
    //     setCategories((c) => [name, ...c]);
    // };

    // const handleDeleteCategory = (name: string) => {
    //     if (!confirm(`Delete category "${name}"? This will not delete FAQs automatically.`)) return;
    //     setCategories((c) => c.filter((x) => x !== name));
    // };

    const handleImport = (items: FAQItem[]) => {
        // merge imported items, avoid id collisions
        setFaqs((p) => [...items, ...p]);
        // add categories from import
        const importedCats = items.map((i) => i.category).filter(Boolean) as string[];
        setCategories((c) => Array.from(new Set([...importedCats, ...c])));
        alert(`Imported ${items.length} FAQs`);
    };

    return (
        <div className="min-h-[calc(100vh-111px)] text-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900 flex items-center gap-3"><Book className="size-5" /> Knowledge Base</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left: FAQ list */}
                <div className="lg:col-span-2 space-y-4 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">FAQs</h2>
                        <Button
                            label="+ Add FAQ"
                            onClick={() => setEditing({ id: "", question: "", answer: "" })}
                            className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded"
                        />
                    </div>

                    <FAQListing faqs={faqs} categories={categories} onEdit={(f) => setEditing(f)} onDelete={handleDelete} />
                </div>

                {/* Right: Form, Categories, CSV Import */}
                <div className="lg:col-span-2 space-y-4 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Add / Edit FAQ</h3>
                        <FAQForm
                            initial={editing || {}}
                            categories={categories}
                            onSave={handleSave}
                            onCancel={() => setEditing(null)}
                        />
                    </div>

                    {/* <div>
                        <CategoriesPanel categories={categories} onCreate={handleCreateCategory} onDelete={handleDeleteCategory} />
                    </div> */}

                    <div>
                        <CsvImporter onImport={handleImport} />
                    </div>
                </div>
            </div>
        </div>
    );
}

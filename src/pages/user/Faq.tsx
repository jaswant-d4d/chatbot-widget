import Button from "@/components/ui/Button";
import { BookText } from "lucide-react";

export default function Faq() {
    return (
        <div className=" min-h-[calc(100vh-111px)]  ">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-900 mb-6 flex items-center gap-3">
                <BookText className="size-5" />
                Knowledge Base
            </h2>

            {/* Top Bar */}
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search FAQs..."
                    className=" p-2 rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
                <Button label={"+ Add FAQ"} variant={"primary"} onClick={() => { }} />
            </div>

            {/* FAQ List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-800">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-gray-600 dark:text-gray-400 text-sm border-b border-gray-200 dark:border-gray-700">
                            <th className="py-2">Question</th>
                            <th className="py-2">Category</th>
                            <th className="py-2">Updated</th>
                            <th className="py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array(5).fill(0).map((_, i) => (
                            <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="py-3 text-gray-700 dark:text-gray-300">
                                    How do I track my order?
                                </td>
                                <td className="py-3 text-gray-500 dark:text-gray-400">Orders</td>
                                <td className="py-3 text-gray-500 dark:text-gray-400">2 days ago</td>
                                <td className="py-3 text-right">
                                    <button className="text-blue-500 px-2">Edit</button>
                                    <button className="text-red-500 px-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

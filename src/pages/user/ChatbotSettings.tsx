import Button from "@/components/ui/Button";
import { Settings } from "lucide-react";

export default function ChatbotSettings() {
    return (
        <div className="min-h-[calc(100vh-111px)]  ">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-900 mb-6 flex items-center gap-3">
                <Settings className="size-5" />
                Chatbot Settings
            </h2>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-800 space-y-6">

                {/* Bot Name */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Bot Name</label>
                    <input
                        type="text"
                        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
                        placeholder="Acme Support Bot"
                    />
                </div>

                {/* Welcome Message */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Welcome Message</label>
                    <textarea
                        rows={3}
                        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
                        placeholder="Hi! How can I help you today?"
                    />
                </div>

                {/* Primary Color */}
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Primary Color</label>
                    <input
                        type="color"
                        className="w-16 h-10 p-1 rounded border dark:border-gray-700"
                    />
                </div>

                {/* Save button */}
                <Button label={"Save Settings"} variant={"primary"} onClick={() => { }} />
            </div>
        </div>
    );
}

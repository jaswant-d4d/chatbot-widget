
import { useChat } from "@/contexts/ChatContext";
import { motion } from "framer-motion";

import ChatView from "./ChatView";
import HomeView from "./HomeView";
import { Home, MessageCircle } from "lucide-react";



const Conversation = () => {
    const { page, setPage } = useChat();


    return (
        <>

            {page === "home" && (<HomeView />)}
            {page === "chat" && (<ChatView />)}


            {page === "home" && (
                <div className="px-4 py-2 absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-evenly items-center gap-5"
                    >
                        {/* Home Button */}
                        <button
                            className="cursor-pointer flex flex-col items-center group w-16 sm:w-20"
                            onClick={() => setPage("home")}
                        >
                            <Home
                                className={`size-7 p-1.5 rounded-full transition
                                    ${page === "home"
                                        ? "bg-blue-500 text-white shadow-sm"
                                        : "text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                                    }`}
                            />
                            <span
                                className={`text-xs sm:text-sm transition
                                    ${page === "home"
                                        ? "text-blue-600 font-semibold"
                                        : "text-gray-600 group-hover:text-blue-600 group-hover:font-semibold"
                                    }`}
                            >
                                Home
                            </span>
                        </button>

                        {/* Chat Button */}
                        <button
                            className="cursor-pointer flex flex-col items-center group w-16 sm:w-20"
                            onClick={() => setPage("chat")}
                        >
                            <MessageCircle
                                className={`size-7 p-1.5 rounded-full transition text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600}`}
                            />
                            <span
                                className={` text-xs sm:text-sm transition text-gray-600 group-hover:text-blue-600 group-hover:font-semibold`}
                            >
                                Chat
                            </span>
                        </button>

                    </motion.div>
                </div>
            )}
        </>
    )
}

export default Conversation
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useChat } from "@/contexts/ChatContext";
import { topics, knowledgeBase, type TopicKey } from "@/data/chatbot/KnowledgeBase";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, MessageCircle } from "lucide-react";

interface MessageType {
    sender: string
    message: string
    timestamp?: string
}

const HomeView = () => {
    const { isAuthenticated } = useAuth();
    const { setPage, setBotTyping, setMessages, setRegisterOpen } = useChat();

    const [selectedTopic, setSelectedTopic] = useState<TopicKey | null>(null);
    const [step, setStep] = useState("select_topic");

    const handleTopicSelect = (topic: TopicKey) => {
        setSelectedTopic(topic);
        setStep("selected_topic");
    };

    const handleQuestionClick = (ques: string, ans: string) => {
        const userMessage: MessageType = { sender: "user", message: ques, timestamp: new Date().toISOString() };
        const botMessage: MessageType = { sender: "bot", message: ans, timestamp: new Date().toISOString() };

        // Step 1: Add user message instantly
        setMessages((prev: MessageType[]) => [...prev, userMessage]);

        // Step 2: Show bot typing after small delay
        setTimeout(() => {
            setBotTyping(true);

            // Step 3: Add bot message after delay
            setTimeout(() => {
                setMessages((prev: MessageType[]) => [...prev, botMessage]);
                setBotTyping(false);
            }, 1000);
        }, 300);
        setPage("chat");

    };

    const handleResetConversation = () => {
        setStep("select_topic");
        setSelectedTopic(null);
    };

    return (
        <>
            <div className="p-4 space-y-4  scrollbar-hide overflow-auto overscroll-none">

                {/* Greeting */}
                {step === "select_topic" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                    >
                        {/* <div className="bot-message ">
                        <h3 className=' font-semibold text-xl '>👋 Hi there! <br/> </h3>
                        <p className='mb-8 font-semibold text-xl '>Welcome to Digital4Design. <br/> </p>
                        <p className='mb-4 font-medium'>💬 How can we assist you today?</p>

                    </div> */}
                        <div className="bot-message bg-gray-100 rounded-lg shadow-md p-3 sm:p-4">
                            <h3 className="text-2xl font-bold text-gray-800 leading-snug mb-2">👋 Hi there!</h3>
                            <p className="text-base font-semibold text-gray-900 mb-6">Welcome to <span className="text-blue-500">Digital4Design</span>.</p>
                            <div className="flex items-center gap-2 text-gray-700 text-base mb-2">
                                <MessageCircle className="size-4" />
                                <p className=" text-sm">How can we assist you today?</p>
                            </div>
                        </div>
                        <div className="grid gap-3 mt-8">
                            {topics.map((topic) => (
                                <React.Fragment key={topic.key}>
                                    <button
                                        key={topic.key}
                                        onClick={() => handleTopicSelect(topic.key)}
                                        className="bg-gray-100 text-sm px-2 sm:px-4 py-2 rounded-lg  shadow-sm hover:shadow-md cursor-pointer hover:underline "
                                    >
                                        {topic.label}
                                    </button>
                                </React.Fragment>
                            ))}

                        </div>
                    </motion.div>
                )}
                {/* Common Questions */}
                {step === "selected_topic" && selectedTopic && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                    >
                        <button
                            onClick={handleResetConversation}
                            className="w-full text-blue-500 text-base text-center flex items-center gap-2 cursor-pointer hover:underline"
                        >
                            <ArrowLeft className="text-blue-500 size-4 sm:size-6" />
                            Back to Topics
                        </button>
                        <div className="bot-message mt-8">
                            <div className="flex flex-col items-start gap-3 w-full max-w-xs sm:max-w-sm md:max-w-md">
                                {knowledgeBase[selectedTopic].map((item, i) => (
                                    <button
                                        key={`topic-${i}`}
                                        onClick={() => {
                                            if (!isAuthenticated) {
                                                setRegisterOpen(true);
                                                return;
                                            }
                                            handleQuestionClick(item.question, item.answer);
                                            setPage("chat");
                                        }}
                                        className="bg-gray-100 text-sm rounded-lg text-left px-3 sm:px-4 py-2 shadow-sm hover:shadow-md transition cursor-pointer"
                                    >
                                        {item.question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </>
    )
}

export default HomeView;
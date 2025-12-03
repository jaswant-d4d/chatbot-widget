import Chatbox from "@/components/chatbox";
import ChatIcon from "/images/chat-icon.png";
import { useChat } from "@/contexts/ChatContext";

export default function GuestLayout() {
  const { isChatVisible, setChatVisible } = useChat();

  return (
    <div>
      {!isChatVisible ? (
        <button
          type="button"
          className="fixed bottom-4 right-4 sm:bottom-10 sm:right-10 z-50 transition-all duration-300 shadow-lg rounded-4xl hover:scale-115"
          onClick={() => setChatVisible(true)}
        >
          <img
            src={ChatIcon}
            alt="Chat"
            className="h-10 w-10 rounded-full object-cover"
          />
        </button>
      ) : (
        <Chatbox />
      )}
    </div>
  );
}
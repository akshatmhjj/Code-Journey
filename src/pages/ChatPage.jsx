import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Menu, X, MessageSquare } from "lucide-react";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { formatAIResponse } from "../utils/formatAIResponse";

const TypingBubble = () => (
  <div className="flex items-center space-x-1 bg-[#1a1f27] text-gray-300 rounded-xl px-4 py-2 border border-blue-500/20">
    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
  </div>
);

const ChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hey there! I’m your Web Dev AI — ready to help with code, bugs, or explanations!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const chatEndRef = useRef();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  /** Send message + stream response */
  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);

    const API_BASE =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    const eventSource = new EventSource(
      `${API_BASE}/api/chat/stream?message=${encodeURIComponent(input)}`
    );


    let assistantMsg = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    eventSource.onmessage = (e) => {
      if (e.data === "[DONE]") {
        eventSource.close();
        setIsStreaming(false);
        return;
      }

      assistantMsg.content += e.data;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...assistantMsg };
        return updated;
      });
    };

    eventSource.onerror = () => {
      eventSource.close();
      setIsStreaming(false);
    };
  };

  return (
    <div className="flex h-dvh bg-[#0a0c10] text-white overflow-hidden relative">
      {/* === SIDEBAR === */}
      {/* Permanent on Desktop */}
      <aside className="hidden md:flex flex-col bg-[#111827]/95 border-r border-white/10 w-64 flex-shrink-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h2 className="font-semibold text-gray-200 flex items-center gap-2 text-sm">
            <MessageSquare className="w-4 h-4 text-blue-400" /> My Chats
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-700">
          {["Responsive Navbar Help", "Fix React Hook Error", "JS Debugging"].map(
            (c, i) => (
              <div
                key={i}
                className="p-3 text-sm text-gray-300 bg-white/5 hover:bg-blue-600/30 rounded-lg cursor-pointer transition"
              >
                {c}
              </div>
            )
          )}
        </div>
      </aside>

      {/* Toggle Sidebar on Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-[#111827]/95 border-r border-white/10 flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h2 className="font-semibold text-gray-200 flex items-center gap-2 text-sm">
                <MessageSquare className="w-4 h-4 text-blue-400" /> My Chats
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-700">
              {["Responsive Navbar Help", "Fix React Hook Error", "JS Debugging"].map(
                (c, i) => (
                  <div
                    key={i}
                    className="p-3 text-sm text-gray-300 bg-white/5 hover:bg-blue-600/30 rounded-lg cursor-pointer transition"
                  >
                    {c}
                  </div>
                )
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* === MAIN CHAT === */}
      <motion.div layout className="flex flex-col flex-1 transition-all duration-300">
        {/* Header */}
        <header className="flex items-center justify-between px-5 py-3 bg-[#0d1117]/80 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* Show menu only on mobile */}
            <button
              className="p-2 hover:bg-white/10 rounded-lg transition md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5 text-gray-300" />
            </button>
            <h1 className="text-base md:text-lg font-semibold tracking-wide flex items-center gap-1">
              <span className="text-blue-400">⚡</span> CODE JOURNEY
            </h1>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-sm px-4 py-1.5 rounded-lg font-medium transition">
            Profile
          </button>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-4 bg-gradient-to-b from-[#0b0f19] to-[#121620] space-y-5 scrollbar-thin scrollbar-thumb-gray-700">
          {messages.map((msg, i) => {
            const formattedText = formatAIResponse(msg.content);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-end gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {msg.role === "assistant" && (
                  <div className="p-2 bg-blue-600/20 rounded-full border border-blue-500/30">
                    <Bot className="w-5 h-5 text-blue-400" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] md:max-w-[70%] p-3 md:p-4 text-sm md:text-base leading-relaxed rounded-2xl ${msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-[#1a1f27] text-gray-100 border border-blue-500/20 rounded-bl-none"
                    }`}
                >
                  <div className="prose prose-invert max-w-none leading-relaxed text-gray-100">
                    <MarkdownRenderer text={formattedText} />
                  </div>
                </div>
                {msg.role === "user" && (
                  <div className="p-2 bg-blue-500/80 rounded-full border border-blue-300/30">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </motion.div>
            );
          })}

          {isStreaming && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <TypingBubble />
            </div>
          )}
          <div ref={chatEndRef} />
        </main>

        {/* Input */}
        <footer className="p-3 md:p-4 border-t border-white/10 bg-[#10141b]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about web dev, frameworks, or debugging..."
              className="flex-1 bg-[#151a22] text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/40 transition"
            />
            <button
              onClick={sendMessage}
              disabled={isStreaming}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 p-3 rounded-xl transition flex items-center justify-center shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default ChatPage;

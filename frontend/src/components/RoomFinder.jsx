import { useState } from "react";

export default function RoomFinder() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! Welcome to ResiSure. 👋 I'm here to help you find student accommodation. What are you looking for today?",
    },
  ]);

  const suggestions = [
    "Find NSFAS-accredited accommodation",
    "Show me furnished accommodation",
    "Find accommodation in Johannesburg",
  ];

  const handleSend = (text = message) => {
    const trimmedMessage = text.trim();

    if (!trimmedMessage) return;

    setMessages((previous) => [
      ...previous,
      { sender: "user", text: trimmedMessage },
      {
        sender: "bot",
        text: "Thanks for reaching out! This feature is currently a demonstration. During Phase 2, ResiSure will connect you with accommodation listings based on your preferences.",
      },
    ]);

    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="mb-4 flex h-125 w-[calc(100vw-32px)] max-w-95 flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl sm:w-95">

          {/* CHAT HEADER */}
          <div className="flex items-center justify-between bg-[#087CFF] px-5 py-4 text-white">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl font-bold text-[#087CFF]">
                R.
              </div>

              <div>
                <h3 className="font-semibold">
                  ResiSure Assistant
                </h3>

                <p className="text-xs text-white/85">
                  Here to help you find your room
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-[#006BE6]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            </button>

          </div>

          {/* CHAT MESSAGES */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">

            {messages.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    item.sender === "user"
                      ? "rounded-br-sm bg-[#087CFF] text-white"
                      : "rounded-bl-sm border border-slate-100 bg-white text-slate-700 shadow-sm"
                  }`}
                >
                  {item.text}
                </div>

              </div>
            ))}

            {/* SUGGESTED QUESTIONS */}
            {messages.length === 1 && (
              <div className="space-y-2 pt-2">

                <p className="text-xs font-semibold text-slate-400">
                  QUICK QUESTIONS
                </p>

                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSend(suggestion)}
                    className="block w-full cursor-pointer rounded-xl border border-blue-100 bg-white px-3 py-2.5 text-left text-xs font-medium text-[#087CFF] transition-colors duration-200 hover:border-[#087CFF] hover:bg-blue-50"
                  >
                    {suggestion}
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* MESSAGE INPUT */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-slate-100 bg-white p-3"
          >

            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your message..."
              className="h-11 min-w-0 flex-1 rounded-xl bg-slate-100 px-4 text-sm text-slate-700 outline-none transition focus:ring-2 focus:ring-[#087CFF]/20"
            />

            <button
              type="submit"
              disabled={!message.trim()}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#087CFF] text-white transition-colors duration-200 hover:bg-[#006BE6] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>

          </form>

        </div>
      )}

      {/* FLOATING FIND YOUR ROOM BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="ml-auto flex cursor-pointer items-center gap-3 rounded-full bg-[#087CFF] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-200/60 transition-all duration-300 hover:-translate-y-1 hover:bg-[#006BE6] hover:shadow-xl active:scale-95"
      >

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
        </svg>

        {isOpen ? "Close Assistant" : "Find Your Room"}

      </button>

    </div>
  );
}

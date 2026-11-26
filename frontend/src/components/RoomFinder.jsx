
import { useEffect, useRef, useState } from "react";

export default function RoomFinder() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! Welcome to ResiSure. 👋 I'm here to help you find student accommodation. What are you looking for today?",
      time: new Date(),
    },
  ]);

  const suggestions = [
    "Find NSFAS-accredited accommodation",
    "Show me furnished accommodation",
    "Find accommodation in Johannesburg",
  ];

  // AUTOMATICALLY SCROLL TO THE LATEST MESSAGE
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isOpen]);

  // SEND MESSAGE
  const handleSend = (text = message) => {
    const trimmedMessage = text.trim();

    if (!trimmedMessage) return;

    const now = new Date();

    setMessages((previous) => [
      ...previous,
      {
        id: `${Date.now()}-user`,
        sender: "user",
        text: trimmedMessage,
        time: now,
      },
      {
        id: `${Date.now()}-bot`,
        sender: "bot",
        text: "Thanks for reaching out! This feature is currently a Phase 1 demonstration. During Phase 2, ResiSure will connect you with accommodation listings based on your preferences.",
        time: new Date(),
      },
    ]);

    setMessage("");
  };

  // FORMAT MESSAGE TIME
  const formatTime = (time) =>
    time.toLocaleTimeString("en-ZA", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="mb-4 flex h-[min(500px,calc(100dvh-120px))] w-[calc(100vw-32px)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl sm:w-[380px]">

          {/* CHAT HEADER */}
          <div className="flex shrink-0 items-center justify-between bg-[#087CFF] px-5 py-4 text-white">

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
              className="cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-[#006BE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            </button>

          </div>

          {/* DEMONSTRATION NOTICE */}
          <div className="shrink-0 border-b border-blue-100 bg-blue-50 px-4 py-2">
            <p className="text-center text-[11px] font-medium text-blue-700">
              Phase 1 demonstration · Automated search coming in Phase 2
            </p>
          </div>

          {/* CHAT MESSAGES */}
          <div
            role="log"
            aria-live="polite"
            aria-label="Chat conversation"
            className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4"
          >

            {messages.map((item) => (
              <div
                key={item.id}
                className={`flex ${
                  item.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div className="max-w-[85%]">

                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      item.sender === "user"
                        ? "rounded-br-sm bg-[#087CFF] text-white"
                        : "rounded-bl-sm border border-slate-100 bg-white text-slate-700 shadow-sm"
                    }`}
                  >
                    {item.text}
                  </div>

                  <p
                    className={`mt-1 text-[10px] text-slate-400 ${
                      item.sender === "user"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {formatTime(item.time)}
                  </p>

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
                    className="block w-full cursor-pointer rounded-xl border border-blue-100 bg-white px-3 py-2.5 text-left text-xs font-medium text-[#087CFF] transition-colors duration-200 hover:border-[#087CFF] hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087CFF]"
                  >
                    {suggestion}
                  </button>
                ))}

              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          {/* MESSAGE INPUT */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
            className="flex shrink-0 items-center gap-2 border-t border-slate-100 bg-white p-3"
          >

            <input
              type="text"
              aria-label="Type your message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your message..."
              className="h-11 min-w-0 flex-1 rounded-xl bg-slate-100 px-4 text-sm text-slate-700 outline-none transition focus:ring-2 focus:ring-[#087CFF]/20"
            />

            <button
              type="submit"
              disabled={!message.trim()}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#087CFF] text-white transition-colors duration-200 hover:bg-[#006BE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087CFF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
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
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-label={
          isOpen
            ? "Close ResiSure Assistant"
            : "Open ResiSure Assistant"
        }
        className="ml-auto flex cursor-pointer items-center gap-3 rounded-full bg-[#087CFF] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-200/60 transition-all duration-300 hover:-translate-y-1 hover:bg-[#006BE6] hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087CFF] focus-visible:ring-offset-2"
      >

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
        </svg>

        {isOpen ? "Close Assistant" : "Find Your Room"}

      </button>

    </div>
  );
}

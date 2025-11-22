import React, { useState, useEffect, useRef } from "react";

export default function CareerBot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm CareerBot. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };

    setMessages((prev) => [...prev, userMsg]);
    const userQuestion = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://nextgen-hackathon-greensoul-careerv.vercel.app/api/careerbot/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userQuestion }),
      });

      const data = await res.json();

      const botMsg = {
        role: "assistant",
        content: data.answer || "Sorry, I couldn't generate a response.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error contacting the AI server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6 first-color"
      style={{ background: "#f6f5f5" }}
    >
      <h1 className="text-3xl font-bold mb-4" style={{ color: "#048998" }}>
        CareerBot Assistant
      </h1>

      <div
        className="w-full max-w-2xl p-4 rounded-lg shadow-lg overflow-y-auto second-color"
        style={{
          height: "70vh",
          background: "#e3e3e3",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-xl max-w-[75%] text-white ${
                msg.role === "user" ? "fourth-color" : "third-color"
              }`}
              style={{
                background: msg.role === "user" ? "#048998" : "#3bb4c1",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start mb-3">
            <div
              className="p-3 rounded-xl text-white third-color"
              style={{ background: "#3bb4c1" }}
            >
              Typing...
            </div>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      <div className="w-full max-w-2xl mt-4 flex">
        <input
          type="text"
          placeholder="Ask CareerBot anything..."
          className="flex-1 p-3 border rounded-l-lg focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="px-6 py-3 text-white rounded-r-lg"
          style={{ background: "#048998" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

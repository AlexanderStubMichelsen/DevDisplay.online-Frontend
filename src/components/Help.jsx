import React from "react";
import { useState } from "react";
import "../css/Help.css";
import NavBar from "./NavBar";

function Help() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm your assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const botReply = {
      role: "bot",
      text: "Let me look into that for you... (This is a static reply 🧠)",
    };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput("");
  };

  return (
    <>
      <NavBar />
      <div className="help">
        <div className="chatbox">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form className="chat-input-column" onSubmit={handleSubmit}>
          <input
              type="text"
              value={input}
              placeholder="Ask something..."
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Help;

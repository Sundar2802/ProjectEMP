
import React from "react";

const ChatHistory = ({ chatHistory }) => {
  return (
    <div className="chat-history">
      {chatHistory.map((chat, index) => (
        <div
          key={index}
          className={`chat-message ${chat.type === "user" ? "user" : "bot"}`}
        >
          <div className="message">{chat.message}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;

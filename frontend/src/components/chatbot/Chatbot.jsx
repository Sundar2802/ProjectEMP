import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";
import './Chatbot.css';

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const genAI = new GoogleGenerativeAI("AIzaSyAHBditGEmSrn0mWdEnnMg_ffx7cik2QHs"); // Replace with your actual API key
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const prompt = `Summarize the following content in simple words:\n\n"${userInput}"`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      console.log(response);

      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox" style={{marginBottom:'100px',marginRight:'30px'}}>
        <div className="chatbox-header">
          <h1 className="chatbox-title">Chatbot</h1>
        </div>
        <div className="chatbox-content">
          <ChatHistory chatHistory={chatHistory} />
          <Loading isLoading={isLoading} />
        </div>
        <div className="chatbox-input">
          <input
            type="text"
            placeholder="Type or paste the content to summarize..."
            value={userInput}
            onChange={handleUserInput}
          />
          <button onClick={sendMessage} disabled={isLoading}>
            Summarize
          </button>
          <button className="clear-chat" onClick={clearChat}>
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

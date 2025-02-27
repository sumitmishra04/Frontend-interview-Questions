import React, { useEffect, useRef, useState } from "react";

const mockResponses = [
  "That's interesting!",
  "Tell me more!",
  "I totally agree.",
  "Haha, good one!",
  "What else is new?",
  "Sounds great!",
  "Let’s catch up soon!",
];

export default function ChatApp() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how are you?", sender: "user", timestamp: "10:00 AM" },
    {
      id: 2,
      text: "I'm good! What about you?",
      sender: "bot",
      timestamp: "10:01 AM",
    },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return; // Prevent sending empty messages

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate bot response after 1 second
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <span className="text">{msg.text}</span>
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={chatRef}></div>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}


// .App {
//     font-family: sans-serif;
//     text-align: center;
//   }
//   .chat-container {
//     width: 350px;
//     height: 500px;
//     display: flex;
//     flex-direction: column;
//     border: 2px solid #ccc;
//     border-radius: 10px;
//     overflow: hidden;
//     background: #f9f9f9;
//   }
  
//   .chat-box {
//     flex-grow: 1;
//     padding: 10px;
//     overflow-y: auto;
//     display: flex;
//     flex-direction: column;
//     background-color: yellow;
//   }
  
//   .message {
//     max-width: 70%;
//     padding: 8px 12px;
//     margin: 5px;
//     border-radius: 10px;
//     display: flex;
//     flex-direction: column;
//     font-size: 14px;
//   }
  
//   .message.user {
//     align-self: flex-end;
//     background-color: #007bff;
//     color: white;
//   }
  
//   .message.bot {
//     align-self: flex-start;
//     background-color: #e0e0e0;
//     color: black;
//   }
  
//   .timestamp {
//     font-size: 10px;
//     align-self: flex-end;
//     margin-top: 2px;
//     opacity: 0.7;
//   }
  
//   .input-container {
//     display: flex;
//     border-top: 1px solid #ccc;
//     padding: 5px;
//   }
  
//   input {
//     flex-grow: 1;
//     padding: 8px;
//     border: none;
//     outline: none;
//     font-size: 14px;
//   }
  
//   button {
//     padding: 8px 12px;
//     border: none;
//     background: #007bff;
//     color: white;
//     cursor: pointer;
//   }
  
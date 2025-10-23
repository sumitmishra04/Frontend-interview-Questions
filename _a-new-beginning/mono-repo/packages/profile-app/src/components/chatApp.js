import React, { useEffect, useRef, useState } from 'react';
import './chat.css';

function ChatApp() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef(null);
    const eventSourceRef = useRef(null);

    useEffect(() => {
      scrollToBottom();
    }, [messages]);

     const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
     };

    
  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    // Add user's message
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');

    // --- STEP 4: Open EventSource connection to receive streaming bot reply ---
    if (eventSourceRef.current) {
      eventSourceRef.current.close(); // close old connection if any
    }

    // 🚧 We'll point this to real backend later. For now just placeholder.
    const url = 'http://localhost:3002/api/chat/stream';

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    let botMessageIndex = null;

    eventSource.onmessage = (event) => {
      const data = event.data;

      // If this is first chunk, add a new bot message bubble
      if (botMessageIndex === null) {
        botMessageIndex = messages.length;
        setMessages(prev => [...prev, { role: 'bot', content: data }]);
      } else {
        // Append chunks to the last bot message
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[botMessageIndex].content += data;
          return newMessages;
        });
      }
    };

    eventSource.onerror = (err) => {
      console.log("SSE connection error:", err);
      eventSource.close();
    };
  };


  return (
    <div className="chat-container">
      <div className="chat-header">
        Chatbot
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.role === 'user' ? 'user-bubble' : 'bot-bubble'}`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatApp;

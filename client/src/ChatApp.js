import React, { useState } from 'react';

export default function ChatApp() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Send to backend (mocked here)
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    });

    const data = await response.json();
    setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col space-y-4">
        <div className="overflow-y-auto max-h-[60vh] space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 self-end' : 'bg-gray-700 self-start'}`}>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-700 text-white outline-none"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

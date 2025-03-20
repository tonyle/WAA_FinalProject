import React, { useState, useEffect } from "react";

const mockMessages = [
  { id: 1, sender: "John Doe", message: "Is the Beach House still available?" },
  { id: 2, sender: "Jane Smith", message: "Can I schedule a visit for the Downtown Condo?" }
];

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-6">Messages from Customers</h1>
      <div className="bg-white shadow-md p-4 rounded-md">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="border-b py-2">
              <strong>{msg.sender}:</strong> {msg.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Messages;

"use client";

import React, { useState } from "react";
// import { api } from "~/utils/api";

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Subscribe to real-time messages
  // api.chat.onMessage.useSubscription(undefined, {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   onData: (data: any) => {
  //     // Ensure data.messages is of type Message[]
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     const newMessages: Message[] = data.messages.map((msg: any) => ({
  //       sender: msg.sender,
  //       content: msg.content,
  //       timestamp: msg.timestamp,
  //     }));
  //     setMessages(newMessages);
  //   },
  // });

  // Mutation to send a message
  // const sendMessage = api.chat.sendMessage.useMutation();

  const handleSend = () => {
    if (input.trim()) {
      // sendMessage.mutate(
      //   { sender: "User", content: input },
      //   {
      //     onSuccess: (response) => {
      //       // Ensure response is of type Message
      //       const newMessage: Message = {
      //         sender: response.sender,
      //         content: response.content,
      //         timestamp: response.timestamp.toISOString(),
      //       };
      //       setMessages((prev) => [...prev, newMessage]); // Add AI response
      //       setInput("");
      //     },
      //   }
      // );
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-80 bg-white shadow-lg p-4 rounded-lg z-50">
      <div className="h-64 overflow-y-scroll mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender}:</strong> {msg.content}{" "}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button onClick={handleSend} className="w-full mt-2 bg-blue-500 text-white p-2 rounded">
        Send
      </button>
    </div>
  );
};

export default LiveChat;
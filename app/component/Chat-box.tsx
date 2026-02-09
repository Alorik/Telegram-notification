"use client";

import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handlSend() {
    if (!message.trim()) return;
    setLoading(true);

    const res = await fetch("/api/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    setLoading(false);

    if (res.ok) {
      setMessage("");
      alert("Message sent!");
    } else {
      alert("Failed to send");
    }
  }
  return (
    <div>
      <textarea
        value={message}
        className=" border border-gray-900 h-32 w-92 text-black p-4 rounded-lg"
        placeholder="send message to Alorik"
        rows={5}
      />
      <button
        onClick={handlSend}
        disabled={loading}
        className="text-black border border-gray-700 px-4 rounded-lg cursor-pointer"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { toast } from "react-toastify";

function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !message.trim()) {
      toast.error("Please fill out both fields before submitting.");
      return;
    }

    toast.success("Message sent successfully!");

    setEmail("");
    setMessage("");
  };

  return (
    <BackgroundLines className="flex min-h-screen bg-black items-center justify-center px-4 py-20">
      <div className="w-full max-w-3xl space-y-10">
        <div className="text-center mt-30">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Contact Us
          </h1>
          <div className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto">
            <p>
              We're happy to help with any questions regarding this application.
            </p>
            Send us a message and we'll get back to you shortly.
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-opacity-70 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6"
        >
          <div>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              required
            />
          </div>

          <div>
            <textarea
              id="message"
              rows={6}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-black text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="flex justify-center px-6 py-3 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors duration-300 cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </BackgroundLines>
  );
}

export default ContactPage;

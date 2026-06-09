import { EmailModalProps } from "@/constants/interfaces";
import { useState } from "react";

export default function EmailModal({ recipients, onClose, onSend }: EmailModalProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      alert("Please fill in subject and message.");
      return;
    }
    onSend(subject, message);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
        <h3 className="mb-1 text-base font-semibold text-gray-900">
          Send email
        </h3>
        <p className="mb-4 text-xs text-gray-500">
          Sending to {recipients.length} recipient
          {recipients.length > 1 ? "s" : ""}
        </p>

        {/* Recipient chips */}
        <div className="mb-4 flex max-h-24 flex-wrap gap-1.5 overflow-y-auto">
          {recipients.map((u) => (
            <span
              key={u.id}
              className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs text-blue-700"
            >
              {u.email}
            </span>
          ))}
        </div>

        {/* Subject */}
        <div className="mb-3">
          <label className="mb-1 block text-xs text-gray-500">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject..."
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
          />
        </div>

        {/* Message */}
        <div className="mb-5">
          <label className="mb-1 block text-xs text-gray-500">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            rows={4}
            className="w-full resize-y rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="rounded-md bg-blue-600 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
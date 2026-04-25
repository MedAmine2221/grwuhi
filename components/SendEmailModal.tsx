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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0d1825] p-6 shadow-2xl">
        <h3 className="mb-1 text-[15px] font-semibold text-[#dce8f5]">
          Send email
        </h3>
        <p className="mb-4 text-[12px] text-[#8a9bb8]">
          Sending to {recipients.length} recipient
          {recipients.length > 1 ? "s" : ""}
        </p>

        {/* Recipient chips */}
        <div className="mb-4 flex max-h-24 flex-wrap gap-1.5 overflow-y-auto">
          {recipients.map((u) => (
            <span
              key={u.id}
              className="rounded-full border border-[#1a9e8f]/25 bg-[#1a9e8f]/10 px-2.5 py-0.5 text-[11px] text-[#1a9e8f]"
            >
              {u.email}
            </span>
          ))}
        </div>

        {/* Subject */}
        <div className="mb-3">
          <label className="mb-1 block text-[11px] text-[#8a9bb8]">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject..."
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-[#c2d0e6] outline-none placeholder:text-[#8a9bb8]/50 focus:border-[#1a9e8f]/50"
          />
        </div>

        {/* Message */}
        <div className="mb-5">
          <label className="mb-1 block text-[11px] text-[#8a9bb8]">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            rows={4}
            className="w-full resize-y rounded-md border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-[#c2d0e6] outline-none placeholder:text-[#8a9bb8]/50 focus:border-[#1a9e8f]/50"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border border-white/10 bg-white/5 px-4 py-1.5 text-[12px] font-medium text-[#8a9bb8] transition hover:bg-white/10 hover:text-[#c2d0e6]"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="rounded-md bg-[#1a9e8f] px-4 py-1.5 text-[12px] font-medium text-white transition hover:bg-[#16887b]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

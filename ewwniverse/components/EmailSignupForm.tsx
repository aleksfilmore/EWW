"use client";

import { useState } from "react";

interface EmailSignupFormProps {
  placeholder?: string;
  buttonText?: string;
  buttonVariant?: "green" | "dark";
}

type Status = "idle" | "submitting" | "done" | "error";

export default function EmailSignupForm({
  placeholder = "your@email.com",
  buttonText = "Subscribe",
  buttonVariant = "green",
}: EmailSignupFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="text-sm text-[#5DB84A] font-semibold py-3">
        Dr. Icky has noted your email. You will be contacted when the lab opens.
      </p>
    );
  }

  return (
    <div>
      <form
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder={placeholder}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-full border border-[#C8B89A] bg-[#F7F2E4] text-[#3D2B1F] text-sm focus:outline-none focus:border-[#5DB84A] transition-colors placeholder:text-[#A89070]"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`font-semibold px-6 py-3 rounded-full text-sm whitespace-nowrap transition-colors disabled:opacity-60 ${
            buttonVariant === "dark"
              ? "bg-[#1A3D0E] hover:bg-[#3D8C2A] text-white"
              : "bg-[#5DB84A] hover:bg-[#3D8C2A] text-white"
          }`}
        >
          {status === "submitting" ? "..." : buttonText}
        </button>
      </form>
      {status === "error" && (
        <p className="text-xs text-[#A32D2D] mt-2 text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}

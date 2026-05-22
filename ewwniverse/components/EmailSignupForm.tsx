"use client";

import { useState } from "react";

interface EmailSignupFormProps {
  placeholder?: string;
  buttonText?: string;
  buttonVariant?: "green" | "dark";
}

export default function EmailSignupForm({
  placeholder = "your@email.com",
  buttonText = "Subscribe",
  buttonVariant = "green",
}: EmailSignupFormProps) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="text-sm text-[#5DB84A] font-semibold py-3">
        Dr. Icky has noted your email. You will be contacted when the lab opens.
      </p>
    );
  }

  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        placeholder={placeholder}
        required
        className="flex-1 px-4 py-3 rounded-full border border-[#C8B89A] bg-[#F7F2E4] text-[#3D2B1F] text-sm focus:outline-none focus:border-[#5DB84A] transition-colors"
      />
      <button
        type="submit"
        className={`font-semibold px-6 py-3 rounded-full text-sm whitespace-nowrap transition-colors ${
          buttonVariant === "dark"
            ? "bg-[#1A3D0E] hover:bg-[#3D8C2A] text-white"
            : "bg-[#5DB84A] hover:bg-[#3D8C2A] text-white"
        }`}
      >
        {buttonText}
      </button>
    </form>
  );
}

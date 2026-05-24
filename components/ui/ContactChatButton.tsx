"use client";

import { Mail } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ContactChatButton() {
  return (
    <Button
      type="button"
      icon={<Mail size={20} strokeWidth={2} />}
      className="mt-8 px-7 py-3 text-sm"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("portfolio:open-chat", {
            detail: { message: "get in touch" },
          }),
        );
      }}
    >
      Get in Touch
    </Button>
  );
}

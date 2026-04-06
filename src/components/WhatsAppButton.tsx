import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const message = encodeURIComponent("Hello, I want to place an order from Hot & Spicy.");
  const phone = "923001234567";

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Order via WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </a>
  );
}

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 hover:shadow-[0_12px_32px_-8px_hsl(var(--primary)/0.55)] transition-all duration-300 ease-out flex items-center justify-center ${
        isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-4 pointer-events-none"
      }`}
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      aria-label="Torna su"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTop;

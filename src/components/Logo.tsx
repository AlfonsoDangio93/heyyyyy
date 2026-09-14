import logo from "@/assets/logo-transparent.png";

interface LogoProps {
  variant?: "default" | "white";
  size?: "default" | "large";
}

/**
 * Il file ha trasparenza vera, quindi niente piu' `mix-blend-mode: multiply`.
 * Quel trucco serviva a nascondere il bianco cotto dentro il vecchio PNG e
 * aveva due difetti: si rompeva dentro qualunque contesto di impilamento
 * (bastava un `Reveal`, che applica `will-change` e `transform`), e rendeva
 * inservibile la variante bianca, perche' `brightness(0) invert(1)` su uno
 * sfondo opaco produce un rettangolo bianco pieno.
 */
const Logo = ({ variant = "default", size = "default" }: LogoProps) => {
  const sizeClasses = size === "large" ? "h-12 md:h-14" : "h-9 md:h-11";

  return (
    <img
      src={logo}
      alt="HeyLucy"
      className={`${sizeClasses} w-auto object-contain transition-[filter] duration-200 ${
        variant === "white" ? "brightness-0 invert" : ""
      }`}
    />
  );
};

export default Logo;

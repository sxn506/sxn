import type { ReactNode } from "react";

type ButtonVariant = "accent" | "ghost";
type ButtonSize = "sm" | "md";

const VARIANTS: Record<ButtonVariant, string> = {
  accent: "bg-accent text-white hover:brightness-95 disabled:bg-accent-soft disabled:hover:brightness-100",
  ghost: "bg-hover text-ink hover:bg-line-strong/70",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-[26px] px-3 text-[12.5px]",
  md: "h-8 px-3.5 text-[13px]",
};

export function Button({
  children,
  variant = "accent",
  size = "sm",
  disabled = false,
  onClick,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex select-none items-center justify-center rounded-full font-medium leading-none shadow-btn transition-[filter,background-color,color] duration-150 disabled:cursor-default disabled:shadow-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;

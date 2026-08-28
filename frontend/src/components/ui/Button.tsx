import type { ButtonHTMLAttributes, ReactNode } from "react";

import { classNames } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        "ui-button",
        `ui-button--${variant}`,
        `ui-button--${size}`,
        fullWidth && "ui-button--full-width",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
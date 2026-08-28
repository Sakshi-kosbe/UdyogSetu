import type { ReactNode } from "react";

import { classNames } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

export default function Badge({
  children,
  variant = "neutral",
}: BadgeProps) {
  return (
    <span
      className={classNames(
        "ui-badge",
        `ui-badge--${variant}`
      )}
    >
      {children}
    </span>
  );
}
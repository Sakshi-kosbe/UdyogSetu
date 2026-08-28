import type { HTMLAttributes, ReactNode } from "react";

import { classNames } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({
  children,
  padding = "md",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={classNames(
        "ui-card",
        `ui-card--padding-${padding}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
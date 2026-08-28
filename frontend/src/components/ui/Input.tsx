import type { InputHTMLAttributes } from "react";

import { classNames } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  className,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="ui-field">
      {label && (
        <label className="ui-label" htmlFor={inputId}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={classNames(
          "ui-input",
          error && "ui-input--error",
          className
        )}
        {...props}
      />

      {error && <span className="ui-field-error">{error}</span>}
    </div>
  );
}
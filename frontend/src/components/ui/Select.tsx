import type { SelectHTMLAttributes } from "react";

import { classNames } from "@/lib/utils";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export default function Select({
  label,
  error,
  options,
  id,
  className,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <div className="ui-field">
      {label && (
        <label className="ui-label" htmlFor={selectId}>
          {label}
        </label>
      )}

      <select
        id={selectId}
        className={classNames(
          "ui-select",
          error && "ui-input--error",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className="ui-field-error">{error}</span>}
    </div>
  );
}
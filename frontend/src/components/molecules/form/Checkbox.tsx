import React, { FC } from "react";

import { useField } from "formik";
import c from "classnames";

interface Props {
  name: string;
  label?: string;
  className?: string;
  thick?: boolean;
  children?: React.ReactNode;
  disabled?: boolean; // <-- Add this
}

export const Checkbox: FC<Props> = ({
  className,
  name,
  thick = false,
  children,
  label = "",
  disabled = false, // <-- Default to false
}) => {
  const [field, meta] = useField({
    name,
    type: "checkbox",
  });
  const cn = c("block", className);

  let inputStyle = "form-checkbox text-primary-light h-4 w-4";
  if (thick) {
    inputStyle = inputStyle + "border-2 border-primary-light";
  }

  return (
    <label className={cn}>
      <div className="flex items-center">
        <input
          data-testid={name}
          type="checkbox"
          className={`${inputStyle} ${className}`}
          {...field}
          disabled={disabled} // <-- Apply here
        />
        <span className="ml-2 leading-none">{children || label}</span>
      </div>

      <span className="leading-tight text-danger ml-1 text-sm">
        {meta.touched && meta.error}
      </span>

      {/* <pre>{JSON.stringify(field, null, 2)}</pre> */}
    </label>
  );
};

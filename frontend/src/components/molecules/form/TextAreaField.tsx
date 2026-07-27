import React, { FC } from "react";

import { useField } from "formik";
import c from "classnames";
import { FormControl } from "./FormControl";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  hintAlwaysVisible?: boolean;
  resizeNone?: boolean;
  required?: boolean;
  className?: string;
}

export const TextAreaField: FC<Props> = ({
  name,
  label,
  placeholder,
  rows = 3,
  maxLength = 550,
  hintAlwaysVisible = false,
  resizeNone = false,
  required = false,
  className,
}) => {
  const [field, meta] = useField(name);
  const cTextArea = c("form-textarea mt-1 block w-full mb-3", {
    "resize-none": resizeNone,
    "border-danger-500": !!(meta.touched && meta.error),
  });

  const charCount = field.value?.length || 0;
  return (
    <FormControl
      tw={c("max-w-full xl:max-w-md", className)}
      name={name}
      label={label}
      hint={
        hintAlwaysVisible
          ? `${charCount} / ${maxLength}`
          : charCount > Math.floor(maxLength * 0.9)
          ? `${charCount} / ${maxLength}`
          : ""
      }
      required={required}
      error={meta.touched && meta.error}
    >
      <textarea
        className="h-40 border-[1px] border-solid w-full"
        placeholder={placeholder || label}
        {...field}
        {...{ name, rows }}
        maxLength={maxLength}
      />
    </FormControl>
  );
};

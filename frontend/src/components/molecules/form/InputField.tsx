import React, { FC } from "react";
import { useField } from "formik";
import c from "classnames";
import { FormControl } from "./FormControl";

interface Props {
  className?: string;
  name: string;
  label?: string;
  placeholder?: string;
  type?: "email" | "number" | "text" | "password";
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  maxLength?: number;
  endAdornment?: React.ReactNode;
  disabled?: boolean;
}

export const Input: FC<any> = ({ hasError, endAdornment, ...props }) => {
  const cInputField = c("form-input block w-full rounded", {
    "border-danger": !!hasError,
  });

  return (
    <div className="relative">
      <input className={cInputField} {...props} />
      {endAdornment && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {endAdornment}
        </div>
      )}
    </div>
  );
};

export const InputField: FC<Props> = ({
  className,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  maxLength = 80,
  min,
  max,
  step,
  endAdornment,
  disabled = false
}) => {
  const [field, meta] = useField(name);

  const cn = c("form-textarea mt-1 block w-full border-[1px] border-solid", {
    "border-danger": !!(meta.touched && meta.error),
  });

  const charCount = field.value?.length || 0;
  return (
    <FormControl
      tw={c("max-w-full xl:max-w-md mb-3", className)}
      name={name}
      label={label}
      required={required}
      hint={
        charCount > Math.floor(maxLength * 0.9)
          ? `${charCount} / ${maxLength}`
          : ``
      }
      error={meta.touched && meta.error}
    >
      <Input
        className={cn}
        data-testid={name}
        {...field}
        value={field.value === null || field.value === undefined ? "" : field.value}
        placeholder={placeholder || label}
        {...{ type, step, max, min, maxLength }}
        hasError={meta.touched && meta.error}
        endAdornment={endAdornment}
        disabled={disabled}
      />
    </FormControl>
  );
};
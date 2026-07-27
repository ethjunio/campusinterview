"use client";
import React, { FC, ReactElement } from "react";

import c from "classnames";

interface Props {
  name: string;
  label?: string;
  hint?: string | ReactElement;
  required?: boolean;
  error?: string | undefined | false;
  as?: "label" | "div";
  tw?: string;
  style?: any;
  children?: React.ReactNode;
}

export const FormControl: FC<Props> = ({
  as: Comp = "label",
  name,
  label,
  hint,
  required = false,
  error,
  children,
  tw,
  style,
}) => {
  const requiredLabel = required ? `${label}*` : label;
  return (
    <Comp htmlFor={name} className={c("block", tw)} style={style}>
      <div className="flex justify-between mb-1">
        {label && <div className="general-text">{requiredLabel}</div>}
        {hint && <div className="general-text-sm">{hint}</div>}
      </div>
      {children}
      <span
        data-testid={`${name}-error`}
        className="general-text-sm text-danger ml-1 mt-1"
      >
        {error}
      </span>
    </Comp>
  );
};

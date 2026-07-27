"use client";
import React, { FC, Children, cloneElement, ReactElement } from "react";
import Select from "react-select";
import { useField } from "formik";
import c from "classnames";
// import sortBy from 'lodash/sortBy';

import { FormControl } from "./FormControl";

type Option = {
  name: string;
  id: any;
  label: string;
  value: number | string;
};

interface Props {
  isClearable?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
  label?: string;
  name: string;
  options: Option[] | any;
  placeholder?: string;
  required?: boolean;
  shouldSort?: boolean;
  className?: string;
  handleChange?: Function;
  children?: React.ReactNode;
}

// export const SelectField: FC<Props> = ({
//   isClearable = true,
//   isMulti = false,
//   isSearchable = false,
//   label,
//   name,
//   options = [],
//   shouldSort = false,
//   className,
//   required,
//   placeholder,
//   handleChange,
// }) => {
//   const [field, meta, helpers] = useField(name);
//   const onChange = (selectedOption: any) => {
//     handleChange && handleChange(selectedOption);

//     helpers.setValue(selectedOption);
//   };

//   const normalizeValue = (val: any) => {
//     if (!val) return null; // If null or undefined, return null

//     if (typeof val === "object") {
//       if ("id" in val && "name" in val) {
//         return { value: val.id, label: val.name }; // Convert { id, name } to { value, label }
//       }
//       if ("value" in val && "label" in val) {
//         return val; // Already in the correct format
//       }
//     }

//     // If it's a single primitive value (id or value), find the matching label from options
//     const foundOption = options.find(
//       (opt) => opt.value === val || opt.id === val
//     );
//     if (foundOption) {
//       return {
//         value: foundOption.value || foundOption.id,
//         label: foundOption.label || foundOption.name,
//       };
//     }

//     return { value: val, label: String(val) }; // Fallback: Convert primitive value to a label
//   };

//   const onBlur = () => {
//     helpers.setTouched(true);
//   };

//   const cn = c("react-select-container", className, {
//     "react-select-container-error": !!(meta.touched && meta.error),
//   });

//   return (
//     <FormControl
//       tw="max-w-full xl:max-w-md mb-3"
//       name={name}
//       label={label}
//       required={required}
//       error={meta.touched && meta.error}
//     >
//       <Select
//         id={name.replace(".", "-")}
//         isMulti={isMulti}
//         isSearchable={isSearchable}
//         isClearable={isClearable}
//         className={cn}
//         classNamePrefix="react-select"
//         options={options}
//         name={name}
//         placeholder={placeholder}
//         data-testid={name}
//         onChange={onChange}
//         onBlur={onBlur}
//         value={normalizeValue(field.value)} // Ensure correct value is displayed
//       />
//     </FormControl>
//   );
// };

export const SelectField: FC<Props> = ({
  isClearable = true,
  isMulti = false,
  isSearchable = false,
  label,
  name,
  options = [],
  shouldSort = false,
  className,
  required,
  placeholder,
  handleChange,
}) => {
  const [field, meta, helpers] = useField(name);

  const onChange = (selectedOption: any) => {
    handleChange && handleChange(selectedOption);
    // Ensure Formik gets only { value, label }
    helpers.setValue(selectedOption);
  };

  const onBlur = () => {
    helpers.setTouched(true);
  };

  const cn = c("react-select-container", className, {
    "react-select-container-error": !!(meta.touched && meta.error),
  });

  return (
    <FormControl
      tw="max-w-full xl:max-w-md mb-3"
      name={name}
      label={label}
      required={required}
      error={meta.touched && meta.error}
    >
      <Select
        id={name.replace(".", "-")}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isClearable={isClearable}
        className={cn}
        classNamePrefix="react-select"
        options={options}
        name={name}
        placeholder={placeholder}
        data-testid={name}
        onChange={onChange}
        onBlur={onBlur}
        value={field.value} // Ensure it's always in { value, label } format
        getOptionLabel={(option) => option.label} // Ensures correct label rendering
        getOptionValue={(option) => String(option.value)} // Ensures correct value handling
      />
    </FormControl>
  );
};

type OtherProps = Props & {
  otherValue: number | string;
};

export const SelectFieldOther: FC<Props> = ({
  isClearable = true,
  isMulti = false,
  isSearchable = false,
  label,
  name,
  options = [],
  className,
  required,
  placeholder,
  children,
}) => {
  const [field, meta, helpers] = useField(name);
  const onChange = (value: any) => {
    helpers.setValue(value);
  };

  const onBlur = () => {
    helpers.setTouched(true);
  };

  const cn = c("react-select-container", className, {
    "react-select-container-error": !!(meta.touched && meta.error),
  });

  const childs = Children.map(children, (node) => {
    const child = node as ReactElement;
    if (name.includes(".")) {
      const [base] = name.split(".");
      return cloneElement(child, { name: `${base}.${child.props.name}` });
    }
    return child;
  });

  return (
    <>
      <FormControl
        tw="max-w-full xl:max-w-md mb-3"
        name={name.replace(".", "-")}
        label={label}
        required={required}
        error={meta.touched && meta.error}
      >
        <Select
          id={name.replace(".", "-")}
          isMulti={isMulti}
          isSearchable={isSearchable}
          isClearable={isClearable}
          className={cn}
          classNamePrefix="react-select"
          options={options}
          name={name}
          placeholder={placeholder}
          data-testid={name}
          onChange={onChange}
          onBlur={onBlur}
          value={field.value || null}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => String(option.value)}
        />
      </FormControl>
      {/* commented out due to extra required error is coming in education tab  */}
      {/* {meta.touched && meta.error && (
        <div className="text-red-500 text-sm">{meta.error}</div>
      )} */}
      {field.value?.label === "Other" && childs}
    </>
  );
};

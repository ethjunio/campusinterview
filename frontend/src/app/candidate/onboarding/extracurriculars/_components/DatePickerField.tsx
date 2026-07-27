import React, { FC, useState, useRef, useEffect } from "react";
import { useField } from "formik";
import { DayPicker } from "react-day-picker";
import { format, parse } from "date-fns";
import "react-day-picker/dist/style.css";

interface DatePickerFieldProps {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  nextDate?: boolean;
  prevDate?: boolean;
  today?: boolean;
  disabled?: boolean;
}

export const DatePickerField: FC<DatePickerFieldProps> = ({
  name,
  label,
  placeholder,
  required = false,
  nextDate = false,
  prevDate = false,
  today = false,
  disabled = false
}) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Handle date selection
  // const handleDaySelect = (date?: Date) => {
  //   setValue(date ? format(date, "yyyy-MM-dd") : "");
  //   setIsCalendarOpen(false);
  // };
  const handleDaySelect = (date?: Date) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`; // "yyyy-MM-dd"
      setValue(formattedDate);
    } else {
      setValue("");
    }
    setIsCalendarOpen(false);
  };

  // Handle click outside to close the calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Convert stored value (yyyy-MM-dd) to display format (dd-MM-yyyy)
  const parsedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : null;
  const displayDate =
    parsedDate && !isNaN(parsedDate.getTime())
      ? format(parsedDate, "dd-MM-yyyy")
      : "";

  // Determine disabled dates based on props
  // const getDisabledDates = () => {
  //   if (nextDate) {
  //     return { before: new Date() }; // Disable past dates (only future allowed)
  //   } else if (prevDate) {
  //     return { after: new Date() }; // Disable future dates (only past allowed)
  //   }
  //   return undefined; // No restrictions
  // };
  const getDisabledDates = () => {
    if (nextDate) {
      return {
        before: new Date(), // Disable past dates
        after: new Date(2027, 11, 31), // Disable dates after Dec 31, 2027
      };
    } else if (prevDate) {
      return { after: new Date() }; // Disable future dates (only past allowed)
    }
    return undefined; // No restrictions
  };

  return (
    <div className="flex flex-col relative w-auto flex-1">
      <label className="general-text font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={() => !disabled && setIsCalendarOpen(!isCalendarOpen)}
        className="cursor-pointer flex items-center pl-3 border border-black/40 rounded-[3px] p-2 relative"
      >
        {/* Calendar Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-6 h-6 text-primary-light fill-current absolute left-3"
        >
          <path d="M43.3 8.669h-9v-2.5a1.5 1.5 0 10-3 0v2.5h-15v-2.5a1.5 1.5 0 10-3 0v2.5h-10v26a9 9 0 009 9h23a9 9 0 009-9v-26h-1zm-8 32h-23a6 6 0 01-6-6v-15h35v15a6 6 0 01-6 6zm-19-26.5v-2.5h15v2.5a1.5 1.5 0 003 0v-2.5h7v5h-35v-5h7v2.5a1.5 1.5 0 103 0z"></path>
        </svg>

        {/* Input Field */}
        <input
          type="text"
          readOnly
          value={displayDate}
          placeholder={placeholder}
          // onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="cursor-pointer p-0 mr-2 ml-8 w-28 flex items-center text-dark border-0 nofocus"
          disabled={disabled}
        />

        {/* Clear Icon */}
        {value && !disabled && (
          <button
            type="button"
            className="absolute right-3 text-gray-500 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation(); // Prevents event from bubbling up
              setValue(null); // Clears the date
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Calendar */}
      {isCalendarOpen && (
        <div
          ref={calendarRef}
          className="datepicker absolute bg-white border rounded-lg shadow-lg mt-1 p-5 z-[11]"
        >
          <DayPicker
            selected={
              value ? parse(value, "yyyy-MM-dd", new Date()) : undefined
            }
            onSelect={handleDaySelect}
            mode="single"
            startMonth={new Date(1900, 0)}
            captionLayout="dropdown"
            disabled={getDisabledDates()}
            defaultMonth={
              displayDate
                ? parse(value, "yyyy-MM-dd", new Date())
                : today
                  ? new Date()
                  : new Date(2000, 0)
            }
            fromYear={1900}
            toYear={2027}
          />
        </div>
      )}

      {/* Error Message */}
      {meta.touched && meta.error && (
        <div className="general-text-sm text-danger ml-1 mt-1">
          {meta.error}
        </div>
      )}
    </div>
  );
};

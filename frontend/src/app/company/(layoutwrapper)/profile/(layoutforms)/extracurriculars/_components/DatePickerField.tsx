import React, { FC, useState, useRef, useEffect } from 'react';
import { useField } from 'formik';
import { DayPicker } from 'react-day-picker';
import { format, parse } from 'date-fns';
import 'react-day-picker/dist/style.css';

interface DatePickerFieldProps {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
}

export const DatePickerField: FC<DatePickerFieldProps> = ({
  name,
  label,
  placeholder,
  required = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Handle date selection
  const handleDaySelect = (date: Date | undefined) => {
    if (date) {
      setValue(format(date, 'yyyy-MM-dd'));
    } else {
      setValue('');
    }
    setIsCalendarOpen(false); // Close the calendar after selection
  };

  // Handle click outside the calendar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedDate = value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined;

  return (
    <div className="flex flex-col space-y-2 relative">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        readOnly
        value={value || ''}
        placeholder={placeholder}
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="border rounded-lg p-2 cursor-pointer"
      />
      {isCalendarOpen && (
        <div ref={calendarRef} className="absolute z-10 bg-white border rounded-lg shadow-lg mt-1">
          <DayPicker
            selected={selectedDate}
            onSelect={handleDaySelect}
            mode="single"
            fromYear={1900}
            toYear={new Date().getFullYear()}
            captionLayout="dropdown"
          />
        </div>
      )}
      {meta.touched && meta.error && (
        <div className="text-sm text-red-500">{meta.error}</div>
      )}
    </div>
  );
};
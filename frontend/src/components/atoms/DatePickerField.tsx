import React from "react";
import { DayPicker } from "react-day-picker"; // Ensure you have this package installed
import { format } from "date-fns"; // Ensure you have this package installed

interface DatePickerFieldProps {
  name: string;
  label: string;
  value: Date | null; // Accept null values
  onChange: (date: Date) => void;
}

export function DatePickerField({
  name,
  label,
  value,
  onChange,
}: DatePickerFieldProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        className="form-input block w-full rounded"
        value={value ? format(value, "yyyy-MM-dd") : "Choose"}
        onClick={() => setIsOpen(true)}
        readOnly
      />
      {isOpen && (
        <div className="absolute z-10 bg-white shadow-lg rounded-lg mt-1 border">
          <DayPicker
            mode="single"
            selected={value || undefined}
            onSelect={(date) => {
              if (date) {
                onChange(date);
                setIsOpen(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

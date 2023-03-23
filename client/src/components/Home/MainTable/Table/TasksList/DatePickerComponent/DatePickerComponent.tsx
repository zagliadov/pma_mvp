import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface DatePickerProps {
  onChange: (date: Date | null) => void;
}
export const DatePickerComponent: React.FC<DatePickerProps> = ({
  onChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const handleChange = (date: Date | null) => {
    setStartDate(date);
    onChange(date);
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      inline
      dateFormat="dd/MM/yyyy"
      className="border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-500"
    />
  );
};

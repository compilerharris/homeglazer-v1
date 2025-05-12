import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DateRange } from "react-day-picker"; // Import DateRange type
import { cn } from "@/lib/utils"; // Assuming `cn` is your utility for class names

// Type for the CalendarProps
export type CalendarProps = {
  className?: string; // Optional className prop for custom styles
};

// Default export for the Calendar component
const Calendar = ({ className }: CalendarProps) => {
  // Define the state for selectedDate ensuring it's DateRange or undefined
  const [selectedDate, setSelectedDate] = React.useState<DateRange | undefined>(undefined);

  // Handle selecting a date and setting it as a DateRange
  const handleDateSelect = (date: Date) => {
    // Set selectedDate to a DateRange, both 'from' and 'to' are the same
    setSelectedDate({
      from: date,
      to: date, // In this case, the selected date is both 'from' and 'to'
    });
  };

  // Handle month change (you can customize this as needed)
  const handleMonthChange = (date: Date) => {
    console.log("Month changed to: ", date);
  };

  return (
    <DayPicker
      selected={selectedDate} // Pass selectedDate which is of type DateRange or undefined
      onMonthChange={handleMonthChange} // Call this function when month changes
      onDayClick={handleDateSelect} // Call this function when a day is clicked
      showOutsideDays={true} // Show days from previous or next month in the calendar
      className={cn("p-3", className)} // Apply custom className if provided
      hideNavigation={false} // Ensure navigation is shown (if this is a valid option for your version)
    />
  );
};

export default Calendar; // Default export for the Calendar component

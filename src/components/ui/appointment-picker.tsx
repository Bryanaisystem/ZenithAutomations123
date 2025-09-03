"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AppointmentPickerProps {
  onDateTimeSelect: (date: Date, time: string) => void;
}

export function AppointmentPicker({ onDateTimeSelect }: AppointmentPickerProps) {
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [time, setTime] = useState<string | null>(null);

  // Generate time slots from 9:00 to 18:00 with 30-minute intervals
  const timeSlots = [
    { time: "09:00", available: true },
    { time: "09:30", available: true },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "11:30", available: true },
    { time: "12:00", available: false },
    { time: "12:30", available: false },
    { time: "13:00", available: true },
    { time: "13:30", available: true },
    { time: "14:00", available: true },
    { time: "14:30", available: false },
    { time: "15:00", available: true },
    { time: "15:30", available: true },
    { time: "16:00", available: true },
    { time: "16:30", available: true },
    { time: "17:00", available: true },
    { time: "17:30", available: true }
  ];

  const handleTimeSelect = (selectedTime: string) => {
    setTime(selectedTime);
    
    // Create a new date object with the selected date and time
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(hours, minutes, 0, 0);
    
    onDateTimeSelect(selectedDateTime, selectedTime);
  };

  return (
    <div className="w-full">
      <div className="rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-auto">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                if (newDate) {
                  setDate(newDate);
                  setTime(null);
                }
              }}
              className="p-2 bg-transparent text-white"
              disabled={[
                { before: today },
              ]}
              components={{
                Chevron: ({ orientation, ...props }) => {
                  return orientation === "left" ? (
                    <ChevronLeft className="h-4 w-4 text-white" {...props} />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-white" {...props} />
                  );
                },
              }}
              classNames={{
                months: "space-y-4",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium text-white text-center w-full",
                nav: "space-x-1 flex items-center absolute top-1 w-full justify-between",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-white/60 rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-white/5 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                day_selected: "bg-white text-black hover:bg-white hover:text-black focus:bg-white focus:text-black",
                day_today: "bg-white/10 text-white",
                day_outside: "text-white/30 opacity-50",
                day_disabled: "text-white/30 opacity-30",
                day_range_middle: "aria-selected:bg-white/5 aria-selected:text-white",
                day_hidden: "invisible",
                button_previous: "text-white/80 hover:text-white",
                button_next: "text-white/80 hover:text-white",
                weekday: "text-white/60",
              }}
            />
          </div>
          <div className="h-[180px] sm:h-auto sm:w-40 border-t sm:border-t-0 sm:border-l border-white/10">
            <ScrollArea className="h-full">
              <div className="p-3">
                <div className="mb-3 px-1">
                  <p className="text-sm font-medium text-white">{format(date, "EEEE, d MMMM")}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-1">
                  {timeSlots.map(({ time: timeSlot, available }) => (
                    <Button
                      key={timeSlot}
                      variant={time === timeSlot ? "default" : "outline"}
                      size="sm"
                      className={`w-full ${time === timeSlot ? 'bg-white text-black' : 'border-white/20 text-white hover:bg-white/10'}`}
                      onClick={() => handleTimeSelect(timeSlot)}
                      disabled={!available}
                    >
                      {timeSlot}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
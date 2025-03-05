"use client";
import { formatTime24to12 } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type TimePickerProps = {
  value: string;
  onChange: (time: string) => void;
  appointmentTimes?: string[];
  disabled?: boolean;
};

const TimePicker = ({ value, onChange, disabled, appointmentTimes }: TimePickerProps) => {
  const times = appointmentTimes?.map((i: string) => ({
    label: formatTime24to12(i),
    value: i,
  }));

  const [open, setOpen] = useState<boolean>(false);

  const timess = [
    { label: "09:00 AM", value: "09:00:00" },
    { label: "10:00 AM", value: "10:00:00" },
    { label: "11:00 AM", value: "11:00:00" },
    { label: "12:00 PM", value: "12:00:00" },
    { label: "01:00 PM", value: "13:00:00" },
    { label: "02:00 PM", value: "14:00:00" },
    { label: "03:00 PM", value: "15:00:00" },
    { label: "04:00 PM", value: "16:00:00" },
    { label: "05:00 PM", value: "17:00:00" },
    { label: "06:00 PM", value: "18:00:00" },
    { label: "07:00 PM", value: "19:00:00" },
    { label: "08:00 PM", value: "20:00:00" },
    { label: "09:00 PM", value: "21:00:00" },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={disabled} asChild>
        <Button variant="outline">{value || "Select Time"}</Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[200px] overflow-y-auto">
        <>
          {times && times.length > 0
            ? times.map((time) => (
                <div
                  key={time.value}
                  onClick={() => {
                    onChange(time.value);
                    setOpen(false);
                  }}
                  className={`cursor-pointer p-2 hover:bg-gray-200 ${time.value === value ? "bg-black text-white" : ""}`}
                >
                  {time.label}
                </div>
              ))
            : timess.map((time) => (
                <div
                  key={time.value}
                  onClick={() => {
                    onChange(time.value);
                    setOpen(false);
                  }}
                  className={`cursor-pointer p-2 hover:bg-gray-200 ${time.value === value ? "bg-black text-white" : ""}`}
                >
                  {time.label}
                </div>
              ))}
        </>
      </PopoverContent>
    </Popover>
  );
};

export default TimePicker;

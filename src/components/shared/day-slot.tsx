import { useState } from "react";
import { Separator } from "../ui/separator";
import { formatTime24to12 } from "@/lib/utils";

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DaySlotType {
  day: string;
  timeSlots: TimeSlot[];
}

interface Props {
  daySlots: DaySlotType[];
}

const DaySlot = ({ daySlots }: Props) => {
  console.log(daySlots);

  const [selected, setSelected] = useState<string | null>(null);
  console.log(selected);

  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  function renderDaySlot(day: string, selected?: boolean, available?: boolean) {
    return (
      <div
        onClick={() => {
          if (available) {
            setSelected(selected ? null : day);
          }
        }}
        className={`md:h-12 ${available && "cursor-pointer"} md:w-12 w-8 h-8 font-bold rounded-full flex justify-center items-center ${
          available
            ? selected
              ? "bg-primary text-white"
              : "text-primary border-primary border-4 bg-blue-100"
            : "text-gray-400 border-gray-300 border-4"
        } text-center`}
      >
        {day.charAt(0)}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full hidden md:block">
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex gap-2 justify-evenly">
            {days.map((day) =>
              renderDaySlot(
                day,
                selected === day,
                daySlots.some((d: DaySlotType) => d.day === day)
              )
            )}
          </div>
          {selected && (
            <div className="w-full">
              <Separator />
              <div className="w-full grid gap-3 grid-cols-1 md:grid-cols-3 py-3 px-3">
                {daySlots
                  .find((day: DaySlotType) => day.day === selected)
                  ?.timeSlots?.map((i: TimeSlot, index: number) => (
                    <div key={index} className="bg-gray-200 shadow-md rounded-lg px-3 py-2 font-semibold text-center">
                      {formatTime24to12(i.startTime)} - {formatTime24to12(i.endTime)}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-fit block md:hidden">
        <div className="w-full flex flex-col gap-3">
          <div className="w-full h-fit flex justify-evenly gap-2 px-3">
            {days.map((day) =>
              renderDaySlot(
                day,
                selected === day,
                daySlots.some((d: DaySlotType) => d.day === day)
              )
            )}
          </div>
          {selected && (
            <div className="w-full">
              <Separator />
              <div className="w-full grid gap-3 grid-cols-1 md:grid-cols-3 py-3 px-3">
                {daySlots
                  .find((day: DaySlotType) => day.day === selected)
                  ?.timeSlots?.map((i: TimeSlot, index: number) => (
                    <div key={index} className="bg-gray-200 shadow-md rounded-lg px-3 py-2 font-semibold text-center">
                      {formatTime24to12(i.startTime)} - {formatTime24to12(i.endTime)}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaySlot;

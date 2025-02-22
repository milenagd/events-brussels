"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerDemo() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const initialDate = searchParams.get("date")
    ? new Date(searchParams.get("date"))
    : new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  const handleDateChange = (date: Date) => {
    const params = new URLSearchParams(searchParams);
    params.set("date", date.toString());
    replace(`${pathname}?${params.toString()}`);
    setSelectedDate(date);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          initialFocus
          month={selectedDate}
          onMonthChange={setSelectedDate}
          disabled={(day: Date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return day < today;
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  fromYear?: number;
  toYear?: number;
}

export function DatePicker({
  date,
  onSelect,
  placeholder = 'Pick a date',
  className,
  fromYear = 1900,
  toYear = new Date().getFullYear(),
}: DatePickerProps) {
  // We use [color-scheme:dark] so native year dropdown select looks dark.
  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={cn(
            "flex items-center w-full h-12 px-4 rounded-md justify-start text-left font-normal bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-white cursor-pointer transition-colors",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span className="opacity-70">{placeholder}</span>}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto p-0 bg-[#081022]/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden [color-scheme:dark] [&_select]:bg-[#081022] [&_option]:bg-[#081022] [&_option]:text-white"
      >
        <Calendar
          mode="single"
          captionLayout="dropdown-years"
          selected={date}
          onSelect={onSelect}
          className="bg-transparent text-white"
          disabled={(date) => date > new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}

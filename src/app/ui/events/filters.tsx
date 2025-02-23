"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./datePicker";
import { EventType } from "@/app/services/fetchEvents";

export default function Filters(props: { data: EventType[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const toggleIsFree = searchParams.get("isFree");

  const handleFreeEventChange = () => {
    const params = new URLSearchParams(searchParams);
    if (toggleIsFree == "true") {
      params.set("isFree", "false");
    } else {
      params.set("isFree", "true");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  const handleCategoryChange = (item: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", item);
    replace(`${pathname}?${params.toString()}`);
  };

  const categoryFiltered = new Set(props.data.map((i) => i.category));
  const categoryValue =
    searchParams.get("category") === null ? "" : searchParams.get("category");
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-lg font-semibold mb-4">When</p>
        <DatePicker />
      </div>
      <div>
        <p className="text-lg font-semibold mb-4">Category</p>
        <Select onValueChange={handleCategoryChange} value={categoryValue}>
          <SelectTrigger className="w-[180px]">
            <SelectValue value="" placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {[...categoryFiltered].map((item) => (
              <SelectItem value={item} key={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="text-lg font-semibold mb-4">Budget</p>
        <div className="flex items-center space-x-2">
          <Switch
            id="is-free"
            onCheckedChange={handleFreeEventChange}
            checked={toggleIsFree == "true"}
          />
          <Label htmlFor="is-free">Free events</Label>
        </div>
      </div>
    </div>
  );
}

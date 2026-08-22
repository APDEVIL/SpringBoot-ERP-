"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BRANCHES } from "@/lib/branches";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function BranchCombobox({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = BRANCHES.filter((b) =>
    b.toLowerCase().includes(search.toLowerCase())
  );

  const exactMatch = BRANCHES.some(
    (b) => b.toLowerCase() === search.toLowerCase()
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
            "w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm font-normal",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
     )}
>
     <span className={value ? "" : "text-muted-foreground"}>
         {value || "Select or type a branch..."}
    </span>
        <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
    </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput
            placeholder="Search or type new branch..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              {search.trim() ? (
                <button
                  type="button"
                  onClick={() => {
                    onChange(search.trim());
                    setOpen(false);
                    setSearch("");
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add &quot;{search.trim()}&quot;
                </button>
              ) : (
                "No branch found."
              )}
            </CommandEmpty>
            <CommandGroup>
              {filtered.map((branch) => (
                <CommandItem
                  key={branch}
                  value={branch}
                  onSelect={() => {
                    onChange(branch);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === branch ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {branch}
                </CommandItem>
              ))}
              {!exactMatch && search.trim() && (
                <CommandItem
                  value={search}
                  onSelect={() => {
                    onChange(search.trim());
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add &quot;{search.trim()}&quot;
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown, Plus, CalendarDays } from "lucide-react";

type Props = {
  onAddClick: () => void;
};

export function Topbar({ onAddClick }: Props) {
  const today = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Hey Learners , Welcome to Spring Boot</h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with your students today.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 border rounded-lg px-3 py-1.5 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          {today}
        </div>

        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <Button onClick={onAddClick}>
          <Plus className="h-4 w-4 mr-1" />
          Add Student
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
            <Avatar className="h-8 w-8">
                <AvatarFallback>CH</AvatarFallback>
                    </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
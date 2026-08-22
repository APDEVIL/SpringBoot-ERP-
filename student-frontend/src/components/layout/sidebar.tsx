"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, GraduationCap, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const mainMenu = [
  { label: "Overview", icon: LayoutDashboard, href: "/" },
  { label: "Students", icon: GraduationCap, href: "/students" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r bg-background hidden md:flex flex-col p-4 h-screen sticky top-0">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
          S
        </div>
        <span className="font-semibold text-lg">StudentERP</span>
      </div>

      <div className="mb-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Main Menu
      </div>
      <nav className="flex flex-col gap-1">
        {mainMenu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="rounded-xl bg-accent p-4 text-center">
          <Plus className="h-5 w-5 mx-auto mb-2 text-accent-foreground" />
          <p className="text-xs text-accent-foreground/80 mb-2">
            Need help managing students?
          </p>
          <button className="text-xs font-medium text-primary">
            View docs
          </button>
        </div>
      </div>
    </aside>
  );
}
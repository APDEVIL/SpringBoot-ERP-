"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Teacher } from "@/lib/api";
import { Pencil, Trash2, Search } from "lucide-react";

type Props = {
  teachers: Teacher[];
  onEdit: (teacher: Teacher) => void;
  onDelete: (id: number) => void;
};

export function TeacherTable({ teachers, onEdit, onDelete }: Props) {
  const [search, setSearch] = useState("");

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">All Teachers</h2>
        <div className="relative w-64">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search teachers..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          {teachers.length === 0
            ? 'No teachers yet. Click "Add Teacher" to get started.'
            : "No teachers match your search."}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="flex items-center gap-3 py-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {teacher.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{teacher.name}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {teacher.email}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{teacher.department}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(teacher)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(teacher.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
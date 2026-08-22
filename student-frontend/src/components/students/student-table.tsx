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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Student } from "@/lib/api";
import { Pencil, Trash2, Search } from "lucide-react";

type Props = {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
};

export function StudentTable({ students, onEdit, onDelete }: Props) {
  const [search, setSearch] = useState("");

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.branch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">All Students</h2>
        <div className="relative w-64">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          {students.length === 0
            ? 'No students yet. Click "Add Student" to get started.'
            : "No students match your search."}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox />
              </TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="flex items-center gap-3 py-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {student.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{student.name}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{student.branch}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(student)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(student.id)}
                  >
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
"use client";

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
import { Card } from "@/components/ui/card";
import { Allocation, Teacher, Subject } from "@/lib/api";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  allocations: Allocation[];
  teachers: Teacher[];
  subjects: Subject[];
  onEdit: (allocation: Allocation) => void;
  onDelete: (id: number) => void;
};

export function AllocationTable({
  allocations,
  teachers,
  subjects,
  onEdit,
  onDelete,
}: Props) {
  const teacherName = (id: number) =>
    teachers.find((t) => t.id === id)?.name ?? `#${id}`;
  const subjectName = (id: number) =>
    subjects.find((s) => s.id === id)?.name ?? `#${id}`;

  return (
    <Card className="rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">All Allocations</h2>
      </div>

      {allocations.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No allocations yet. Click &quot;Add Allocation&quot; to get started.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allocations.map((allocation) => (
              <TableRow key={allocation.id}>
                <TableCell className="font-medium py-3">
                  {teacherName(allocation.teacherId)}
                </TableCell>
                <TableCell>{subjectName(allocation.subjectId)}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{allocation.branch}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(allocation)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(allocation.id)}>
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
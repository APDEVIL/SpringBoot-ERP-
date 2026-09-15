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
import { Marks, Student, Test } from "@/lib/api";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  marksList: Marks[];
  students: Student[];
  tests: Test[];
  onEdit: (mark: Marks) => void;
  onDelete: (id: number) => void;
};

export function MarksTable({ marksList, students, tests, onEdit, onDelete }: Props) {
  const studentName = (id: number) =>
    students.find((s) => s.id === id)?.name ?? `#${id}`;
  const testInfo = (id: number) => tests.find((t) => t.id === id);

  return (
    <Card className="rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">All Marks</h2>
      </div>

      {marksList.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No marks recorded yet. Click &quot;Assign Marks&quot; to get started.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Test</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marksList.map((mark) => {
              const test = testInfo(mark.testId);
              return (
                <TableRow key={mark.id}>
                  <TableCell className="font-medium py-3">
                    {studentName(mark.studentId)}
                  </TableCell>
                  <TableCell>{test?.testName ?? `#${mark.testId}`}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {mark.marksObtained}
                      {test ? ` / ${test.maxMarks}` : ""}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(mark)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(mark.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
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
import { Test, Subject } from "@/lib/api";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  tests: Test[];
  subjects: Subject[];
  onEdit: (test: Test) => void;
  onDelete: (id: number) => void;
};

export function TestTable({ tests, subjects, onEdit, onDelete }: Props) {
  const subjectName = (id: number) =>
    subjects.find((s) => s.id === id)?.name ?? `#${id}`;

  return (
    <Card className="rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">All Tests</h2>
      </div>

      {tests.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No tests yet. Click &quot;Add Test&quot; to get started.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Max Marks</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.map((test) => (
              <TableRow key={test.id}>
                <TableCell className="font-medium py-3">{test.testName}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{subjectName(test.subjectId)}</Badge>
                </TableCell>
                <TableCell>{test.maxMarks}</TableCell>
                <TableCell className="text-muted-foreground">{test.testDate}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(test)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(test.id)}>
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
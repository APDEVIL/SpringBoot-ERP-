"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Marks, MarksInput, Student, Test } from "@/lib/api";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingMark: Marks | null;
  students: Student[];
  tests: Test[];
  onSubmit: (data: MarksInput) => Promise<void>;
};

export function MarksFormDialog({
  open,
  onOpenChange,
  editingMark,
  students,
  tests,
  onSubmit,
}: Props) {
  const [studentId, setStudentId] = useState("");
  const [testId, setTestId] = useState("");
  const [marksObtained, setMarksObtained] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedTest = tests.find((t) => String(t.id) === testId);

  useEffect(() => {
    if (editingMark) {
      setStudentId(String(editingMark.studentId));
      setTestId(String(editingMark.testId));
      setMarksObtained(String(editingMark.marksObtained));
    } else {
      setStudentId("");
      setTestId("");
      setMarksObtained("");
    }
  }, [editingMark, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !testId) return;
    setSubmitting(true);
    try {
      await onSubmit({
        studentId: Number(studentId),
        testId: Number(testId),
        marksObtained: Number(marksObtained),
      });
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingMark ? "Edit Marks" : "Assign Marks"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Student</Label>
            <Select
              value={studentId}
              onValueChange={(value) => setStudentId(value ?? "")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((s) => (
                  <SelectItem key={s.id} value={String(s.id)}>
                    {s.name} ({s.branch})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Test</Label>
            <Select
              value={testId}
              onValueChange={(value) => setTestId(value ?? "")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a test" />
              </SelectTrigger>
              <SelectContent>
                {tests.map((t) => (
                  <SelectItem key={t.id} value={String(t.id)}>
                    {t.testName} (Max {t.maxMarks})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="marksObtained">
              Marks Obtained {selectedTest ? `(out of ${selectedTest.maxMarks})` : ""}
            </Label>
            <Input
              id="marksObtained"
              type="number"
              min={0}
              max={selectedTest?.maxMarks}
              value={marksObtained}
              onChange={(e) => setMarksObtained(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting || !studentId || !testId}
            >
              {submitting ? "Saving..." : editingMark ? "Update" : "Assign Marks"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
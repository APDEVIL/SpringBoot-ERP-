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
import { Test, TestInput, Subject } from "@/lib/api";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingTest: Test | null;
  subjects: Subject[];
  onSubmit: (data: TestInput) => Promise<void>;
};

export function TestFormDialog({
  open,
  onOpenChange,
  editingTest,
  subjects,
  onSubmit,
}: Props) {
  const [testName, setTestName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [testDate, setTestDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingTest) {
      setTestName(editingTest.testName);
      setSubjectId(String(editingTest.subjectId));
      setMaxMarks(String(editingTest.maxMarks));
      setTestDate(editingTest.testDate);
    } else {
      setTestName("");
      setSubjectId("");
      setMaxMarks("");
      setTestDate("");
    }
  }, [editingTest, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectId || !testDate) return;
    setSubmitting(true);
    try {
      await onSubmit({
        testName,
        subjectId: Number(subjectId),
        maxMarks: Number(maxMarks),
        testDate,
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
          <DialogTitle>{editingTest ? "Edit Test" : "Add Test"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="testName">Test Name</Label>
            <Input
              id="testName"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="e.g. Midterm 1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Subject</Label>
            <Select
              value={subjectId}
              onValueChange={(value) => setSubjectId(value ?? "")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={String(s.id)}>
                    {s.name} ({s.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxMarks">Max Marks</Label>
            <Input
              id="maxMarks"
              type="number"
              value={maxMarks}
              onChange={(e) => setMaxMarks(e.target.value)}
              placeholder="e.g. 50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="testDate">Test Date</Label>
            <Input
              id="testDate"
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
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
              disabled={submitting || !subjectId || !testDate}
            >
              {submitting ? "Saving..." : editingTest ? "Update" : "Add Test"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
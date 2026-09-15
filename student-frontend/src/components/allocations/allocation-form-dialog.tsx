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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BranchCombobox } from "@/components/students/branch-combobox";
import { Allocation, AllocationInput, Teacher, Subject } from "@/lib/api";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingAllocation: Allocation | null;
  teachers: Teacher[];
  subjects: Subject[];
  onSubmit: (data: AllocationInput) => Promise<void>;
};

export function AllocationFormDialog({
  open,
  onOpenChange,
  editingAllocation,
  teachers,
  subjects,
  onSubmit,
}: Props) {
  const [teacherId, setTeacherId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [branch, setBranch] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingAllocation) {
      setTeacherId(String(editingAllocation.teacherId));
      setSubjectId(String(editingAllocation.subjectId));
      setBranch(editingAllocation.branch);
    } else {
      setTeacherId("");
      setSubjectId("");
      setBranch("");
    }
  }, [editingAllocation, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherId || !subjectId || !branch) return;
    setSubmitting(true);
    try {
      await onSubmit({
        teacherId: Number(teacherId),
        subjectId: Number(subjectId),
        branch,
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
            {editingAllocation ? "Edit Allocation" : "Add Allocation"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Teacher</Label>
            <Select
              value={teacherId}
              onValueChange={(value) => setTeacherId(value ?? "")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((t) => (
                  <SelectItem key={t.id} value={String(t.id)}>
                    {t.name} — {t.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Label>Branch</Label>
            <BranchCombobox value={branch} onChange={setBranch} />
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
              disabled={submitting || !teacherId || !subjectId || !branch}
            >
              {submitting
                ? "Saving..."
                : editingAllocation
                ? "Update"
                : "Add Allocation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
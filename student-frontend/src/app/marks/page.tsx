"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MarksTable } from "@/components/marks/marks-table";
import { MarksFormDialog } from "@/components/marks/marks-form-dialog";
import {
  Marks,
  MarksInput,
  Student,
  Test,
  getMarksList,
  addMarks,
  updateMarks,
  deleteMarks,
  getStudents,
  getTests,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function MarksPage() {
  const [marksList, setMarksList] = useState<Marks[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMark, setEditingMark] = useState<Marks | null>(null);

  const loadAll = async () => {
    try {
      const [m, s, t] = await Promise.all([
        getMarksList(),
        getStudents(),
        getTests(),
      ]);
      setMarksList(m);
      setStudents(s);
      setTests(t);
    } catch {
      toast.error("Could not connect to backend. Is Spring Boot running on :8080?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleAddClick = () => {
    setEditingMark(null);
    setDialogOpen(true);
  };

  const handleEditClick = (mark: Marks) => {
    setEditingMark(mark);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: MarksInput) => {
    try {
      if (editingMark) {
        await updateMarks(editingMark.id, data);
        toast.success("Marks updated");
      } else {
        await addMarks(data);
        toast.success("Marks assigned");
      }
      await loadAll();
    } catch {
      toast.error("Something went wrong. Check the backend.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMarks(id);
      toast.success("Marks deleted");
      await loadAll();
    } catch {
      toast.error("Failed to delete marks");
    }
  };

  const noPrereqs = !loading && (students.length === 0 || tests.length === 0);

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-6">
        <Topbar onAddClick={handleAddClick} />

        <div className="flex items-center justify-between mb-3">
          <h1 className="font-semibold text-lg">All Marks</h1>
          <Button onClick={handleAddClick} disabled={noPrereqs}>
            <Plus className="h-4 w-4 mr-1" />
            Assign Marks
          </Button>
        </div>

        {noPrereqs && (
          <div className="mb-4 text-sm text-muted-foreground bg-accent rounded-lg p-3">
            Add at least one Student and one Test before assigning marks.
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading marks...
          </div>
        ) : (
          <MarksTable
            marksList={marksList}
            students={students}
            tests={tests}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}
      </main>

      <MarksFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingMark={editingMark}
        students={students}
        tests={tests}
        onSubmit={handleSubmit}
      />
    </>
  );
}
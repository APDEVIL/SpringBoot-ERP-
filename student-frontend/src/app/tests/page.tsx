"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { TestTable } from "@/components/tests/test-table";
import { TestFormDialog } from "@/components/tests/test-form-dialog";
import {
  Test,
  TestInput,
  Subject,
  getTests,
  addTest,
  updateTest,
  deleteTest,
  getSubjects,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);

  const loadAll = async () => {
    try {
      const [t, s] = await Promise.all([getTests(), getSubjects()]);
      setTests(t);
      setSubjects(s);
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
    setEditingTest(null);
    setDialogOpen(true);
  };

  const handleEditClick = (test: Test) => {
    setEditingTest(test);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: TestInput) => {
    try {
      if (editingTest) {
        await updateTest(editingTest.id, data);
        toast.success("Test updated");
      } else {
        await addTest(data);
        toast.success("Test added");
      }
      await loadAll();
    } catch {
      toast.error("Something went wrong. Check the backend.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTest(id);
      toast.success("Test deleted");
      await loadAll();
    } catch {
      toast.error("Failed to delete test");
    }
  };

  const noPrereqs = !loading && subjects.length === 0;

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-6">
        <Topbar onAddClick={handleAddClick} />

        <div className="flex items-center justify-between mb-3">
          <h1 className="font-semibold text-lg">All Tests</h1>
          <Button onClick={handleAddClick} disabled={noPrereqs}>
            <Plus className="h-4 w-4 mr-1" />
            Add Test
          </Button>
        </div>

        {noPrereqs && (
          <div className="mb-4 text-sm text-muted-foreground bg-accent rounded-lg p-3">
            Add at least one Subject before creating tests.
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading tests...
          </div>
        ) : (
          <TestTable
            tests={tests}
            subjects={subjects}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}
      </main>

      <TestFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingTest={editingTest}
        subjects={subjects}
        onSubmit={handleSubmit}
      />
    </>
  );
}
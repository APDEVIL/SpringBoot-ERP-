"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { SubjectTable } from "@/components/subjects/subject-table";
import { SubjectFormDialog } from "@/components/subjects/subject-form-dialog";
import {
  Subject,
  SubjectInput,
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const loadSubjects = async () => {
    try {
      setSubjects(await getSubjects());
    } catch {
      toast.error("Could not connect to backend. Is Spring Boot running on :8080?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const handleAddClick = () => {
    setEditingSubject(null);
    setDialogOpen(true);
  };

  const handleEditClick = (subject: Subject) => {
    setEditingSubject(subject);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: SubjectInput) => {
    try {
      if (editingSubject) {
        await updateSubject(editingSubject.id, data);
        toast.success("Subject updated");
      } else {
        await addSubject(data);
        toast.success("Subject added");
      }
      await loadSubjects();
    } catch {
      toast.error("Something went wrong. Check the backend.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSubject(id);
      toast.success("Subject deleted");
      await loadSubjects();
    } catch {
      toast.error("Failed to delete subject");
    }
  };

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-6">
        <Topbar onAddClick={handleAddClick} />

        <div className="flex items-center justify-between mb-3">
          <h1 className="font-semibold text-lg">All Subjects</h1>
          <Button onClick={handleAddClick}>
            <Plus className="h-4 w-4 mr-1" />
            Add Subject
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading subjects...
          </div>
        ) : (
          <SubjectTable
            subjects={subjects}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}
      </main>

      <SubjectFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingSubject={editingSubject}
        onSubmit={handleSubmit}
      />
    </>
  );
}
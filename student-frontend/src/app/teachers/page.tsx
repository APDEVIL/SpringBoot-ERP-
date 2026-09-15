"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { TeacherTable } from "@/components/teachers/teacher-table";
import { TeacherFormDialog } from "@/components/teachers/teacher-form-dialog";
import {
  Teacher,
  TeacherInput,
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const loadTeachers = async () => {
    try {
      setTeachers(await getTeachers());
    } catch {
      toast.error("Could not connect to backend. Is Spring Boot running on :8080?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const handleAddClick = () => {
    setEditingTeacher(null);
    setDialogOpen(true);
  };

  const handleEditClick = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: TeacherInput) => {
    try {
      if (editingTeacher) {
        await updateTeacher(editingTeacher.id, data);
        toast.success("Teacher updated");
      } else {
        await addTeacher(data);
        toast.success("Teacher added");
      }
      await loadTeachers();
    } catch {
      toast.error("Something went wrong. Check the backend.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTeacher(id);
      toast.success("Teacher deleted");
      await loadTeachers();
    } catch {
      toast.error("Failed to delete teacher");
    }
  };

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-6">
        <Topbar onAddClick={handleAddClick} />

        <div className="flex items-center justify-between mb-3">
          <h1 className="font-semibold text-lg">All Teachers</h1>
          <Button onClick={handleAddClick}>
            <Plus className="h-4 w-4 mr-1" />
            Add Teacher
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading teachers...
          </div>
        ) : (
          <TeacherTable
            teachers={teachers}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}
      </main>

      <TeacherFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingTeacher={editingTeacher}
        onSubmit={handleSubmit}
      />
    </>
  );
}
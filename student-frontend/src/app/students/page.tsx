"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { StudentTable } from "@/components/students/student-table";
import { StudentFormDialog } from "@/components/students/student-form-dialog";
import {
  Student,
  StudentInput,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "@/lib/api";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const loadStudents = async () => {
    try {
      setStudents(await getStudents());
    } catch {
      toast.error("Could not connect to backend. Is Spring Boot running on :8080?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAddClick = () => {
    setEditingStudent(null);
    setDialogOpen(true);
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: StudentInput) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, data);
        toast.success("Student updated");
      } else {
        await addStudent(data);
        toast.success("Student added");
      }
      await loadStudents();
    } catch {
      toast.error("Something went wrong. Check the backend.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      toast.success("Student deleted");
      await loadStudents();
    } catch {
      toast.error("Failed to delete student");
    }
  };

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-6">
        <Topbar onAddClick={handleAddClick} />

        <h1 className="font-semibold text-lg mb-3">All Students</h1>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading students...
          </div>
        ) : (
          <StudentTable
            students={students}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}
      </main>

      <StudentFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingStudent={editingStudent}
        onSubmit={handleSubmit}
      />
    </>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { StatsCards } from "@/components/students/stats-cards";
import { StudentsChart } from "@/components/students/students-chart";
import { StudentTable } from "@/components/students/student-table";
import { StudentFormDialog } from "@/components/students/student-form-dialog";
import { Button } from "@/components/ui/button";
import {
  Student,
  StudentInput,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "@/lib/api";

export default function Home() {
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
        <StatsCards students={students} />
        <StudentsChart students={students} />

        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-lg">Recent Students</h2>
          <Link href="/students">
            <Button variant="outline" size="sm">
              View all
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading students...
          </div>
        ) : (
          <StudentTable
            students={students.slice(0, 5)}
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
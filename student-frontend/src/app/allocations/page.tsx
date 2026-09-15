"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { AllocationTable } from "@/components/allocations/allocation-table";
import { AllocationFormDialog } from "@/components/allocations/allocation-form-dialog";
import {
  Allocation,
  AllocationInput,
  Teacher,
  Subject,
  getAllocations,
  addAllocation,
  updateAllocation,
  deleteAllocation,
  getTeachers,
  getSubjects,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AllocationsPage() {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAllocation, setEditingAllocation] = useState<Allocation | null>(null);

  const loadAll = async () => {
    try {
      const [a, t, s] = await Promise.all([
        getAllocations(),
        getTeachers(),
        getSubjects(),
      ]);
      setAllocations(a);
      setTeachers(t);
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
    setEditingAllocation(null);
    setDialogOpen(true);
  };

  const handleEditClick = (allocation: Allocation) => {
    setEditingAllocation(allocation);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: AllocationInput) => {
    try {
      if (editingAllocation) {
        await updateAllocation(editingAllocation.id, data);
        toast.success("Allocation updated");
      } else {
        await addAllocation(data);
        toast.success("Allocation added");
      }
      await loadAll();
    } catch {
      toast.error("Something went wrong. Check the backend.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAllocation(id);
      toast.success("Allocation deleted");
      await loadAll();
    } catch {
      toast.error("Failed to delete allocation");
    }
  };

  const noPrereqs = !loading && (teachers.length === 0 || subjects.length === 0);

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-6">
        <Topbar onAddClick={handleAddClick} />

        <div className="flex items-center justify-between mb-3">
          <h1 className="font-semibold text-lg">All Allocations</h1>
          <Button onClick={handleAddClick} disabled={noPrereqs}>
            <Plus className="h-4 w-4 mr-1" />
            Add Allocation
          </Button>
        </div>

        {noPrereqs && (
          <div className="mb-4 text-sm text-muted-foreground bg-accent rounded-lg p-3">
            Add at least one Teacher and one Subject before creating allocations.
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading allocations...
          </div>
        ) : (
          <AllocationTable
            allocations={allocations}
            teachers={teachers}
            subjects={subjects}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}
      </main>

      <AllocationFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingAllocation={editingAllocation}
        teachers={teachers}
        subjects={subjects}
        onSubmit={handleSubmit}
      />
    </>
  );
}
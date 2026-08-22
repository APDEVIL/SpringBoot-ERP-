const BASE_URL = "http://localhost:8080/students";

export type Student = {
  id: number;
  name: string;
  branch: string;
};

export type StudentInput = Omit<Student, "id">;

export async function getStudents(): Promise<Student[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
}

export async function getStudent(id: number): Promise<Student> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch student");
  return res.json();
}

export async function addStudent(student: StudentInput): Promise<Student> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  if (!res.ok) throw new Error("Failed to add student");
  return res.json();
}

export async function updateStudent(
  id: number,
  student: StudentInput
): Promise<Student> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  if (!res.ok) throw new Error("Failed to update student");
  return res.json();
}

export async function deleteStudent(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete student");
}
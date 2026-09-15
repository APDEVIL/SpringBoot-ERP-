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

// ─── Teachers ───────────────────────────────
export type Teacher = {
  id: number;
  name: string;
  email: string;
  department: string;
};
export type TeacherInput = Omit<Teacher, "id">;

const TEACHERS_URL = "http://localhost:8080/teachers";

export async function getTeachers(): Promise<Teacher[]> {
  const res = await fetch(TEACHERS_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch teachers");
  return res.json();
}

export async function addTeacher(teacher: TeacherInput): Promise<Teacher> {
  const res = await fetch(TEACHERS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teacher),
  });
  if (!res.ok) throw new Error("Failed to add teacher");
  return res.json();
}

export async function updateTeacher(id: number, teacher: TeacherInput): Promise<Teacher> {
  const res = await fetch(`${TEACHERS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teacher),
  });
  if (!res.ok) throw new Error("Failed to update teacher");
  return res.json();
}

export async function deleteTeacher(id: number): Promise<void> {
  const res = await fetch(`${TEACHERS_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete teacher");
}

// ─── Subjects ───────────────────────────────
export type Subject = {
  id: number;
  name: string;
  code: string;
  branch: string;
};
export type SubjectInput = Omit<Subject, "id">;

const SUBJECTS_URL = "http://localhost:8080/subjects";

export async function getSubjects(): Promise<Subject[]> {
  const res = await fetch(SUBJECTS_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch subjects");
  return res.json();
}

export async function addSubject(subject: SubjectInput): Promise<Subject> {
  const res = await fetch(SUBJECTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subject),
  });
  if (!res.ok) throw new Error("Failed to add subject");
  return res.json();
}

export async function updateSubject(id: number, subject: SubjectInput): Promise<Subject> {
  const res = await fetch(`${SUBJECTS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subject),
  });
  if (!res.ok) throw new Error("Failed to update subject");
  return res.json();
}

export async function deleteSubject(id: number): Promise<void> {
  const res = await fetch(`${SUBJECTS_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete subject");
}

// ─── Allocations ────────────────────────────
export type Allocation = {
  id: number;
  teacherId: number;
  subjectId: number;
  branch: string;
};
export type AllocationInput = Omit<Allocation, "id">;

const ALLOCATIONS_URL = "http://localhost:8080/allocations";

export async function getAllocations(): Promise<Allocation[]> {
  const res = await fetch(ALLOCATIONS_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch allocations");
  return res.json();
}

export async function addAllocation(allocation: AllocationInput): Promise<Allocation> {
  const res = await fetch(ALLOCATIONS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(allocation),
  });
  if (!res.ok) throw new Error("Failed to add allocation");
  return res.json();
}

export async function updateAllocation(id: number, allocation: AllocationInput): Promise<Allocation> {
  const res = await fetch(`${ALLOCATIONS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(allocation),
  });
  if (!res.ok) throw new Error("Failed to update allocation");
  return res.json();
}

export async function deleteAllocation(id: number): Promise<void> {
  const res = await fetch(`${ALLOCATIONS_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete allocation");
}

// ─── Tests ──────────────────────────────────
export type Test = {
  id: number;
  testName: string;
  subjectId: number;
  maxMarks: number;
  testDate: string; // "YYYY-MM-DD"
};
export type TestInput = Omit<Test, "id">;

const TESTS_URL = "http://localhost:8080/tests";

export async function getTests(): Promise<Test[]> {
  const res = await fetch(TESTS_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tests");
  return res.json();
}

export async function addTest(test: TestInput): Promise<Test> {
  const res = await fetch(TESTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(test),
  });
  if (!res.ok) throw new Error("Failed to add test");
  return res.json();
}

export async function updateTest(id: number, test: TestInput): Promise<Test> {
  const res = await fetch(`${TESTS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(test),
  });
  if (!res.ok) throw new Error("Failed to update test");
  return res.json();
}

export async function deleteTest(id: number): Promise<void> {
  const res = await fetch(`${TESTS_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete test");
}

// ─── Marks ──────────────────────────────────
export type Marks = {
  id: number;
  studentId: number;
  testId: number;
  marksObtained: number;
};
export type MarksInput = Omit<Marks, "id">;

const MARKS_URL = "http://localhost:8080/marks";

export async function getMarksList(): Promise<Marks[]> {
  const res = await fetch(MARKS_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch marks");
  return res.json();
}

export async function addMarks(mark: MarksInput): Promise<Marks> {
  const res = await fetch(MARKS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mark),
  });
  if (!res.ok) throw new Error("Failed to add marks");
  return res.json();
}

export async function updateMarks(id: number, mark: MarksInput): Promise<Marks> {
  const res = await fetch(`${MARKS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mark),
  });
  if (!res.ok) throw new Error("Failed to update marks");
  return res.json();
}

export async function deleteMarks(id: number): Promise<void> {
  const res = await fetch(`${MARKS_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete marks");
}
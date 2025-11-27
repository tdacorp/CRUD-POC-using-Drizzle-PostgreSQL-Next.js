"use client";
import StudentForm from "@/app/components/studentForm";

export default function NewStudentPage() {
  const handleSubmit = async (data: { name: string; email: string; courseIds: number[] }) => {
    try {
      console.log(data);
      const res = await fetch("/api/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        console.error("Error:", result);
        alert("Failed to create student");
        return;
      }

      console.log("STUDENT CREATED:", result);
      alert("Student created successfully!");
    } catch (err) {
      console.error("FETCH ERROR:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Add New Student</h1>
      <StudentForm onSubmit={handleSubmit} />
    </div>
  );
}

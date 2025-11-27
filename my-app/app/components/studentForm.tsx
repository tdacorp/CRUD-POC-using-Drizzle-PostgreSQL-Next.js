"use client";
import { useState, useEffect, FormEvent } from "react";

interface Course {
  id: number;
  title: string;
}

interface StudentFormProps {
  onSubmit: (data: { name: string; email: string; courseIds: number[] }) => void;
}

export default function StudentForm({ onSubmit }: StudentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courseIds, setCourseIds] = useState<number[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function loadCourses() {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data);
    }
    loadCourses();
  }, []);

  const toggleCourse = (id: number) => {
    setCourseIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, courseIds });
    console.log({name, email, courseIds})
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border p-3 rounded">
      <div>
        <label>Name</label>
        <input
          className="border p-1 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Email</label>
        <input
          className="border p-1 w-full"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="font-semibold block mb-1">Select Courses</label>
        {courses.length === 0 && <p>Loading courses...</p>}
        {courses.map((course) => (
          <div key={course.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={courseIds.includes(course.id)}
              onChange={() => toggleCourse(course.id)}
            />
            <span>{course.title}</span>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Save
      </button>
    </form>
  );
}

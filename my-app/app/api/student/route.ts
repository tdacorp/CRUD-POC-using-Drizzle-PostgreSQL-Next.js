import { NextResponse } from "next/server";
import { db } from "@/db";
import { students } from "@/db/schema/students";
import { studentCourses } from "@/db/schema/studentcourses";
import { z } from "zod";

// Zod schema for validation
export const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  courseIds: z.array(z.number()).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("BODY RECEIVED:", body);

    const parsed = studentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.format() }, { status: 400 });
    }

    const { name, email, courseIds = [] } = parsed.data;

    // Insert into students
    const student = await db.insert(students).values({ name, email }).returning();
    const studentId = student[0].id;

    // Insert into join table if any courses are selected
    if (courseIds.length > 0) {
      const rows = courseIds.map((courseId) => ({ studentId, courseId }));
      await db.insert(studentCourses).values(rows);
    }

    return NextResponse.json({ studentId, message: "Student created successfully" });
  } catch (err: any) {
    console.error("API ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

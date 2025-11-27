import { NextResponse } from "next/server";
import { db } from "@/db";
import { students } from "@/db/schema/students";
import { courses } from "@/db/schema/courses";
import { studentCourses } from "@/db/schema/studentCourses";
import { eq } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  // Get student
  const student = await db.select().from(students).where(eq(students.id, id));

  if (!student.length)
    return NextResponse.json({ error: "Student not found" }, { status: 404 });

  // Get all enrolled courses
  const enrolled = await db
    .select({
      courseId: studentCourses.courseId,
      title: courses.title,
    })
    .from(studentCourses)
    .leftJoin(courses, eq(studentCourses.courseId, courses.id))
    .where(eq(studentCourses.studentId, id));

  return NextResponse.json({
    student: student[0],
    courses: enrolled,
  });
}

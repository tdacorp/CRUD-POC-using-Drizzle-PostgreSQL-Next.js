import { NextResponse } from "next/server";
import { db } from "@/db";
import { studentCourses } from "@/db/schema/studentcourses";

export async function POST(req: Request) {
  const { studentId, courseIds } = await req.json();

  const rows = courseIds.map((courseId: number) => ({
    studentId,
    courseId,
  }));

  await db.insert(studentCourses).values(rows);

  return NextResponse.json({ message: "Courses assigned" });
}

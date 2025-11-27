import { NextResponse } from "next/server";
import { db } from "@/db";
import { students } from "@/db/schema/students";

export async function GET() {
  try {
    // Fetch all students but only select name and email
    const allStudents = await db
      .select({ name: students.name, email: students.email })
      .from(students);

    return NextResponse.json(allStudents);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

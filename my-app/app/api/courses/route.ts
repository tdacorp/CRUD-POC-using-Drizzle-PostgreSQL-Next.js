import { NextResponse } from "next/server";
import { db } from "@/db";
import { courses } from "@/db/schema/courses";

// ✅ GET: Fetch all courses
export async function GET() {
  try {
    const allCourses = await db.select().from(courses);
    return NextResponse.json(allCourses);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// ✅ POST: Create new course
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title } = body;

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { error: "Course title is required" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(courses)
      .values({ title: title.trim() })
      .returning();

    return NextResponse.json(result[0]);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to add course" },
      { status: 500 }
    );
  }
}

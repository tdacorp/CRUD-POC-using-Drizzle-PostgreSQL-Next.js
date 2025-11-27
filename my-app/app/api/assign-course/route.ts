import { db } from "@/db";
import { studentCourses } from "@/db/schema/studentcourses";
import { assignCourseSchema } from "@/app/(lib)/validations";

// This function runs when a POST request is made to this API route.
export async function POST(req: Request) {
  const body = await req.json();

  // safeParse checks if the body matches the Zod schema.
  const parsed = assignCourseSchema.safeParse(body);

  if (!parsed.success)
    return Response.json({ errors: parsed.error.format() }, { status: 400 });

  await db.insert(studentCourses).values(parsed.data);
  return Response.json({ message: "Course assigned" });
}

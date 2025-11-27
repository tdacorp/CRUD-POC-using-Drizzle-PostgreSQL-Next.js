import { db } from "@/db";
import { eq } from "drizzle-orm";
import { students } from "@/db/schema/students";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }

  const student = await db.query.students.findFirst({
    where: eq(students.id, id),
  });

  if (!student) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(student);
}

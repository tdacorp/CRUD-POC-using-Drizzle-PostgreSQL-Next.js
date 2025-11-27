import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export const assignCourseSchema = z.object({
  studentId: z.number(),
  courseId: z.number(),
});

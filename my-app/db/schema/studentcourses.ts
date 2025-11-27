import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { students } from "./students";
import { courses } from "./courses";
import { relations } from "drizzle-orm";

export const studentCourses = pgTable("student_courses", {
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  courseId: integer("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
});


export const studentCoursesRelations = relations(studentCourses, ({ one }) => ({
  student: one(students, {
    fields: [studentCourses.studentId],
    references: [students.id],
  }),
  course: one(courses, {
    fields: [studentCourses.courseId],
    references: [courses.id],
  }),
}));

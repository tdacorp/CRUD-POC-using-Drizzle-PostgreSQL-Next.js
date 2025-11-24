// db/schema.ts
import { pgTable, serial, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { pgEnum, foreignKey } from "drizzle-orm/pg-core";

// enums
export const projectStatus = pgEnum("project_status", ["active", "completed", "archived"]);
export const taskStatus = pgEnum("task_status", ["todo", "in_progress", "done"]);
export const taskPriority = pgEnum("task_priority", ["low", "medium", "high"]);

// users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  owner_id: integer("owner_id").references(() => users.id).notNull(),
  status: projectStatus("status").default("active").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  archived_at: timestamp("archived_at"),
}, (table) => ({
  unique_owner_name: table.uniqueIndex("projects_owner_name_idx", ["owner_id", "name"])
}));

// tasks
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  project_id: integer("project_id").references(() => projects.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: taskStatus("status").default("todo").notNull(),
  priority: taskPriority("priority").default("medium").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  due_date: timestamp("due_date"),
  deleted_at: timestamp("deleted_at"), // soft delete
});

// task_assignments (join)
export const task_assignments = pgTable("task_assignments", {
  id: serial("id").primaryKey(),
  task_id: integer("task_id").references(() => tasks.id).notNull(),
  user_id: integer("user_id").references(() => users.id).notNull(),
  assigned_at: timestamp("assigned_at").defaultNow().notNull(),
}, (table) => ({
  unique_task_user: table.uniqueIndex("task_user_unique_idx", ["task_id", "user_id"])
}));

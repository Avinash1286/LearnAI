import { boolean } from "drizzle-orm/gel-core";
import { integer, json, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionId: varchar()
});


export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar().notNull().unique(),
  name: varchar().notNull(),
  description: varchar(),
  noOfChapters: integer().notNull().default(1),
  includeVideo: boolean().notNull().default(false),
  level: varchar({ length: 50 }).notNull().default("beginner"),
  category: varchar(),
  courseJson: json(),
  bannerImage: varchar(),
  courseContent: json().default({}),
  userEmail: varchar('userEmail').references(() => usersTable.email).notNull(),
});

export const enrollCourseTable=pgTable('enrollCourse',{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar('cid').references(() => coursesTable.cid).notNull(),
  userEmail: varchar('userEmail').references(() => usersTable.email).notNull(),
  completedChapters: json(),
})
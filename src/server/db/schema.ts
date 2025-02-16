/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `alexander-cannon-personal_${name}`,
);

export const posts = createTable(
  "post",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    body: text("body"),
    slug: varchar("slug", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
    slugIndex: index("slug_idx").on(example.slug),
  }),
);

export const comments = createTable(
  "comment",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    postId: integer("post_id")
      .references(() => posts.id)
      .notNull(),
    body: varchar("body", { length: 2048 }).notNull(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    postIdIndex: index("post_id_idx").on(example.postId),
  }),
);

export const contacts = createTable(
  "contact",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    email: varchar("email", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }),
    company: varchar("company", { length: 256 }),
    jobTitle: varchar("job_title", { length: 256 }),
    message: text("message"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    emailIndex: index("email_idx").on(example.email),
  }),
);

// Relations
export const postsRelations = relations(posts, ({ many }) => ({
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));

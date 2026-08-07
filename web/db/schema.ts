import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  username: text('username').notNull().unique(), // Simple auth identifier
  passwordHash: text('password_hash').notNull(),
  birthDate: text('birth_date'), // Format: YYYY-MM-DD
  birthTime: text('birth_time'), // Format: HH:MM
});

export const dailyLuck = sqliteTable('daily_luck', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  date: text('date').notNull(), // Format: YYYY-MM-DD
  reading: text('reading').notNull(),
  createdAt: integer('created_at').notNull().default(sql`(strftime('%s', 'now'))`),
});

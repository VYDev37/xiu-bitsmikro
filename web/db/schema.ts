import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  username: text('username').notNull().unique(), // Simple auth identifier
  passwordHash: text('password_hash').notNull(),
  birthDate: text('birth_date'), // Format: YYYY-MM-DD
  birthTime: text('birth_time'), // Format: HH:MM
});

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

export const baziCharts = sqliteTable('bazi_charts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id), // Optional, as calculation can be public
  nama: text('nama').notNull(),
  birthDate: text('birth_date').notNull(),
  birthTime: text('birth_time').notNull(),
  data: text('data').notNull(),
  createdAt: integer('created_at').notNull().default(sql`(strftime('%s', 'now'))`),
});

export const monthlyCalendar = sqliteTable('monthly_calendar', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  nama: text('nama').notNull(),
  birthDate: text('birth_date').notNull(),
  birthTime: text('birth_time').notNull(),
  monthYear: text('month_year').notNull(), // format YYYY-MM
  data: text('data').notNull(), // JSON array of highlighted dates
  createdAt: integer('created_at').notNull().default(sql`(strftime('%s', 'now'))`),
});

export const insightCards = sqliteTable('insight_cards', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  nama: text('nama').notNull(),
  birthDate: text('birth_date').notNull(),
  birthTime: text('birth_time').notNull(),
  category: text('category').notNull(), // love, career, path, wealth, relationship, compatibility
  content: text('content').notNull(), // JSON response string
  createdAt: integer('created_at').notNull().default(sql`(strftime('%s', 'now'))`),
});

export const savedDates = sqliteTable('saved_dates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id), // Nullable for guests
  nama: text('nama').notNull(), // Tie to nama/birthDate if not logged in
  birthDate: text('birth_date').notNull(),
  date: text('date').notNull(), // The saved specific date
  data: text('data').notNull(), // The note content JSON
  createdAt: integer('created_at').notNull().default(sql`(strftime('%s', 'now'))`),
});

export const chatSessions = sqliteTable('chat_sessions', {
  id: text('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  createdAt: integer('created_at').notNull().default(sql`(strftime('%s', 'now'))`),
});

export const chatMessages = sqliteTable('chat_messages', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').notNull().references(() => chatSessions.id, { onDelete: 'cascade' }),
  role: text('role').notNull(), // 'user' | 'assistant'
  content: text('content').notNull(),
  createdAt: integer('created_at').notNull().default(sql`(strftime('%s', 'now'))`),
});

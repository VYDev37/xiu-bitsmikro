import { pgTable, serial, text, integer, bigint } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username').notNull().unique(), // Simple auth identifier
  passwordHash: text('password_hash').notNull(),
  birthDate: text('birth_date'), // Format: YYYY-MM-DD
  birthTime: text('birth_time'), // Format: HH:MM
});

export const dailyLuck = pgTable('daily_luck', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: text('date').notNull(), // Format: YYYY-MM-DD
  reading: text('reading').notNull(),
  createdAt: bigint('created_at', { mode: 'number' }).notNull().default(sql`(EXTRACT(EPOCH FROM NOW()) * 1000)::bigint`),
});

export const baziCharts = pgTable('bazi_charts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }), // Optional, as calculation can be public
  nama: text('nama').notNull(),
  birthDate: text('birth_date').notNull(),
  birthTime: text('birth_time').notNull(),
  data: text('data').notNull(),
  createdAt: bigint('created_at', { mode: 'number' }).notNull().default(sql`(EXTRACT(EPOCH FROM NOW()) * 1000)::bigint`),
});

export const monthlyCalendar = pgTable('monthly_calendar', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  nama: text('nama').notNull(),
  birthDate: text('birth_date').notNull(),
  birthTime: text('birth_time').notNull(),
  monthYear: text('month_year').notNull(), // format YYYY-MM
  data: text('data').notNull(), // JSON array of highlighted dates
  createdAt: bigint('created_at', { mode: 'number' }).notNull().default(sql`(EXTRACT(EPOCH FROM NOW()) * 1000)::bigint`),
});

export const insightCards = pgTable('insight_cards', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  nama: text('nama').notNull(),
  birthDate: text('birth_date').notNull(),
  birthTime: text('birth_time').notNull(),
  category: text('category').notNull(), // love, career, path, wealth, relationship, compatibility
  content: text('content').notNull(), // JSON response string
  createdAt: bigint('created_at', { mode: 'number' }).notNull().default(sql`(EXTRACT(EPOCH FROM NOW()) * 1000)::bigint`),
});

export const savedDates = pgTable('saved_dates', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }), // Nullable for guests
  nama: text('nama').notNull(), // Tie to nama/birthDate if not logged in
  birthDate: text('birth_date').notNull(),
  date: text('date').notNull(), // The saved specific date
  data: text('data').notNull(), // The note content JSON
  createdAt: bigint('created_at', { mode: 'number' }).notNull().default(sql`(EXTRACT(EPOCH FROM NOW()) * 1000)::bigint`),
});

export const chatSessions = pgTable('chat_sessions', {
  id: text('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  createdAt: bigint('created_at', { mode: 'number' }).notNull().default(sql`(EXTRACT(EPOCH FROM NOW()) * 1000)::bigint`),
});

export const chatMessages = pgTable('chat_messages', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').notNull().references(() => chatSessions.id, { onDelete: 'cascade' }),
  role: text('role').notNull(), // 'user' | 'assistant'
  content: text('content').notNull(),
  createdAt: bigint('created_at', { mode: 'number' }).notNull().default(sql`(EXTRACT(EPOCH FROM NOW()) * 1000)::bigint`),
});

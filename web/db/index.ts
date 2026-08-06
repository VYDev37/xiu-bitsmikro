import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import path from 'path';

// Construct the path to the sqlite file
const sqlitePath = path.join(process.cwd(), 'sqlite.db');

// Initialize the database connection
const sqlite = new Database(sqlitePath);

// Create the Drizzle instance
export const db = drizzle(sqlite, { schema });

import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env.local' });
config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Please define it in web/.env.local or web/.env');
}

export default defineConfig({
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

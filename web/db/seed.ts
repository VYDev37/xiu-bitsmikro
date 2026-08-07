import { db } from './index';
import { users, dailyLuck } from './schema';
import argon2 from 'argon2';

async function seed() {
    console.log('Seeding database...');

    // Clear old data
    console.log('Clearing old data...');
    db.delete(dailyLuck).run();
    db.delete(users).run();

    // Insert new data
    console.log('Inserting seed data...');

    const passwordHash = await argon2.hash('password', {
        type: argon2.argon2id,
        memoryCost: 16384, // 16MB in KiB
        timeCost: 2,
        parallelism: 1
    });

    const insertedUsers = db.insert(users).values([
        {
            name: 'Admin User',
            username: 'admin',
            passwordHash,
            birthDate: '1990-01-01',
            birthTime: '12:00'
        },
    ]).returning().all();

    console.log(`Inserted ${insertedUsers.length} users.`);
    console.log('Seed completed successfully!');
}

seed().catch(console.error);

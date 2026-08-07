import { db } from ".";
import { dailyLuck } from "./schema";

async function clear() {
    await db.delete(dailyLuck);
}

clear();

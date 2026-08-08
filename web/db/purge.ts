import { db } from ".";
import { baziCharts, dailyLuck, insightCards, monthlyCalendar, savedDates } from "./schema";

async function clear() {
    await db.delete(dailyLuck);
    await db.delete(baziCharts);
    await db.delete(monthlyCalendar);
    await db.delete(insightCards);
    await db.delete(savedDates);
}

clear();

import { db } from "../db/index.js"
import { announcements } from "../db/schema.js";
import { ilike, or, and, eq, desc } from "drizzle-orm";

export const createAnnouncement = async () => {
    await db.insert(announcements).values({
        title: "Happy birthday",
        content: "Happy birthday to you",
        categories: "wishing"
    })
}

export const getAllAnnoucements = async () => {
    return await db.select().from(announcements);
}

export const getFilteredAnnouncements = async (category?: string, search?: string) => {
    const conditions = [];

    if (search) {
        conditions.push(
        or(
            ilike(announcements.title, `%${search}%`),
            ilike(announcements.content, `%${search}%`)
        )
        );
    }

    return await db
        .select()
        .from(announcements)
        // and() merges the array of conditions. If empty, it passes undefined (no filter).
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(announcements.createdAt));
}
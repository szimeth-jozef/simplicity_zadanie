import { db } from "../db/index.js"
import { announcements } from "../db/schema.js";
import { ilike, or, and, eq, desc } from "drizzle-orm";

type CreateAnnouncementInput = {
    title: string;
    content: string;
    categories: string;
};

export const createAnnouncement = async ({
    title,
    content,
    categories,
}: CreateAnnouncementInput) => {
    const [createdAnnouncement] = await db
        .insert(announcements)
        .values({ title, content, categories })
        .returning({ id: announcements.id });

    if (!createdAnnouncement) {
        throw new Error("Announcement insert did not return an ID");
    }

    return createdAnnouncement.id;
}

export const getAnnouncements = async (category?: string, search?: string) => {
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

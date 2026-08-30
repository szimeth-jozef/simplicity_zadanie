import { db } from "../db/index.js"
import { announcements } from "../db/schema.js";
import { ilike, or, and, desc, sql, type SQL } from "drizzle-orm";

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

export const getAnnouncements = async (categories: string[] = [], search?: string) => {
    const conditions: SQL[] = [];

    if (search) {
        const searchCondition = or(
            ilike(announcements.title, `%${search}%`),
            ilike(announcements.content, `%${search}%`)
        );

        if (searchCondition) {
            conditions.push(searchCondition);
        }
    }

    if (categories.length > 0) {
        const categoryConditions = categories.map((category) =>
            sql`(',' || regexp_replace(${announcements.categories}, '[[:space:]]*,[[:space:]]*', ',', 'g') || ',') ILIKE ${`%,${category},%`}`,
        );
        const categoryCondition = or(...categoryConditions);

        if (categoryCondition) {
            conditions.push(categoryCondition);
        }
    }

    return await db
        .select()
        .from(announcements)
        // and() merges the array of conditions. If empty, it passes undefined (no filter).
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(announcements.createdAt));
}

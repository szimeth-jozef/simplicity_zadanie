import type { Request, Response } from "express";
import * as AnnouncementsService from "../services/announcements.js";

export const create = async (req: Request, res: Response) => {
    const body = req.body as unknown;

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
        res.status(400).json({ error: "Request body must be an object" });
        return;
    }

    const { title, content, categories } = body as Record<string, unknown>;

    if (typeof title !== "string" || typeof content !== "string" || typeof categories !== "string") {
        res.status(400).json({ error: "title, content, and categories must be strings" });
        return;
    }

    const normalizedTitle = title.trim();
    const normalizedContent = content.trim();
    const categoryList = categories.split(",").map((category) => category.trim());

    if (!normalizedTitle || !normalizedContent || categoryList.some((category) => !category)) {
        res.status(400).json({
            error: "title and content cannot be empty, and categories must be a comma-separated list of non-empty values",
        });
        return;
    }

    try {
        const id = await AnnouncementsService.createAnnouncement({
            title: normalizedTitle,
            content: normalizedContent,
            categories: categoryList.join(","),
        });

        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: "Failed to create announcement" })
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const announcements = await AnnouncementsService.getAnnouncements(undefined, "term")

        res.status(200).json(announcements)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to get all announcementa" })
    }
}

import type { Request, Response } from "express";
import * as AnnouncementsService from "../services/announcements.js";

const parseAnnouncementInput = (
    body: unknown,
): { value: AnnouncementsService.AnnouncementInput } | { error: string } => {
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
        return { error: "Request body must be an object" };
    }

    const { title, content, categories } = body as Record<string, unknown>;

    if (typeof title !== "string" || typeof content !== "string" || typeof categories !== "string") {
        return { error: "title, content, and categories must be strings" };
    }

    const normalizedTitle = title.trim();
    const normalizedContent = content.trim();
    const categoryList = categories.split(",").map((category) => category.trim());

    if (!normalizedTitle || !normalizedContent || categoryList.some((category) => !category)) {
        return {
            error: "title and content cannot be empty, and categories must be a comma-separated list of non-empty values",
        };
    }

    return {
        value: {
            title: normalizedTitle,
            content: normalizedContent,
            categories: categoryList.join(","),
        },
    };
};

export const create = async (req: Request, res: Response) => {
    const input = parseAnnouncementInput(req.body);

    if ("error" in input) {
        res.status(400).json({ error: input.error });
        return;
    }

    try {
        const id = await AnnouncementsService.createAnnouncement(input.value);

        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: "Failed to create announcement" })
    }
}

export const update = async (req: Request, res: Response) => {
    const { id: rawId } = req.params;

    if (typeof rawId !== "string" || !/^[1-9]\d*$/.test(rawId)) {
        res.status(400).json({ error: "id must be a positive integer" });
        return;
    }

    const id = Number(rawId);

    if (!Number.isSafeInteger(id)) {
        res.status(400).json({ error: "id must be a safe integer" });
        return;
    }

    const input = parseAnnouncementInput(req.body);

    if ("error" in input) {
        res.status(400).json({ error: input.error });
        return;
    }

    try {
        const announcement = await AnnouncementsService.updateAnnouncement(id, input.value);

        if (!announcement) {
            res.status(404).json({ error: "Announcement not found" });
            return;
        }

        res.status(200).json(announcement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update announcement" });
    }
}

export const getAll = async (req: Request, res: Response) => {
    const { search, categories } = req.query;

    if (
        (search !== undefined && typeof search !== "string") ||
        (categories !== undefined && typeof categories !== "string")
    ) {
        res.status(400).json({ error: "search and categories query parameters must be strings" });
        return;
    }

    const selectedCategories = (categories ?? "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);

    if ((categories !== undefined) && selectedCategories.length === 0) {
        res.status(400).json({ error: "categories must contain at least one category" });
        return;
    }

    try {
        const announcements = await AnnouncementsService.getAnnouncements(
            selectedCategories,
            search?.trim() || undefined,
        );

        res.status(200).json(announcements)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to get announcements" })
    }
}

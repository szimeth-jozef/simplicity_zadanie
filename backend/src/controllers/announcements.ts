import type { Request, Response } from "express";
import * as AnnouncementsService from "../services/announcements.js";

export const createAnnouncement = async (req: Request, res: Response) => {
    try {
        await AnnouncementsService.createAnnouncement()

        res.status(201).json({ msg: "Successfuly created" })
    } catch (error) {
        res.status(500).json({ error: "Failed to create announcement" })
    }
}

export const getAnnouncements = async (req: Request, res: Response) => {
    const search = "term"
    
    try {
        const announcements = await AnnouncementsService.getFilteredAnnouncements(undefined, search)

        res.status(200).json(announcements)
    } catch (error) {
        res.status(500).json({ error: "Failed to create announcement" })
    }
}

export const getAllAnnoucements = async (req: Request, res: Response) => {
    try {
        const announcements = await AnnouncementsService.getAllAnnoucements()

        res.status(200).json(announcements)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to get all announcementa" })
    }
}
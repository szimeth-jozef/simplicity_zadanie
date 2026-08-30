import { Router } from "express";
import * as AnnouncementController from "../controllers/announcements.js";

const router: Router = Router();

router.post('/', AnnouncementController.create)
router.get('/', AnnouncementController.getAll)
router.get('/:id', AnnouncementController.getById)
router.put('/:id', AnnouncementController.update)
router.delete('/:id', AnnouncementController.remove)

export default router;

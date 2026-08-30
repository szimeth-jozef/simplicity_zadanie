import { Router } from "express";
import * as AnnouncementController from "../controllers/announcements.js";

const router: Router = Router();

router.post('/', AnnouncementController.create)
router.get('/', AnnouncementController.getAll)

// You will add the rest of your CRUD routes here:
// router.get('/', AnnouncementController.getAll);
// router.get('/:id', AnnouncementController.getOne);
// router.put('/:id', AnnouncementController.update);
// router.delete('/:id', AnnouncementController.remove);

export default router;
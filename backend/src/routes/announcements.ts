import { Router } from "express";
import * as AnnouncementController from "../controllers/announcements.js";

const router: Router = Router();

// CRUD endpoints
// [x] Create
// [ ] Read
//      [x] Get list
//      [ ] Get exact
// [x] Update
// [ ] Delete
router.post('/', AnnouncementController.create)
router.get('/', AnnouncementController.getAll)
router.put('/:id', AnnouncementController.update)

export default router;

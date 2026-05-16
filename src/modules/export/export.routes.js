import express from "express";
import protect from "../../middleware/auth.middleware.js";
import { exportFolder } from "./export.controller.js";
const router = express.Router();

router.use(protect);
router.get("/folder/:folderId", exportFolder);

export default router;

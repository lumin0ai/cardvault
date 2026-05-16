import express from "express";
import protect from "../../middleware/auth.middleware.js";

import {
  createFolder,
  updateFolder,
  getFolders,
  deleteFolder,
  getFoldersList
} from "./folder.controller.js";

const router = express.Router();
router.use(protect);
router.post("/", createFolder);
router.get('/list', getFoldersList);
router.get("/", getFolders);
router.patch("/:id", updateFolder);
router.delete("/:id", deleteFolder);

export default router;

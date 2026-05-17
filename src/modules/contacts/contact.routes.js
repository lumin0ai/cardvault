import express from "express";

import protect from "../../middleware/auth.middleware.js";
import upload from "../../middleware/upload.middleware.js";

import {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
  getContactsStats
} from "./contact.controller.js";

const router = express.Router();
router.use(protect);

router.post(
  "/",
  upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
  ]),
  createContact,
);
router.get("/", getContacts);
router.get('/stats', getContactsStats);
router.patch("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;

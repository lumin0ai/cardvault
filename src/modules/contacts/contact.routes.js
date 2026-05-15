import express from "express";

import protect from "../../middleware/auth.middleware.js";

import {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} from "./contact.controller.js";

const router = express.Router();
router.use(protect);

router.post("/", createContact);
router.get("/", getContacts);
router.patch("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;

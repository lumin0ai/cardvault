import express from "express";

import { register, login } from "./auth.controller.js";
import protect from "../../middleware/auth.middleware.js";
import { getMe } from "./auth.controller.js";
import validate from "../../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "./auth.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", protect, getMe);

export default router;

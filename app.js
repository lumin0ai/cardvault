import express from "express";
import cors from "cors";
import authRoutes from "./src/modules/auth/auth.routes.js";
import cookieParser from "cookie-parser";
import folderRoutes from "./src/modules/folders/folder.routes.js";
import contactRoutes from "./src/modules/contacts/contact.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import exportRoutes from "./src/modules/export/export.routes.js";
import upload from "./src/middleware/upload.middleware.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const uploadsDir = path.resolve(__dirname, "uploads");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("api running");
});

app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/uploads", upload);
app.use("/api/export", exportRoutes);
export default app;

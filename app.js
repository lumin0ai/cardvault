import express from "express";
import cors from "cors";
import authRoutes from "./src/modules/auth/auth.routes.js";
import cookieParser from "cookie-parser";
import folderRoutes from "./src/modules/folders/folder.routes.js";
import contactRoutes from "./src/modules/contacts/contact.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import exportRoutes from "./src/modules/export/export.routes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "mongo-sanitize";
import errorMiddleware from "./src/middleware/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "uploads");
const exportsDir = path.resolve(__dirname, "exports");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP",
});
app.use(limiter);

app.use((req, res, next) => {
  req.body = mongoSanitize(req.body);
  req.query = mongoSanitize(req.query);
  req.params = mongoSanitize(req.params);
  next();
});

app.get("/", (req, res) => {
  res.send("api running");
});

app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/uploads", express.static(uploadsDir));
app.use("/exports", express.static(exportsDir));
app.use("/api/export", exportRoutes);

app.use(errorMiddleware);

export default app;

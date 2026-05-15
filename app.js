import express from "express";
import cors from "cors";
import authRoutes from "./src/modules/auth/auth.routes.js";
import cookieParser from "cookie-parser";
import folderRoutes from "./src/modules/folders/folder.routes.js";
import contactRoutes from "./src/modules/contacts/contact.routes.js";

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
export default app;

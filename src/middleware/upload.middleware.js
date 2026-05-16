import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createDirIfNotExists } from "../utils/createDir.utils.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const uploadDir = path.resolve(__dirname, "../../uploads/cards");

// fs.mkdirSync(uploadDir, { recursive: true });

createDirIfNotExists("uploads/cards");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;

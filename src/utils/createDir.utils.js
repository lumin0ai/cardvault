import fs from "fs";

export const createDirIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, {
      recursive: true,
    });
    console.log(`Directory created: ${dirPath}`);
  }
};

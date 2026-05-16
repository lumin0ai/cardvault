import fs from "fs";
import path from "path";

export const deleteFile = (fileUrl) => {
  try {
    if (!fileUrl) {
      return;
    }

    const fileName = fileUrl.split("/").pop();

    const filePath = path.join("uploads/cards", fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${fileName}`);
    }
  } catch (error) {
    console.log("File delete error:", error.message);
  }
};

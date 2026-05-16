import asyncHandler from "../../utils/asyncHandler.js";
import { exportFolderService } from "./export.service.js";

export const exportFolder = asyncHandler(async (req, res) => {
  const fileName = await exportFolderService(req.params.folderId, req.user._id);
  const fileUrl = `${req.protocol}://${req.get("host")}/exports/${fileName}`;
  res.status(200).json({
    message: "Export successfully",
    fileUrl,
  });
});

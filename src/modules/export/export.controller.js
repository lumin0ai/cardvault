import { exportFolderService } from "./export.service.js";

export const exportFolder = async (req, res) => {
  try {
    const fileName = await exportFolderService(
      req.params.folderId,
      req.user._id,
    );
    const fileUrl = `${req.protocol}://${req.get("host")}/exports/${fileName}`;
    res.status(200).json({
      message: "Export successfully",
      fileUrl,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

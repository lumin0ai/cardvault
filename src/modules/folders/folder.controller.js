import asyncHandler from "../../utils/asyncHandler.js";
import {
  createFolderService,
  getFoldersService,
  updateFolderService,
  deleteFolderService,
} from "./folder.service.js";

export const createFolder = asyncHandler(async (req, res) => {
  const folder = await createFolderService(req.user._id, req.body);
  res.status(201).json(folder);
});

export const getFolders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const result = await getFoldersService(req.user._id, page, limit);
  res.status(200).json(result);
});

export const updateFolder = asyncHandler(async (req, res) => {
  const folder = await updateFolderService(
    req.params.id,
    req.user._id,
    req.body,
  );
  res.status(200).json(folder);
});

export const deleteFolder = asyncHandler(async (req, res) => {
  await deleteFolderService(req.params.id, req.user._id);
  res.status(200).json({
    message: "Folder deleted",
  });
});

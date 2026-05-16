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
  const folders = await getFoldersService(req.user._id);
  res.status(200).json(folders);
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

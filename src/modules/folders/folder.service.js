import Folder from "./folder.model.js";

export const createFolderService = async (userId, data) => {
  return await Folder.create({
    userId,
    ...data,
  });
};

export const getFoldersService = async (userId) => {
  return await Folder.find({ userId }).sort({
    createdAt: -1,
  });
};

export const updateFolderService = async (folderId, userId, data) => {
  return await Folder.findOneAndUpdate({ _id: folderId, userId }, data, {
    new: true,
  });
};

export const deleteFolderService = async (folderId, userId) => {
  return await Folder.findOneAndDelete({ _id: folderId, userId });
};

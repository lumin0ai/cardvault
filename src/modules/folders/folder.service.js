import Folder from "./folder.model.js";
import mongoose from "mongoose";

export const createFolderService = async (userId, data) => {
  return await Folder.create({
    userId,
    ...data,
  });
};

export const getFoldersService = async (userId, page = 1, limit = 10) => {
  const skip = (Number(page) - 1) * Number(limit);
  const results = await Folder.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        folders: [
          {
            $lookup: {
              from: "contacts",
              localField: "_id",
              foreignField: "folderId",
              as: "contacts",
            },
          },
          {
            $addFields: {
              contactsCount: {
                $size: "$contacts",
              },
            },
          },
          {
            $project: {
              contacts: 0,
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $skip: skip,
          },
          {
            $limit: Number(limit),
          },
        ],
      },
    },
  ]);

  const folders = results[0].folders;
  const totalFolders = results[0].metadata[0]?.total || 0;
  const totalPages = Math.ceil(totalFolders / Number(limit));

  return {
    folders,
    totalFolders,
    totalPages,
    currentPage: Number(page),
  };
};

export const updateFolderService = async (folderId, userId, data) => {
  return await Folder.findOneAndUpdate({ _id: folderId, userId }, data, {
    new: true,
  });
};

export const deleteFolderService = async (folderId, userId) => {
  return await Folder.findOneAndDelete({ _id: folderId, userId });
};

export const getFoldersListService = async (userId) => {
  return await Folder.find({ userId }, { name: 1 }).sort({ createdAt: -1 });
};

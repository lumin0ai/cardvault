import Folder from "./folder.model.js";
import mongoose from "mongoose";

export const createFolderService = async (userId, data) => {
  return await Folder.create({
    userId,
    ...data,
  });
};

export const getFoldersService = async (userId) => {
  // return await Folder.find({ userId }).sort({
  //   createdAt: -1,
  // });
  return await Folder.aggregate([
    {
      $match: {
        userId:
          new mongoose.Types.ObjectId(
            userId
          ),
      },
    },
    {
      $lookup: {
        from: 'contacts',
        localField: '_id',
        foreignField: 'folderId',
        as: 'contacts'
      }
    },
    {
      $addFields: {
        contactsCount: {
          $size: '$contacts',
        }
      }
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
  ]);
};

export const updateFolderService = async (folderId, userId, data) => {
  return await Folder.findOneAndUpdate({ _id: folderId, userId }, data, {
    new: true,
  });
};

export const deleteFolderService = async (folderId, userId) => {
  return await Folder.findOneAndDelete({ _id: folderId, userId });
};

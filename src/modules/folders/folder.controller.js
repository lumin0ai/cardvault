import {
  createFolderService,
  getFoldersService,
  updateFolderService,
  deleteFolderService,
} from "./folder.service";

export const createFolder = (req, res) => {
  try {
    const folder = await createFolderService(req.user._id, req.body);
    res.status(201).json(folder);
  } catch (error) {
    res.status(400).json({message: error.message,})
  }
};

export const getFolders = async(req, res) =>{
    try {
        const folders = await getFoldersService(req.user._id);
        res.status(200).json(folders);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const updateFolder = async(req, res) =>{
    try {
        const folder = await updateFolderService(req.params.id, req.user._id, req.body);
        res.status(200).json(folder);
    } catch (error) {
        res.status(400).json({
            message : error.message,
        });
    }
};

export const deleteFolder = async(req, res) =>{
    try {
        await deleteFolderService(req.params.id, req.user._id);
        res.status(200).json({
             message: "Folder deleted",
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
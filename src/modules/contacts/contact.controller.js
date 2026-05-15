import {
  createContactService,
  getContactsService,
  updateContactService,
  deleteContactService,
} from "./contact.service.js";

export const createContact = async (req, res) => {
  try {
    let frontImageUrl = "";
    let backImageUrl = "";
    if (req.files && req.files.frontImage) {
      frontImageUrl = `${req.protocol}://${req.get("host")}/uploads/cards/${req.files.frontImage[0].filename}`;
    }
    if (req.files && req.files.backImage) {
      backImageUrl = `${req.protocol}://${req.get("host")}/uploads/cards/${req.files.backImage[0].filename}`;
    }
    const contact = await createContactService(req.user._id, {
      ...req.body,
      frontImageUrl,
      backImageUrl,
    });
    res.status(201).json({
      message: "Contact created",
      contact,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const result = await getContactsService({
      userId: req.user._id,
      folderId: req.query.folderId,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      search: req.query.search || "",
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await updateContactService(
      req.params.id,
      req.user._id,
      req.body,
    );
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    await deleteContactService(req.params.id, req.user._id);
    res.status(200).json({
      message: "Contact deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

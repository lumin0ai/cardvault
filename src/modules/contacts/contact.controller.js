import asyncHandler from "../../utils/asyncHandler.js";
import {
  createContactService,
  getContactsService,
  updateContactService,
  deleteContactService,
} from "./contact.service.js";

export const createContact = asyncHandler(async (req, res) => {
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
});

export const getContacts = asyncHandler(async (req, res) => {
  const result = await getContactsService({
    userId: req.user._id,
    folderId: req.query.folderId,
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    search: req.query.search || "",
  });
  res.status(200).json(result);
});

export const updateContact = asyncHandler(async (req, res) => {
  const contact = await updateContactService(
    req.params.id,
    req.user._id,
    req.body,
  );
  res.status(200).json(contact);
});

export const deleteContact = asyncHandler(async (req, res) => {
  await deleteContactService(req.params.id, req.user._id);
  res.status(200).json({
    message: "Contact deleted",
  });
});

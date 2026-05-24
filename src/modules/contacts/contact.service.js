import Contact from "./contact.model.js";
import { deleteFile } from "../../utils/file.utils.js";
import ApiError from "../../utils/ApiError.js";

export const createContactService = async (userId, data) => {
  return await Contact.create({ userId, ...data });
};

export const getContactsService = async ({
  userId,
  folderId,
  page = 1,
  limit = 10,
  search = "",
}) => {
  const query = {
    userId,
  };

  if (folderId) {
    query.folderId = folderId;
  }

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        company: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const contacts = await Contact.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Contact.countDocuments(query);

  return {
    contacts,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateContactService = async (contactId, userId, data) => {
  return await Contact.findOneAndUpdate(
    {
      _id: contactId,
      userId,
    },
    data,
    { new: true },
  );
};

export const deleteContactService = async (contactId, userId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    userId,
  });

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  deleteFile(contact.frontImageUrl);

  deleteFile(contact.backImageUrl);

  await contact.deleteOne();
};

export const getContactsStatsService = async (userId) => {
  const totalContacts = await Contact.countDocuments({
    userId,
  });
  return { totalContacts };
};

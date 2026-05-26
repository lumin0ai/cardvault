import ExcelJS from "exceljs";
import path from "path";
import Contact from "../contacts/contact.model.js";
import Folder from "../folders/folder.model.js";
import { createDirIfNotExists } from "../../utils/createDir.utils.js";

export const exportFolderService = async (folderId, userId) => {
  const folder = await Folder.findOne({
    _id: folderId,
    userId,
  });

  if (!folder) {
    throw new Error("Folder not found");
  }

  const contact = await Contact.find({
    folderId,
    userId,
  });

  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet(folder.name);
  worksheet.columns = [
    {
      header: "Name",
      key: "name",
      width: 25,
    },
    {
      header: "Company",
      key: "company",
      width: 25,
    },
    {
      header: "Job Title",
      key: "jobTitle",
      width: 25,
    },
    {
      header: "Email",
      key: "email",
      width: 30,
    },
    {
      header: "Phone",
      key: "phone",
      width: 20,
    },
    {
      header: "Website",
      key: "website",
      width: 30,
    },
    {
      header: "Address",
      key: "address",
      width: 40,
    },
    {
      header: "LinkedIn",
      key: "linkedin",
      width: 40,
    },
    {
      header: "Instagram",
      key: "instagram",
      width: 40,
    },
    {
      header: "Twitter",
      key: "twitter",
      width: 40,
    },
  ];

  contact.forEach((contact) => {
    worksheet.addRow({
      name: contact.name,
      company: contact.company,
      jobTitle: contact.jobTitle,
      email: contact.email,
      phone: contact.phone,
      website: contact.website,
      address: contact.address,
      linkedin: contact.linkedin,
      instagram: contact.socialHandles.instagram,
      twitter: contact.socialHandles.twitter,
    });
  });

  // const safeFolderName = folder.name.replace(/\s+/g, "_");
  // const fileName = `${safeFolderName}_${Date.now()}.xlsx`;
  const safeFolderName = folder.name.replace(/\s+/g, "_");
  const now = new Date();
  const dateTimeString = now
    .toISOString()
    .replace(/[:.]/g, "-")
    .replace("T", "_")
    .split("Z")[0];

  const fileName = `${safeFolderName}_${dateTimeString}.xlsx`;

  console.log(fileName);

  const filePath = path.join("exports", fileName);
  createDirIfNotExists("exports");
  await workbook.xlsx.writeFile(filePath);
  return fileName;
};

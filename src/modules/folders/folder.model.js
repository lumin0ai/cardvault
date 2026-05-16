import mongoose from "mongoose";
import Contact from "../contacts/contact.model.js";
import { deleteFile } from "../../utils/file.utils.js";

const folderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

folderSchema.pre("findOneAndDelete", async function () {
  const folder = await this.model.findOne(this.getFilter());

  if (folder) {
    const contacts = await Contact.find({
      folderId: folder._id,
    });

    contacts.forEach((contact) => {
      deleteFile(contact.frontImageUrl);
      deleteFile(contact.backImageUrl);
    });

    await Contact.deleteMany({
      folderId: folder._id,
    });
  }
});

const Folder = mongoose.model("Folder", folderSchema);
export default Folder;

import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },
    name: String,
    company: String,
    jobTitle: String,
    email: String,
    phone: String,
    website: String,
    address: String,
    linkedin: String,
    socialHandles: {
      twitter: String,
      instagram: String,
    },

    frontImageUrl: String,
    backImageUrl: String,
  },
  {
    timestamps: true,
  },
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;

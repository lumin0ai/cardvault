import mongoose from "mongoose";

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

const Folder = mongoose.model("Folder", folderSchema);
export default Folder;

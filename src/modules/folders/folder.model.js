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

folderSchema.pre("findOneAndDelete", async function (next) {
  const folder = await this.model.findOne(this.getFilter());

  if (folder) {
    await mongoose.model("Contact").deleteMany({
      folderId: folder._id,
    });
  }

  next();
});

const Folder = mongoose.model("Folder", folderSchema);
export default Folder;

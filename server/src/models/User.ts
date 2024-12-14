import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    profilePic: {
      type: String,
      required: false,
      default: "https://loremflickr.com/500/500?lock=8792450353592873",
    },
    recipes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Recipe",
        required: false,
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);

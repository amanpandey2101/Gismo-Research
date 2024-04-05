import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  profilePic: {
    type: Object,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAccess: {
    type: Boolean,
    default: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verifyDocument: {
    type: Object,
  },
  appliedCourses: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
    default: [],
  },
  role: {
    type: Number,
    default: null,
  },
  refreshToken: {
    type: String,
    default: "",
  },
});

export default model("User", userSchema);

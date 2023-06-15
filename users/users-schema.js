import mongoose from "mongoose";
// Create a schema for users atlas collection
const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
  },
  { collection: "users" }
);
export default usersSchema;

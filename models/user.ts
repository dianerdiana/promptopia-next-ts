import { Schema, Document, model, models } from "mongoose";

interface UserDocument extends Document {
  email: string;
  username: string;
  image: string;
}

const UserSchema: Schema<UserDocument> = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model<UserDocument>("User", UserSchema);

export default User;

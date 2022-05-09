import { Schema, model } from "mongoose";

interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  friends?: Array<string>;
  avatar?: string;
  intro?: string;
}

const userSchema = new Schema<User>({
  name : {
    type: String,
    required: true,
  },
  username : {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [{
    type: String,
    default: [],
  }],
  avatar : {
    type : String,
    default: "",
  },
  intro: {
    type: String,
    default: "",
  }
},
{
  timestamps: true
});

const User = model<User>("user", userSchema);
export default User;
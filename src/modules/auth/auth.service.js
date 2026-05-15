import bcrypt from "bcryptjs";
import User from "../../models/user.model";

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exist");
  }
  const hashedPassword = await bcrypt.hash(password, 6);
  const user = User.create({
    name,
    email,
    password: hashedPassword,
  });
  return user;
};

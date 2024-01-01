import User from "../model/user.js";
import bcrypt from "bcrypt";

export const signupUser = async (request, response) => {
  let { email } = request.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return response.status(400).json({ msg: "User Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    user = {
      fname: request.body.fname,
      lname: request.body.lname,
      email: request.body.email,
      username: request.body.username,
      password: hashedPassword,
    };

    const newUser = new User(user);
    await newUser.save();

    return response.status(200).json({ msg: "Registration successfull" });
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Internal Server error, Try Again" });
  }
};

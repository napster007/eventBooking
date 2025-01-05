const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  
  createUser: async (args) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      const user = await User.findOne({ email: args.userInput.email });
      if (user) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const userData = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      try {
        const result = await userData.save();
        return { ...result._doc, password: null };
      } catch (err) {
        console.log(err);
        throw err;
      }
    } catch (err_1) {
      console.log(err_1);
      throw err_1;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
};

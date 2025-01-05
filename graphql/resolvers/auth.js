const bcrypt = require("bcryptjs");
const User = require("../../models/user");

module.exports = {
  createUser: async (args) => {
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
};

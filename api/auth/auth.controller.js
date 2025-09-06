const { userModel } = require("../../model/user.schema");
const { HandleGenericAPIError } = require("../../utils/controller.helper");
const { tokenHelper, tokenRemover } = require("../../utils/jwt.helper");
const bcrypt = require("bcrypt");

const userSignupController = async (req, res) => {
  try {
    const { email, password, name, confirmPassword } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        isSuccess: false,
        message: "User already exists",
        data: {},
      });
    }
    await userModel.create({ email, password, name, confirmPassword });

    res.status(201).json({
      isSuccess: true,
      message: "user is created",
      data: {},
    });
  } catch (err) {
    HandleGenericAPIError("signupController", res, err);
  }
};

const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user || !(await user.matchpassword(password))) {
    return res.status(400).json({
      isSuccess: false,
      message: "Invalid email or password ",
      data: {},
    });
  }
  tokenHelper(res, { email: user.email, _id: user._id, role: user.role });

  res.status(200).json({
    isSuccess: true,
    message: "login successfully",
    user: { email: user.email, _id: user._id },
  });
};

const userLogoutcontroller = async (req, res) => {
  tokenRemover(res);

  res.status(200).json({
    isSuccess: true,
    message: "logout successfully",
    data: {},
  });
};

module.exports = {
  userSignupController,
  userLoginController,
  userLogoutcontroller,
};

const { HandleGenericAPIError } = require("../../utils/controller.helper");

const userSignupValidator = (req, res, next) => {
  console.log("in signup");
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        isSuccess: false,
        message: "email ,name and password are required",
        data: {},
      });
    }
    next();
  } catch (err) {
    HandleGenericAPIError("signupValidator", res, err);
  }
};

const userLoginValidator = (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        isSuccess: false,
        message: "email and password is required",
        data: {},
      });
    }
    next();
  } catch (err) {
    HandleGenericAPIError("loginValidator", res, err);
  }
};

module.exports = { userSignupValidator, userLoginValidator };

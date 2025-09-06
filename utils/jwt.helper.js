const jwt = require("jsonwebtoken");
const { HandleGenericAPIError } = require("./controller.helper");

const tokenHelper = (res, data) => {
  try {
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("authorization", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
      httpOnly: true,
    });
  } catch (err) {
    HandleGenericAPIError("tokenHelper", res, err);
  }
};

const tokenRemover = (res) => {
  try {
    res.cookie("authorization", "", {
      maxAge: 0,
      secure: true,
      sameSite: "None",
      httpOnly: true,
    });
  } catch (err) {
    HandleGenericAPIError("tokenRemover", res, err);
  }
};

module.exports = { tokenHelper, tokenRemover };

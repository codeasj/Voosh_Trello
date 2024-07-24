import jwt from "jsonwebtoken";

const isUser = (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    // console.log({ token });
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = payload;
      // console.log({ payload });
    } catch (err) {
      console.error(err.message);
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default isUser;

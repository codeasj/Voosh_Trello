import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// Register a new user
export const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const fileName = req.files?.icon[0]?.filename;

    const token = jwt.sign(
      { data: email },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "10m",
      }
    );

    const data = await User.create({
      email,
      password: hashedPassword,
      icon: fileName,
      firstName,
      lastName,
    });

    await sendEmail(email, "Verify your mail ", token);
    res.status(201).json({
      status: "success",
      data,
      message:
        "User registered successfully!! check your mail for verification",
    });
  } catch (error) {
    next(error);
  }
};

//verify email
export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      async (err, decoded) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Expired link. Signup again" });
        }
        const { data } = decoded;
        const user = await User.findOne({ email: data });

        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }
        user.isVerified = true;
        await user.save();
        res.status(200).send(`
          <html>
            <head>
              <title>Account Verified</title>
            </head>
            <body>
              <h1>Your Account Has Been Verified Successfully.</h1>
              <br/>
              <a href="${process.env.CLIENT_URL}">Click here to go back to login page</a>
            </body>
          </html>
          `);
      }
    );
  } catch (error) {
    next(error);
  }
};

// Login a user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // console.log({ user });
    const payload = {
      email: user?.email,
      id: user?._id,
      entityId: user?.entityId,
    };

    if (await bcrypt.compare(password, user.hash)) {
      const accessToken = generateJwtToken(payload);
      user.hash = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true, //can't access from client side
      };

      if (!user.isVerified) {
        const token = jwt.sign(
          { data: email },
          process.env.JWT_ACCOUNT_ACTIVATION,
          {
            expiresIn: "10m",
          }
        );
        await sendMail(email, "Verify your mail", token);
        return res.status(400).json({
          message:
            "Email verification required!! Check your mail for verification link",
        });
      }

      res.cookie("token", accessToken, options).status(200).json({
        success: true,
        accessToken, //remove later
        user,
        message: "User logged in successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (err) {
    next(err);
  }
};

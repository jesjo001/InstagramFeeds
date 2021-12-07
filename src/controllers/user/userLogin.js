import User from "../../models/User";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const userLogin = async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) return res.status(400).send("email and password is required");

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      delete user.password;

      // user
      return res.status(200).json({
        _id: user.id,
        email: user.email,
        username: user.username,
        token: user.token
      });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error"
    });
  }
}

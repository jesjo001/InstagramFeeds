import User from "../../models/User";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    console.log("got here")

    if (!req.body) return res.status(400).send("User Email, password, first name, last name is required")

    const { username, first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && username)) {
        res.status(400).send("email, username and password is required");
    }

    try {
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
        // console.log(oldUser)

        if (oldUser) {
            return res.status(403).json({ message: "User Already Exist. Please Login", statusCode: 403 });
        }

        // check if username already taken
        // Validate if username exist in our database
        const usernameExist = await User.exists({ username });

        if (usernameExist) return res.status(403).json({
            status: 403,
            message: "Username already taken"
        })

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            username,
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "24h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            statusCode: 500,
            message: "Internal server error"
        })
    }
}

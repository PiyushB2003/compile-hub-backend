import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const SignupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exist, you can login", success: false })
        }
        const newUser = new User({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(200).json({ message: "Signup successful", success: true })

    } catch (error) {
        console.log("Error while signup ", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const msg = "Invalid email or password";

        if (!user) {
            return res.status(401).json({ message: msg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(401).json({ message: msg, success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        return res.status(200).json(
            {
                message: "Logged In successful",
                success: true,
                jwtToken,
                email,
                name: user.name,
                userId: user._id
            }
        )
    } catch (error) {
        console.log("Server error", error);
        return res.status(500).json({ message: "Internal server error", success: false })
    }
}

export {SignupController, LoginController};
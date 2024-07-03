import bcrypt from 'bcrypt';
import users from '../Model/user.model.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(12);  // Use a stronger salt round value for better security
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new users({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        generateTokenAndSetCookie(newUser._id, res);  // Ensure this function correctly generates and sets the JWT in cookies

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find the user by email
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate JWT token and set cookie
        generateTokenAndSetCookie(user._id, res);

        // Send success response with user information
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        // Handle errors
        console.error('Error during login:', error);
        res.status(500).json({ error: "Server error" });
    }
};


export const logout = (req, res) => {
    try {
        // Clear JWT token cookie
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        // Handle errors
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
 
export const update = async (req, res) => {
    try {
        const { name, userId, email, oldPassword, newPassword } = req.body;

        if (!userId || !email || !oldPassword || !newPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await users.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password || "");
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Old password doesn't match the credentials" });
        }

        let hashedPassword = user.password;
        if (newPassword && newPassword !== oldPassword) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(newPassword, salt);
        }

        const updatedUser = await users.findOneAndUpdate(
            { _id: userId },
            { name, email, password: hashedPassword },
            { new: true }
        );

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

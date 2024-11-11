const User = require('../models/User');
const bcrypt = require('bcrypt');


function isStrongPassword(password) {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}


exports.createUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ message: "All fields are required" });
    if (!isStrongPassword(password)) {
        return res.status(400).json({ message: "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ fullName, email, password: hashedPassword });
        res.status(201).json({ message: "User created successfully", userId: newUser._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.editUser = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (fullName) user.fullName = fullName;
        if (password) {
            if (!isStrongPassword(password)) {
                return res.status(400).json({ message: "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character" });
            }
            user.password = await bcrypt.hash(password, 10);
        }
        await user.save();
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOneAndDelete({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 获取所有用户
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'fullName email');
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.uploadImage = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded or invalid file type" });
    
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        user.imagePath = req.file.path;
        await user.save();
        res.status(200).json({ message: "Image uploaded successfully", filePath: req.file.path });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
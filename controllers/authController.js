import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
//generate token


export const registerUser = async (req, res) => {
    const { fullName, email, password, profileImgUrl } = req.body;

    //validate fields
    if (!fullName || !email || !password) {
        throw new Error("Please fill required fields")
    }


    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        //check if email exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error("Email already exists")
        }

        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
            profileImgUrl:profileImgUrl
        })

        res.status(201).json({
            message: "user created successfully",
            success: true,
            error: false,
            data: user,
            // id: user._id,
            // token: generatetoken(user._id)
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("user does not exist")
        }
        if (!password) {
            throw new Error("please provide password")
        }

        const generatetoken = (id) => {
            return jwt.sign({ id: user._id, email:user.email }, process.env.JWT_SECRET, { expiresIn: "3h" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            // const token = generatetoken(user._id)
            res.status(201).json({
                success: true,
                message: "Login successful",
                data: user,
                token: generatetoken(user._id),
                error: false
            });

        } else {
            throw new Error("Invalid credentials")
        }


    }
    catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId)

        if(!user){
            throw new Error("user not found")
        }

        res.status(200).json({
            success:true,
            error:false,
            message:"user details success",
            data: user
        })
        
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

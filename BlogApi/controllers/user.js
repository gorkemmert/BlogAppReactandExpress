import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({
            message:error.message,
        });
    }
}

export const getSingleUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({
            message:error.message,
        });
    }
}

export const createUser = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10)
    const body = {...req.body, password: hash }

    try {
        const response = await User.create(body)
        if(response){
            res.status(201).json(body)
        }
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const post = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, post, {new: true});
        res.json(updatedUser)
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        
        const response = await User.findByIdAndDelete(id)
        res.json(response)
        
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}


export const loginUser = async (req, res) => {
    const userName = req.body.name
    const userPassword = req.body.password
    const user = await User.findOne({name:userName})

    try {
        if(user){
            const isUser = await bcrypt.compare(userPassword, user.password)
            if(isUser){
                const payload = { userId : user._id, loginDate: Date.now, userName: user.name};
                const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 7200})
                res.json({access_token: token , expiresIn: 7200})
            } else {
                res.json({message: "girdiğiniz kullanıcı ve şifre yanlıştır"})
            }
             
        }else {
            res.send("user not found")
        }
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/user.models.js';
import {inngest} from '../inngest/client.inngest.js';

export const signup = async(req, res) => {
    const {email, password, skills = [], role} = req.body;
    
    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPassword,
            skills,
            role
        });

        //FIRE Inngest
        await inngest.send({
            name: "user/signup",
            data: {email},
        });

        const token = jwt.sign(
            {_id: user.id, role: user.role},
            process.env.JWT_SECRET
        );

        res.json({user, token});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: `Signup failed`, details: error.details});
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body;
    
    try {

        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({error: `User not found!`});
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if(!isMatched) {
            return res.status(401).json({error: `Invalid credentials`})
        }

        const token = jwt.sign(
            {_id: user.id, role: user.role},
            process.env.JWT_SECRET
        );

        res.json({user, token});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: `Login failed`, details: error.details});
    }
}

export const logout = async(req, res) => {
    
    try {

        const token = req.headers.authorization.split(" ")[1];

        if(!token) {
            return res.status(401).json({error: `Unauthorized!!`});
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                return res.status(401).json({error: `Unauthorized!!`});
            }
            res.json({message: `Logout Success`});
        })

    } catch (error) {
        res.status(500).json({error: `Logout failed`, details: error.details});
    }
}

export const updateUser = async(req, res) => {
    const {email, role, skills = []} = req.body;

    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({error: `Forbidden access`});
        }

        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({error: `User not found`}); 
        }

        await User.updateOne(
            { email },
            {
                skills: skills.length ? skills : user.skills,
                role
            }
        );

        return res.json({message: `Update successful`});

    } catch (error) {
        console.error(error);
        return res.status(500).json({error: `Update failed`, details: error.details});
    }
}

export const getUsers = async(req, res) => {
    try {
        
        if(req.user.role !== "admin") {
            return res.status(403).json({error: `Forbidden access`});
        }

        const users = await User.find().select("-password");

        return res.json(users);

    } catch (error) {
        res.status(500).json({error: `Getting users failed`, details: error.details});
    }
}
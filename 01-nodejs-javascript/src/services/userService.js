const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUserService = async (name, email, password) => {
    try {
        // check email unique?
        const existEmail = await User.findOne({
            email: email
        })
        if(existEmail) {
            console.log(">>>> exist email");
            return null;
        }

        // hash user password
        const hassPassword = await bcrypt.hash(password, 10)

        // save user with hassed password
        let result = await User.create({
            name: name,
            email: email,
            password: hassPassword,
            role: "Quang Nguyen"
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {
        // fetch user by email
        const user = await User.findOne({
            email: email
        })

        if(user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
                return {
                    EC: 2,
                    EM: "Email/Password invalid"
                }
            } else {
                // create an access token
                const payload = {
                    email: user.email,
                    name: user.name
                }
                const accessToken = jwt.sign(
                    payload, 
                    process.env.JWT_SECRET, 
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                );
                return {
                    EC: 0,
                    accessToken,
                    user: {
                        name: user.name,
                        email: user.email
                    }
                }
            }
        } else {
            return {
                EC: 1,
                EM: "Email/Password not found"
            }
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserListService = async () => {
    try {
        // save user with hassed password
        let result = await User.find({}).select("-password")
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService, loginService, getUserListService
}
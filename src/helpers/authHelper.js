import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ResponseError from "../exception/responseError.js";

export const hashPassword = async (password, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        next(error);
    }
}

export const checkPassword = async (inputPassword, hashPassword, next) => {
    try {
        const isMatch = await bcrypt.compare(inputPassword, hashPassword);
        return isMatch;
    } catch (error) {
        next(error);
    }
}

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(token == null) throw new ResponseError("Authentication failed!", 401);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) throw new ResponseError("Token is expired!", 403);

            req.user = decoded;
            next();
        });

    } catch (error) {
        next(error);

    }
};

export const getAccessToken = (user, next) => {
    try {
        const id = user.id;
        const email = user.email;
        const username = user.username;
        const accessToken = user.token;
        const expiredToken = user.expiredToken;
    
        console.info(user.refreshToken);
    
        return jwt.sign(
            { id, email, username },
            accessToken,
            { expiresIn: expiredToken }
        );
    } catch (error) {
        next(error);
    }
};

export const getRefreshToken = (user, next) => {
    try {
        const id = user.id;
        const email = user.email;
        const username = user.username;
        const refreshToken = user.token;
        const expiredToken = user.expiredToken;
    
        return jwt.sign(
            { id, email, username },
            refreshToken,
            { expiresIn: expiredToken }
        );

    } catch (error) {
        next(error);

    }
};

export const sessionData = (req, res, next) => {
    try {
        req.session = {
            userId: req.user.id,
            username: req.user.username,
            email: req.user.email
        };

        next();

    } catch (error) {
        next(error);

    }
};
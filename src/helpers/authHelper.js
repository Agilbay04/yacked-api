import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorResponse } from "../helpers/responseHelper.js";

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        errorResponse(res, 500, "Hashing password failed", error);
    }
}

export const checkPassword = async (inputPassword, hashPassword) => {
    try {
        const isMatch = await bcrypt.compare(inputPassword, hashPassword);
        return isMatch;
    } catch (error) {
        errorResponse(res, 500, "Error check password!", error);
    }
}

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(token == null) return errorResponse(res, 401, "Authentication failed!");

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) return errorResponse(res, 403, "Token is expired!");

            req.user = decoded;
            next();
        });

    } catch (error) {
        errorResponse(res, 500, "Verify token is failed!", error);
    }
};

export const getAccessToken = (user) => {
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
        errorResponse(res, 500, "Get access token failed!", error);
    }
};

export const getRefreshToken = (user) => {
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
        errorResponse(res, 500, "Get refresh token is failed!", error);

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
        errorResponse(res, 500, "Failed to save session!", error);

    }
};
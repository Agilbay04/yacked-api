import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { createUserData, getUserDataByUsername } from "../../services/userService.js";
import { successResponse, errorResponse } from "../../helpers/responseHelper.js";
import { 
    getAccessToken, 
    getRefreshToken, 
    checkPassword 
} from "../../helpers/authHelper.js";
import { 
    deleteUserTokenData, 
    getUserDataByToken, 
    updateUserToken 
} from "../../services/authService.js";

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return errorResponse(res, 400, "Validation error!", errors.array());

        const { username, password } = req.body;

        const user = await getUserDataByUsername(username);

        if (!user) return errorResponse(res, 400, "Wrong username or password!");

        const { id, email, username: uname } = user;

        const isPasswordMatch = await checkPassword(password, user.password);

        if (isPasswordMatch) {
            const accessToken = getAccessToken({
                id: id,
                email: email,
                username: uname,
                token: process.env.ACCESS_TOKEN_SECRET,
                expiredToken: process.env.ACCESS_TOKEN_EXPIRES
            });

            const refreshToken = getRefreshToken({
                id: id,
                email: email,
                username: uname,
                token: process.env.REFRESH_TOKEN_SECRET,
                expiredToken: process.env.REFRESH_TOKEN_EXPIRES
            })
            
            await updateUserToken(id, refreshToken)

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            const data = {
                username: uname,
                access_token: accessToken 
            };

            successResponse(res, 200, `Login success! hello ${user.username}`, data);
        } else {
            errorResponse(res, 400, "Wrong username or password!");
        }
        
    } catch (error) {
        errorResponse(res, 500, "Login failed!", error);

    }
};

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
    
        if (!refreshToken) return errorResponse(res, 204, "No content available!");
    
        const user = await getUserDataByToken(refreshToken);
    
        if (!user) return errorResponse(res, 404, "User data not found!");
        
        await deleteUserTokenData(user.user_id);
    
        res.clearCookie('refreshToken');
    
        return successResponse(res, 200, "Logout success!");
    } catch (error) {
        errorResponse(res, 500, "Logout failed!", error);
    }
};

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return errorResponse(res, 400, "Validation error!", errors.array());

        const newUser = req.body;
    
        await createUserData(newUser);
    
        return successResponse(res, 201, "Registration account success!");

    } catch (error) {
        errorResponse(res, 500, "Registration user failed!", error.message);
    }
};

export const token = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
    
        if (!refreshToken) return errorResponse(res, 401, "Authentication failed!");
    
        const user = await getUserDataByToken(refreshToken);
    
        if (!user) return errorResponse(res, 403, "Forbidden access!");
        
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            if (err) return errorResponse(res, 403, "Forbidden access!");
            const { id, email, username } = user.user;

            const accessToken = getAccessToken({
                id: id,
                email: email,
                username: username,
                token: process.env.ACCESS_TOKEN_SECRET,
                expiredToken: '15s'
            });
            
            const data = {
                username: username,
                accessToken: accessToken 
            };

            return successResponse(res, 200, "Success generate refresh token!", data); 
        });
    } catch (error) {
        errorResponse(res, 500, "Failed to generate refresh token!");
    }
};
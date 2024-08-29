import jwt from "jsonwebtoken";
import ResponseError from "../../../exception/responseError.js";
import { validationResult } from "express-validator";
import { createUserData, getUserDataByUsername } from "../../../services/userService.js";
import { apiResponse } from "../../../middlewares/apiResponse.middleware.js";
import { 
    getAccessToken, 
    getRefreshToken, 
    checkPassword 
} from "../../../helpers/authHelper.js";
import { 
    deleteUserTokenData, 
    getUserDataByToken, 
    updateUserToken 
} from "../../../services/authService.js";

export const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return next(errors);
        
        const { username, password } = req.body;

        const user = await getUserDataByUsername(username);
        if (!user) throw new ResponseError("Wrong username or password!", 400);

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

            apiResponse(res, 200, `Login success! hello ${user.username}`, data);
        } else {
            throw new ResponseError("Wrong username or password!", 400);
        }
        
    } catch (error) {
        next(error);

    }
};

export const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throwError("No content available!", 204);
    
        const user = await getUserDataByToken(refreshToken);
        if (!user) throwError("User data not found!", 404);
        
        const deleted = await deleteUserTokenData(user.user_id);
        if (!deleted) throwError("Fail to logout!", 400);

        res.clearCookie('refreshToken');
    
        return apiResponse(res, 200, "Logout success!");

    } catch (error) {
        next(error);

    }
};

export const register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return next(errors);

        const newUser = req.body;
    
        await createUserData(newUser);

        return apiResponse(res, 201, "Registration account success!");

    } catch (error) {
        next(error);
    
    }
};

export const token = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new ResponseError("Authentication failed!", 401);
    
        const user = await getUserDataByToken(refreshToken);
        if (!user) throw new ResponseError("Forbidden access!", 403);
        
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            if (err) return throwError("Forbidden access!", 403);
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

            return apiResponse(res, 200, "Success generate refresh token!", data); 
        });

    } catch (error) {
        next(error);

    }
};
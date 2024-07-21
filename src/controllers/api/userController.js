import { errorResponse, successResponse } from "../../helpers/responseHelper.js";
import { 
    getUsersData, 
    getUserDataById, 
    updateUserData, 
    deleteUserData 
} from "../../services/userServices.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await getUsersData();

        if (users.length === 0) return errorResponse(res, 404, "Users data is not found!");

        return successResponse(res, 200, "Success get users data!", users, users.length);

    } catch (error) {
        errorResponse(res, 500, "Failed to get users data!");

    }
};

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await getUserDataById(id);

        if (!user) return errorResponse(res, 404, "User data is not found!");

        return successResponse(res, 200, "Success get user data!", user);
    
    } catch (error) {
        errorResponse(res, 500, "Failed to get user data!");

    }
};

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const user = await getUserDataById(id);

        console.info(id);
    
        if (!user) return errorResponse(res, 404, "Fail to update data, user data not found!");

        await updateUserData(data, id);

        return successResponse(res, 200, `Success update user data ${user.full_name}!`);

    } catch (error) {
        errorResponse(res, 500, "Error update user data!", error);

    }
};

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getUserDataById(id);
        
        if (!user) return errorResponse(res, 404, "Fail to delete data, user data not found!");

        await deleteUserData(id);

        return successResponse(res, 200, "Success delete user data!");

    } catch (error) {
        errorResponse(res, 500, "Failed delete user data!", error);;
    }
}

export const testCheckSession = (req, res) => {
    const data = req.user;
    res.send(data);
};
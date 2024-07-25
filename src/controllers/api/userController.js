import { apiResponse, throwError } from "../../middlewares/apiResponse.js";
import { 
    getUsersData, 
    getUserDataById, 
    updateUserData, 
    deleteUserData 
} from "../../services/userService.js"

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getUsersData();

        if (users.length === 0) throwError("Users data is not found!", 404);

        return apiResponse(res, 200, "Success get users data!", users);

    } catch (error) {
        next(error);

    }
};

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await getUserDataById(id);
        if (!user) throwError("User data not found!", 404);

        return apiResponse(res, 200, "Success get user data!", user);
    
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const user = await getUserDataById(id); 
        if (!user) throwError("Fail to update data, user data not found!", 404);

        const updated = await updateUserData(data, id);
        if (!updated) throwError("Failed to update data", 400);

        return apiResponse(res, 200, `Success update user data ${user.full_name}!`);

    } catch (error) {
        next(error);

    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await getUserDataById(id);
        if (!user) throwError("Fail to delete data, user data not found!", 404);

        const deleted = await deleteUserData(id);
        if (!deleted) throwError("Failed to delete data", 400);

        return apiResponse(res, 200, "Success delete user data!");

    } catch (error) {
        next(error);
    }
}

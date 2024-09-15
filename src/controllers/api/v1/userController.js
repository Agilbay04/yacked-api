import ResponseError from "../../../exception/responseError.js";
import { decryptData, encryptData } from "../../../helpers/authHelper.js";
import { apiResponse } from "../../../middlewares/apiResponse.middleware.js";
import { apiResponseV2 } from "../../../middlewares/apiResponseV2.middleware.js";
import { 
    getUsersData, 
    getUserDataById, 
    updateUserData, 
    deleteUserData 
} from "../../../services/userService.js"

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getUsersData();

        const jsonData = apiResponseV2(200, "Success get users data!", users);
        const responseEncrypt = encryptData(jsonData);
        const responseDecrypt = decryptData(responseEncrypt);
        
        return res.status(jsonData.statusCode).send({ 
            response: responseEncrypt 
        });

        // return res.status(jsonData.statusCode).send({ 
        //     response: responseDecrypt 
        // });

    } catch (error) {
        next(error);

    }
};

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await getUserDataById(id);
        if (!user) throw new ResponseError("User data not found!", 404);

        const jsonData = apiResponseV2(200, "Success get user data!", user);
        const responseEncrypt = encryptData(jsonData);
        const responseDecrypt = decryptData(responseEncrypt);

        // return res.status(jsonData.statusCode).send({ 
        //     response: responseEncrypt 
        // });

        return res.status(responseDecrypt.statusCode).send({ 
            response: responseDecrypt
        });
    
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const user = await getUserDataById(id); 
        if (!user) throw new ResponseError("Fail to update data, user data not found!", 404);

        const updated = await updateUserData(data, id);
        if (!updated) throw new ResponseError("Failed to update data", 400);

        return apiResponse(res, 200, `Success update user data ${user.full_name}!`);

    } catch (error) {
        next(error);

    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await getUserDataById(id);
        if (!user) throw new ResponseError("Fail to delete data, user data not found!", 404);

        const deleted = await deleteUserData(id);
        if (!deleted) throw new ResponseError("Failed to delete data", 400);

        return apiResponse(res, 200, "Success delete user data!");

    } catch (error) {
        next(error);
    }
}

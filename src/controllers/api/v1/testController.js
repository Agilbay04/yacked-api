import { generateKey } from "../../../helpers/authHelper.js";
import { apiResponse } from "../../../middlewares/apiResponse.middleware.js";

export const genBase64Key = async (req, res, next) => {
    try {
        const secretKey = generateKey();
        apiResponse(res, 200, "Success create secret key", secretKey);
    } catch (error) {
        next(error);
    }
}

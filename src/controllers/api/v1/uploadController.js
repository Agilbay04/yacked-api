import ResponseError from "../../../exception/responseError.js";
import { apiResponse } from "../../../middlewares/apiResponse.middleware.js";
import { uploadConfig, deleteFile } from "../../../helpers/fileHelper.js";
import { 
    deleteAvatarUser, 
    getAvatarUser, 
    updateAvatarUser, 
    uploadAvatarUser 
} from "../../../services/fileService.js";

const upload = uploadConfig.single('avatar');

export const uploadAvatar = async (req, res, next) => {
    upload(req, res, async err => {
        if (err) {
            return new ResponseError(err.message, 400);
        }

        try {
            const request = req;
            const user = req.user;

            const file = request.file;
            if (!file) throw new ResponseError("No file uploaded!", 400);
            
            const getAvatar = await getAvatarUser(user.id);
            if(getAvatar) {
                await deleteFile(getAvatar.avatar_url);
                const avatar = {
                    id: getAvatar.id,
                    avatar_url: file.path,
                    deleted: 0
                };
                await updateAvatarUser(avatar);
                // await deleteAvatarUser(getAvatar.id);
            } else {
                const newAvatar =  {
                    user_id: user.id,
                    avatar_url: file.path,
                };
                const uploadAvatar = await uploadAvatarUser(newAvatar);
                if(!uploadAvatar) {
                    await deleteFile(file.path);
    
                    return new ResponseError('Failed to upload avatar!', 400);
                }
            }
            
            return apiResponse(res, 200, "Success upload avatar!");

        } catch (error) {
            await deleteFile(file.path);
            next(error);

        }

    });

};

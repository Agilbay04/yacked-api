import { apiResponse, throwError } from "../../middlewares/apiResponse.js";
import { uploadConfig, deleteFile } from "../../helpers/fileHelper.js";
import { 
    deleteAvatarUser, 
    getAvatarUser, 
    updateAvatarUser, 
    uploadAvatarUser 
} from "../../services/fileService.js";

const upload = uploadConfig.single('avatar');

export const uploadAvatar = async (req, res, next) => {
    upload(req, res, async err => {
        if (err) {
            return throwError(err.message, 400);
        }

        try {
            const request = req;
            const user = req.user;

            const file = request.file;
            if (!file) throwError("No file uploaded!", 400);
            
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
    
                    return throwError('Failed to upload avatar!', 400);
                }
            }
            
            return apiResponse(res, 200, "Success upload avatar!");

        } catch (error) {
            await deleteFile(file.path);
            next(error);

        }

    });

};

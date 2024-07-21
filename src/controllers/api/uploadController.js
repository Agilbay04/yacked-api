import { errorResponse, successResponse } from "../../helpers/responseHelper.js";
import { uploadConfig, deleteFile } from "../../helpers/fileHelper.js";
import { 
    deleteAvatarUser, 
    getAvatarUser, 
    updateAvatarUser, 
    uploadAvatarUser 
} from "../../services/fileService.js";

const upload = uploadConfig.single('avatar');

export const uploadAvatar = async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            return errorResponse(res, 400, err.message, err);
        }

        try {
            const request = req;
            const user = req.user;

            const file = request.file;
            if (!file) return errorResponse(res, 400, "No file uploaded!");
            
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
    
                    return errorResponse(res, 400, 'Failed to upload avatar!');
                }
            }
            
            return successResponse(res, 200, "Success upload avatar!");

        } catch (error) {
            await deleteFile(file.path);
            return errorResponse(res, 500, "Failed to upload avatar!", error.message);

        }
    });
};

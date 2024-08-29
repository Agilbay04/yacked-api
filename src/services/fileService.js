import { currentDate } from "../helpers/dateHelper.js";
import { db } from "../helpers/dbHelper.js";

export const uploadAvatarUser = async (newAvatar) => {
    try {
        return await db.avatar.create({
            data: {
                user_id: newAvatar.user_id,
                avatar_url: newAvatar.avatar_url
            }
        });
    } catch (error) {
        console.error("Failed to upload avatar!", error);
        throw error;
    }
}

export const getAvatarUser = async (userId) => {
    try {
        return await db.avatar.findFirst({
            where: { user_id: userId, deleted: 0 },
            select: {
                id: true,
                avatar_url: true,
                user_id: true,
                user: {
                    select: { username: true }
                }
            }
        });
    } catch (error) {
        console.error("Failed to get avatar user!", error);
        throw error;
    }
};

export const updateAvatarUser = async (avatar) => {
    try {
        return await db.avatar.update({
            where: { id: avatar.id },
            data: {
                avatar_url: avatar.avatar_url, 
                deleted: avatar.deleted, 
                updated_at: currentDate() 
            }
        })
    } catch (error) {
        console.error("Failed to update avatar user!", error);
        throw error;
    }
};

export const deleteAvatarUser = async (avatar_id) => {
    try {
        return await db.avatar.delete({
            where: { id: avatar_id }
        });
    } catch (error) {
        console.error("Failed to delete avatar user!", error);
        throw error;
    }
}
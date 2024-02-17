import { db } from "../helpers/dbHelper.js"

export const updateUserToken = async (id, refreshToken) => {
    try {
        const currentDate = new Date().toJSON();

        await db.token.upsert({
            where: {
                user_id: id
            },
            update: {
                token: refreshToken,
                updated_at: currentDate
            },
            create: {
                user_id: id,
                token: refreshToken,
            }
        });

    } catch (error) {
        console.error("Failed to udate user token!", error);

    }
};

export const getUserDataByToken = async (refreshToken) => {
    try {
        return await db.token.findFirst({
            where: {
                token: refreshToken
            },
            include: {
                user: {
                    select: { id: true, email: true, username: true }
                }
            }
        });

    } catch (error) {
        console.error("Failed to get user data!", error);

    }
};

export const deleteUserTokenData = async (id) => {
    try {
        return await db.token.update({
            where: {
                user_id: id
            },
            data: {
                token: null
            }
        });

    } catch (error) {
        console.error("Failed to delete user token!", error);
    
    }
};
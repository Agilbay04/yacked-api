import { hashPassword } from "../helpers/authHelper.js";
import { db } from "../helpers/dbHelper.js";
import constants from "../utils/constants.js";
import { currentDate, localDate } from "../helpers/dateHelper.js";

export const getUsersData = async () => {
    try {
        const users = (await db.user.findMany({
            where: { deleted: constants.DELETED_FALSE }
        })).map(x => {
            return {
                id: x.id,
                fullName: x.full_name,
                email: x.email,
                username: x.username,
                cretedAt: localDate(x.created_at),
                updatedAt: localDate(x.updated_at)
            };
        });

        return users

    } catch (error) {
        console.error("Failed get users data!", error);
    
    }
};

export const getUserDataById = async (id) => {
    try {
        let user = (await db.user.findFirst({
            where: { id: id, deleted: constants.DELETED_FALSE }
        }));

        return user = {
            id: user.id,
            fullName: user.full_name,
            email: user.email,
            username: user.username,
            createdAt: localDate(user.created_at),
            updatedAt: localDate(user.updated_at),
        };

    } catch (error) {
        console.error("Failed to get user data!", error);

    }
};

export const updateUserData = async (data, id) => {
    try {
        return await db.user.update({
            data: {
                full_name: data.full_name,
                updated_at: currentDate(),
                updated_by: data.updated_by
            },
            where: {
                id: id
            }
        });
        
    } catch (error) {
        console.error("Failed to update user data!", error)
    }
};

export const deleteUserData = async (id) => {
    try {
        return await db.user.delete({
            where: {
                id: id
            }
        });

    } catch (error) {
        console.error("Failed to delete user data!", error);

    }
};

export const getUserDataByUsername = async (username) => {
    try {
        const user = await db.user.findUnique({
            where: {
                username: username
            }
        });

        return user;
        
    } catch (error) {
        console.error("Failed to get user data!", error);
    }
};

export const createUserData = async (newUser) => {
    try {
        return await db.user.create({
            data: {
                full_name: newUser.full_name,
                email: newUser.email,
                username: newUser.username,
                password: await hashPassword(newUser.password),
                created_by: newUser.created_by,
                updated_by: newUser.updated_by,
                deleted: newUser.deleted
            }
        });

    } catch (error) {
        console.error("Failed to create user data!", error);

    }
}
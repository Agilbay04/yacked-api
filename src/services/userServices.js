import { hashPassword } from "../helpers/authHelper.js";
import { db } from "../helpers/dbHelper.js";

export const getUsersData = async () => {
    try {
        const users = await db.user.findMany({
            select: {
                id: true,
                full_name: true,
                email: true,
                username: true,
                created_at: true,
                updated_at: true
            }
        });

        return users

    } catch (error) {
        console.error("Failed get users data!", error);
    
    }
};

export const getUserDataById = async (id) => {
    try {
        const user = await db.user.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                full_name: true,
                email: true,
                username: true,
                created_at: true,
                updated_at: true
            }
        });
    
        return user

    } catch (error) {
        console.error("Failed to get user data!", error);

    }
};

export const updateUserData = async (data, id) => {
    try {
        const currentDate = new Date().toJSON();
        
        return await db.user.update({
            data: {
                full_name: data.full_name,
                updated_at: currentDate,
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
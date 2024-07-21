import { db } from "../helpers/dbHelper.js";

export const likePostData = async (likePost) => {
    try {
        return await db.like.create({
            data: {
                like: likePost.like,
                user_id: likePost.user_id,
                post_id: likePost.post_id
            }
        });

    } catch (error) {
        new Error("Failed to liked post!");

    }
};

export const getLikeByUserAndPost = async (data) => {
    try {
        return await db.like.findFirst({
            where: {
                AND: [
                    {
                        user_id: data.user_id
                    },
                    {
                        post_id: data.post_id
                    }
                ]
            },
            select: {
                id: true,
                user_id: true,
                post_id: true,
                created_at: true,
                updated_at: true
            }
        });

    } catch (error) {
        new Error('Failed to get like data!');

    }
};

export const getLikeById = async (id) => {
    try {
        return await db.like.findFirst({
            where: { id: id }, 
            select: {
                id: true,
                user_id: true,
                post_id: true,
                created_at: true,
                updated_at: true
            }
        });

    } catch (error) {
        new Error("Failed to get like data!");

    }
};

export const deleteLike = async (id) => {
    try {
        return await db.like.delete({
            where: { id: id }
        });

    } catch (error) {
        new Error("Failed to delete like!");

    }
}

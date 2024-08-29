import { db } from "../helpers/dbHelper.js";
import constants from "../utils/constants.js";

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
        console.error("Failed to liked post!", error);
        throw error;
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
        console.error("Failed to get like data!", error);
        throw error;
    }
};

export const likeCommentData = async (likeComment) => {
    try {
        return await db.like.create({
            data: {
                like: likeComment.like,
                user_id: likeComment.user_id,
                comment_id: likeComment.comment_id
            }
        });

    } catch (error) {
        console.error("Failed to liked comment!", error);
        throw error;
    }
};

export const getLikeByUserAndComment = async (data) => {
    try {
        return await db.like.findFirst({
            where: {
                AND: [
                    {
                        user_id: data.user_id
                    },
                    {
                        comment_id: data.comment_id
                    }
                ]
            },
            select: {
                id: true,
                user_id: true,
                comment_id: true,
                created_at: true,
                updated_at: true
            }
        });

    } catch (error) {
        console.error("Failed to get like data!", error);
        throw error;
    }
};

export const getLikeById = async (id) => {
    try {
        return await db.like.findFirst({
            where: { id: id, deleted: constants.DELETED_FALSE }, 
            select: {
                id: true,
                user_id: true,
                post_id: true,
                comment_id: true,
                created_at: true,
                updated_at: true
            }
        });

    } catch (error) {
        console.error("Failed to get like data!", error);
        throw error;
    }
};

export const deleteLike = async (id) => {
    try {
        return await db.like.delete({
            where: { id: id }
        });

    } catch (error) {
        console.error("Failed to delete like!", error);
        throw error;
    }
}

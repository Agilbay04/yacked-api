import  { db } from "../helpers/dbHelper.js";
import { currentDate } from "../helpers/dateHelper.js";

export const createCommentData = async (data) => {
    try {
        return await db.comment.create({
            data: {
                comment: data.comment,
                post_id: data.postId,
                user_id: data.userId,
                deleted: 0
            }
        });

    } catch (error) {
        console.error("Failed to create comment!", error);

    }
};

export const getCommentDataByPostId = async (id) => {
    try {
        return await db.comment.findMany({
            where: {
                post_id: id
            },
            include: {
                user: {
                    select: { username: true, full_name: true }
                }
            }
        });

    } catch (error) {
        console.error("Failed to get comments!", error);

    }
};

export const getCommentDataById = async (id) => {
    try {
        return await db.comment.findFirst({
            where: {
                id: id
            },
            include: {
                user: {
                    select: { username: true, full_name: true }
                }
            }
        })

    } catch (error) {
        console.error("Failed to get comment!");

    }
};

export const updateCommentData = async (data, id) => {
    try {
        return await db.comment.update({
            where: {
                id: id
            },
            data: {
                comment: data.comment,
                updated_at: currentDate()
            }
        });

    } catch (error) {
        console.error("Failed to update comment!", error);

    }
};

export const deleteCommentData = async (id) => {
    try {
        return await db.comment.delete({
            where: {
                id: id
            }
        });

    } catch (error) {
        console.error("Failed to delete comment!", error);
    
    }
};
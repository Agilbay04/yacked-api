import  { db } from "../helpers/dbHelper.js";
import { currentDate, localDate } from "../helpers/dateHelper.js";
import constants from "../utils/constants.js";

export const createCommentData = async (data) => {
    try {
        return await db.comment.create({
            data: {
                comment: data.comment,
                post_id: data.postId,
                user_id: data.userId,
                deleted: constants.DELETED_FALSE
            }
        });

    } catch (error) {
        console.error("Failed to create comment!", error);

    }
};

export const getCommentDataByPostId = async (id) => {
    try {
        let comments = (await db.comment.findMany({
            where: { post_id: id, deleted: constants.DELETED_FALSE },
            include: { user: true }
        })).map(x => {
            return {
                id: x.id,
                comment: x.comment,
                userId: x.user_id,
                username: x.user.username,
                createdAt: localDate(x.created_at),
                updatedAt: localDate(x.updated_at)
            };
        });

        return comments;

    } catch (error) {
        console.error("Failed to get comments!", error);

    }
};

export const getCommentDataById = async (id) => {
    try {
        let comment = await db.comment.findFirst({
            where: { id: id, deleted: constants.DELETED_FALSE },
            include: { user: true }
        });

        return comment = {
            id: comment.id,
            comment: comment.comment,
            userId: comment.user_id,
            username: comment.user.username,
            createdAt: localDate(comment.created_at),
            updatedAt: localDate(comment.updated_at)
        };

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
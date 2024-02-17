import { db } from "../helpers/dbHelper.js";
import { currentDate } from "../helpers/dateHelper.js";

export const getPostDataByUserId = async (userId) => {
    try {
        return await db.post.findMany({
            where: {
                user_id: userId,
                deleted: 0
            },
            include: {
                user: {
                    select: { username: true, full_name: true }
                },
            },
            include: {
                comment: {
                    include: {
                        user: {
                            select: { username: true, full_name: true }
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error("Failed to get post data!", error);
    }
};

export const createPostData = async (newPost) => {
    try {
        return await db.post.create({
            data: {
                post: newPost.post,
                user_id: newPost.userId,
                deleted: newPost.deleted
            }
        });

    } catch (error) {
        console.error("Failed to create new post!", error);

    }
};

export const getPostDataById = async (id) => {
    try {
        return await db.post.findFirst({
            where: {
                id: id
            },
            include: {
                user: {
                    select: { username: true, full_name: true }
                }
            }
        });

    } catch (error) {
        console.error("Failed to get post data!", error);
    }
};

export const updatePostData = async (data, id) => {
    try {
        return await db.post.update({
            where: {
                id: id
            },
            data: {
                post: data.post,
                updated_at: currentDate()
            }
        });

    } catch (error) {
        console.error("Failed to update post!", error);

    }
};

export const deletePostData = async (id) => {
    try {
        return await db.post.delete({
            where: {
                id: id
            }
        });

    } catch (error) {
        console.error("Failed to delete post!", error);

    }
};
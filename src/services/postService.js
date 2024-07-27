import { db } from "../helpers/dbHelper.js";
import { currentDate, localDate } from "../helpers/dateHelper.js";
import constants from "../utils/constants.js";

export const getPostDataByUserId = async (userId) => {
    try {
        return (await db.post.findMany({
            where: { user_id: userId, deleted: constants.DELETED_FALSE  },
            include: { 
                user: true, 
                comment: { include: { user: true } }, 
                like: { include: { user: true } } 
            }
        })).map(x => {
            return {
                id: x.id,
                post: x.post,
                userId: x.user_id,
                username: x.user.username,
                createdAt: localDate(x.created_at),
                updatedAt: localDate(x.updated_at),
                comments: x.comment.map(x => {
                    return {
                        id: x.id,
                        comment: x.comment,
                        userId: x.user_id,
                        username: x.user.username,
                        createdAt: localDate(x.created_at),
                        updatedAt: localDate(x.updated_at)
                    };
                }),
                commentCount: x.comment.length,
                likes: x.like.map(x => {
                    return {
                        id: x.id,
                        userId: x.user_id,
                        username: x.user.username,
                        createdAt: localDate(x.created_at),
                        updatedAt: localDate(x.updated_at)
                    };
                }),
                likeCount: x.like.length
            };
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
        let post = await db.post.findFirst({
            where: { id: id, deleted: constants.DELETED_FALSE },
            include: {
                user: true,
                comment: { include: { user: true } },
                like: { include: { user: true } }
            }
        });

        return post = {
            id: post.id,
            post: post.post,
            userId: post.user_id,
            username: post.user.username,
            createdAt: localDate(post.created_at),
            updatedAt: localDate(post.updated_at),
            comments: post.comment.map(x => {
                return {
                    id: x.id,
                    comment: x.comment,
                    userId: x.user_id,
                    username: x.user.username,
                    createdAt: localDate(x.created_at),
                    updatedAt: localDate(x.updated_at)
                };
            }),
            commentCount: post.comment.length,
            likes: post.like.map(x => {
                return {
                    id: x.id,
                    userId: x.user_id,
                    username: x.user.username,
                    createdAt: localDate(x.created_at),
                    updatedAt: localDate(x.updated_at)
                };
            }),
            likeCount: post.like.length,
        };

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

import { getPostDataByUserId, createPostData, getPostDataById, updatePostData, deletePostData } from "../services/postServices.js";
import { successResponse, errorResponse } from "../helpers/responseHelper.js";

export const getPostByUserId = async (req, res) => {
    try {
        const userId = req.params.user_id;
    
        const posts = await getPostDataByUserId(userId);
    
        if (posts.length === 0) return errorResponse(res, 404, "Posts data not found!");
    
        return successResponse(res, 200, "Success get posts!", posts, posts.length);

    } catch (error) {
        errorResponse(res, 500, "Failed to get posts!", error);

    }
};

export const getOnePostByUserId = async (req, res) => {
    try {
        const params = req.params;

        const posts = await getPostDataByUserId(params.user_id);

        if (posts.length === 0) return errorResponse(res, 404, "Posts is not found!");

        const post = posts.find((data) => data.id == params.id);

        if (!post) return errorResponse(res, 404, "Post is not found!");

        return successResponse(res, 200, "Success get post!", post);

    } catch (error) {
        errorResponse(res, 500, "Failed to get post!", error);

    }
};

export const getPostById = async (req, res) => {
    try {
        const id = req.params.id;

        const post = await getPostDataById(id);

        if (!post) return errorResponse(res, 404, "Post data is not found!");

        successResponse(res, 200, "Success get post!", post);

    } catch (error) {
        errorResponse(res, 500, "Failed to get post!", error)

    }
};

export const createPost = async (req, res) => {
    try {
        const newPost = req.body;

        newPost.userId = req.session.userId;

        await createPostData(newPost);

        successResponse(res, 201, "Success create new post!");

    } catch (error) {
        errorResponse(res, 500, "Failed to create new post!", error);

    }
};

export const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const post = await getPostDataById(id);

        if (!post) return errorResponse(res, 404, "Post data not found!, failed to update post");

        await updatePostData(data, id);

        return successResponse(res, 200, "Success update post!");

    } catch (error) {
        errorResponse(res, 500, "Failed to update post!", error);

    }
};

export const deletePost = async (req, res) => {
    try {
        const id = req.params.id;

        const post = await getPostDataById(id);

        if (!post) return errorResponse(res, 404, "Post is not found!, failed to delete post!");

        await deletePostData(id);

        return successResponse(res, 200, "Succes delete post!");

    } catch (error) {
        errorResponse(res, 500, "Failed to delete post!", error);

    }
}

import { apiResponse, errorResponse, throwError } from "../../middlewares/apiResponse.js";
import { 
    likePostData, 
    getLikeByUserAndPost, 
    getLikeById, 
    deleteLike } from "../../services/likeService.js";
import { 
    getPostDataByUserId, 
    createPostData, 
    getPostDataById, 
    updatePostData, 
    deletePostData
} from "../../services/postService.js";

export const getPostByUserId = async (req, res, next) => {
    try {
        const userId = req.params.user_id;
    
        const posts = await getPostDataByUserId(userId);
        if (posts.length === 0) throwError("Posts is not found!", 404);
    
        return apiResponse(res, 200, "Success get posts!", posts);

    } catch (error) {
        next(error);

    }
};

export const getOnePostByUserId = async (req, res, next) => {
    try {
        const params = req.params;

        const posts = await getPostDataByUserId(params.user_id);
        if (posts.length === 0) throwError("Posts is not found!", 404);

        const post = posts.find((data) => data.id == params.post_id);
        if (!post) throwError("Post is not found!", 404);

        return apiResponse(res, 200, "Success get post!", post);

    } catch (error) {
        next(error);

    }
};

export const getPostById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const post = await getPostDataById(id);
        if (!post) throwError("Post data is not found!", 404);

        apiResponse(res, 200, "Success get post!", post);

    } catch (error) {
        next(error)

    }
};

export const createPost = async (req, res, next) => {
    try {
        const newPost = req.body;
        newPost.userId = req.session.userId;

        const created = await createPostData(newPost);
        if (!created) throwError("Failed to upload post!", 400);

        apiResponse(res, 201, "Post has been upload!");

    } catch (error) {
        next(error);

    }
};

export const updatePost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const post = await getPostDataById(id);
        if (!post) throwError("Post is not found!", 404);

        const updated = await updatePostData(data, id);
        if (!updated) throwError("Failed to update post!", 400)

        return apiResponse(res, 200, "Success update post!");

    } catch (error) {
        next(error);

    }
};

export const deletePost = async (req, res, next) => {
    try {
        const id = req.params.id;

        const post = await getPostDataById(id);
        if (!post) throwError("Post is not found!", 404);

        const deleted = await deletePostData(id);
        if (!deleted) throwError("Failed to delete post!", 400);

        return apiResponse(res, 200, "Succes delete post!");

    } catch (error) {
        next(error);

    }
};

export const likePost = async (req, res, next) => {
    try {
        const postId = req.params.post_id;

        const post = await getPostDataById(postId);
        if (!post) throwError("Post is not foud!", 404);

        const likePost = {
            like: true,
            user_id: req.user.id,
            post_id: post.id
        };

        const likeData = await getLikeByUserAndPost(likePost);
        if (likeData) return apiResponse(res, 200, "Post liked ❤️!");

        const liked = await likePostData(likePost);
        if (!liked) throwError("Failed to like post!", 400);

        return apiResponse(res, 200, "Post liked ❤️!");

    } catch (error) {
        next(error);

    }
};

export const unlikePost = async (req, res, next) => {
    try {
        const id = req.params.id;

        const like = await getLikeById(id);
        if (!like) throwError("Like is not found!", 404);

        const unlike = await deleteLike(like.id);
        if (!unlike) throwError("Failed to unlike!", 400);

        return apiResponse(res, 200, "Post unliked 💔!");
        
    } catch (error) {
        next(error);

    }
};

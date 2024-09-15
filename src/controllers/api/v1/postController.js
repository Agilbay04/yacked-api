import ResponseError from "../../../exception/responseError.js";
import { apiResponse } from "../../../middlewares/apiResponse.middleware.js";
import { apiResponseV2 } from "../../../middlewares/apiResponseV2.middleware.js";
import { decryptData, encryptData } from "../../../helpers/authHelper.js";
import { 
    likePostData, 
    getLikeByUserAndPost, 
    getLikeById, 
    deleteLike } from "../../../services/likeService.js";
import { 
    getPostDataByUserId, 
    createPostData, 
    getPostDataById, 
    updatePostData, 
    deletePostData
} from "../../../services/postService.js";

export const getPostByUserId = async (req, res, next) => {
    try {
        const userId = req.params.user_id;
    
        const posts = await getPostDataByUserId(userId);

        const jsonData = apiResponseV2(200, "Success get posts!", posts);
        const responseEncrypt = encryptData(jsonData);
        const responseDecrypt = decryptData(responseEncrypt);
    
        // return res.status(jsonData.statusCode).send({ 
        //     response: responseEncrypt 
        // });

        return res.status(jsonData.statusCode).send({ 
            response: responseDecrypt 
        });

    } catch (error) {
        next(error);

    }
};

export const getOnePostByUserId = async (req, res, next) => {
    try {
        const params = req.params;

        const posts = await getPostDataByUserId(params.user_id);
        if (posts.length === 0) throw new ResponseError("Posts is not found!", 404);

        const post = posts.find((data) => data.id == params.post_id);
        if (!post) throw new ResponseError("Post is not found!", 404);

        const jsonData = apiResponseV2(200, "Success get post!", post);
        const responseEncrypt = encryptData(jsonData);
        const responseDecrypt = decryptData(responseEncrypt);

        // return res.status(jsonData.statusCode).send({ 
        //     response: responseEncrypt
        // });

        return res.status(jsonData.statusCode).send({
            response: responseDecrypt
        });

    } catch (error) {
        next(error);

    }
};

export const getPostById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const post = await getPostDataById(id);
        if (!post) throw new ResponseError("Post data is not found!", 404);

        const jsonData = apiResponseV2(200, "Success get post!", post);
        const responseEncrypt = encryptData(jsonData);
        const responseDecrypt = decryptData(responseEncrypt);

        // return res.status(jsonData.statusCode).send({ 
        //     response: responseEncrypt
        // });

        return res.status(jsonData.statusCode).send({
            response: responseDecrypt
        });

    } catch (error) {
        next(error)

    }
};

export const createPost = async (req, res, next) => {
    try {
        const newPost = req.body;
        newPost.userId = req.session.userId;

        const created = await createPostData(newPost);
        if (!created) throw new ResponseError("Failed to upload post!", 400);

        return apiResponse(res, 201, "Post has been upload!");

    } catch (error) {
        next(error);

    }
};

export const updatePost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const post = await getPostDataById(id);
        if (!post) throw new ResponseError("Post is not found!", 404);

        const updated = await updatePostData(data, id);
        if (!updated) throw new ResponseError("Failed to update post!", 400)

        return apiResponse(res, 200, "Success update post!");

    } catch (error) {
        next(error);

    }
};

export const deletePost = async (req, res, next) => {
    try {
        const id = req.params.id;

        const post = await getPostDataById(id);
        if (!post) throw new ResponseError("Post is not found!", 404);

        const deleted = await deletePostData(id);
        if (!deleted) throw new ResponseError("Failed to delete post!", 400);

        return apiResponse(res, 200, "Succes delete post!");

    } catch (error) {
        next(error);

    }
};

export const likePost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const post = await getPostDataById(postId);
        if (!post) throw new ResponseError("Post is not foud!", 404);

        const likePost = {
            like: true,
            user_id: req.user.id,
            post_id: post.id
        };

        const likeData = await getLikeByUserAndPost(likePost);
        if (likeData) return apiResponse(res, 200, "Post liked ❤️!");

        const liked = await likePostData(likePost);
        if (!liked) throw new ResponseError("Failed to like post!", 400);

        return apiResponse(res, 200, "Post liked ❤️!");

    } catch (error) {
        next(error);

    }
};

export const dislikePost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const post = await getPostDataById(postId);
        if (!post) throw new ResponseError("Post is not foud!", 404);

        const likeData = await getLikeByUserAndPost(likePost);
        if (likeData) return true;

        const likePost = {
            like: true,
            user_id: req.user.id,
            post_id: post.id
        };

        if (likeData) return apiResponse(res, 200, "Post liked ❤️!");

        const liked = await likePostData(likePost);
        if (!liked) throw new ResponseError("Failed to like post!", 400);

        return apiResponse(res, 200, "Post liked ❤️!");

    } catch (error) {
        next(error);

    }
};

export const unlikePost = async (req, res, next) => {
    try {
        const id = req.params.id;

        const like = await getLikeById(id);
        if (!like) throw new ResponseError("Like is not found!", 404);

        const unlike = await deleteLike(like.id);
        if (!unlike) throw new ResponseError("Failed to unlike!", 400);

        return apiResponse(res, 200, "Post unliked 💔!");
        
    } catch (error) {
        next(error);

    }
};

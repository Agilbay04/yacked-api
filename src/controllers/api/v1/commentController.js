import ResponseError from "../../../exception/responseError.js";
import { getPostDataById } from "../../../services/postService.js";
import { apiResponse } from "../../../middlewares/apiResponse.middleware.js";
import { 
    getLikeByUserAndComment, 
    likeCommentData, 
    getLikeById,
    deleteLike
} from "../../../services/likeService.js";
import { 
    createCommentData,
    getCommentDataById, 
    updateCommentData, 
    deleteCommentData 
} from "../../../services/commentService.js";

export const createComment = async (req, res, next) => {
    try {
        const newComment = req.body;
        newComment.userId = req.session.userId;
    
        const post = await getPostDataById(newComment.postId);
        if (!post) throw new ResponseError("Post is not found!", 404);
    
        const created = await createCommentData(newComment);
        if (!created) throw new ResponseError("Failed to sent comment!", 400);

        return apiResponse(res, 201, "Comment has been sent!");

    } catch (error) {
        next(error);

    }
};

export const updateComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const comment = await getCommentDataById(id);
        if (!comment) throw new ResponseError("Comment is not found!", 404);

        const updated = await updateCommentData(data, id);
        if (!updated) throw new ResponseError("Failed to update comment!", 400);

        return apiResponse(res, 200, "Comment has been updated!");

    } catch (error) {
        next(error);

    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const id = req.params.id;

        const comment = await getCommentDataById(id);
        if (!comment) throw new ResponseError("Comment not found!", 404);

        const deleted = await deleteCommentData(id);
        if (!deleted) throw new ResponseError("Filed to delete comment!");

        return apiResponse(res, 200, "Comment has been deleted!");

    } catch (error) {
        next(error);

    }
};

export const likeComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;

        const comment = await getCommentDataById(commentId);
        if (!comment) throw new ResponseError("Comment is not foud!", 404);

        const likeComment = {
            like: true,
            user_id: req.user.id,
            comment_id: comment.id
        };

        const likeData = await getLikeByUserAndComment(likeComment);
        if (likeData) return apiResponse(res, 200, "Comment liked ❤️!");

        const liked = await likeCommentData(likeComment);
        if (!liked) throw new ResponseError("Failed to like comment!", 400);

        return apiResponse(res, 200, "Comment liked ❤️!");

    } catch (error) {
        next(error);

    }
};

export const unlikeComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(`comment_id is: ${id}`);

        const like = await getLikeById(id);
        if (!like) throw new ResponseError("Like is not found!", 404);

        const unlike = await deleteLike(like.id);
        if (!unlike) throw new ResponseError("Failed to unlike!", 400);

        return apiResponse(res, 200, "Comment unliked 💔!");
        
    } catch (error) {
        next(error);

    }
};

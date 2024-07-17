import { createCommentData, getCommentDataByPostId, getCommentDataById, updateCommentData, deleteCommentData } from "../services/commentServices.js";
import { successResponse,errorResponse } from "../helpers/responseHelper.js";
import { getPostDataById } from "../services/postServices.js";

export const createComment = async (req, res) => {
    try {
        const newComment = req.body;
    
        newComment.userId = req.session.userId;
    
        const post = await getPostDataById(newComment.postId);
    
        if (!post) return errorResponse(res, 404, "Post is not found!");
    
        await createCommentData(newComment);
    
        return successResponse(res, 201, "Comment has been sent!");

    } catch (error) {
        errorResponse(res, 500, "Failed to sent comment!", error);

    }
};

export const updateComment = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const comment = await getCommentDataById(id);

        if (!comment) return errorResponse(res, 404, "Comment is not found!");

        await updateCommentData(data, id);

        return successResponse(res, 200, "Comment has been updated!");

    } catch (error) {
        errorResponse(res, 500, "Failed to update comment!", error);

    }
};

export const deleteComment = async (req, res) => {
    try {
        const id = req.params.id;

        const comment = await getCommentDataById(id);

        if (!comment) return errorResponse(res, 404, "Comment not found!");

        await deleteCommentData(id);

        return successResponse(res, 200, "Comment has been deleted!");

    } catch (error) {
        errorResponse(res, 500, "Failed to delete comment!", error);

    }
}
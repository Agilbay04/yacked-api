import express from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../src/controllers/userController.js";
import { sessionData, verifyToken } from "../src/helpers/authHelper.js";
import { login, logout, register, token } from "../src/controllers/authController.js";
import { createPost, deletePost, getOnePostByUserId, getPostById, getPostByUserId, updatePost } from "../src/controllers/postController.js";
import { createComment, deleteComment, updateComment } from "../src/controllers/commentController.js";

const routes = express.Router();

/** AUTH ROUTES */
routes.post('/login', login);
routes.delete('/logout', logout);
routes.post('/register', register);
routes.get('/token', token);

/** USER ROUTES */
routes.get('/users', verifyToken, getAllUsers);
routes.get('/user/:id', verifyToken, getUserById);
routes.put('/user/:id', verifyToken, updateUser);
routes.delete('/user/:id', verifyToken, deleteUser);

/** POST ROUTES */
routes.get('/post/user/:user_id', verifyToken, getPostByUserId);
routes.get('/post/:id/user/:user_id', verifyToken, getOnePostByUserId);
routes.get('/post/:id', verifyToken, getPostById);
routes.post('/post', verifyToken, sessionData, createPost);
routes.put('/post/:id', verifyToken, updatePost);
routes.delete('/post/:id', verifyToken, deletePost);

/** COMMENT ROUTES */
routes.post('/comment', verifyToken, sessionData, createComment);
routes.put('/comment/:id', verifyToken, updateComment);
routes.delete('/comment/:id', verifyToken, deleteComment);

export default routes;
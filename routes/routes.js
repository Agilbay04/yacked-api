import express from "express";
import { deleteUser, getAllUsers, getUserById, testCheckSession, updateUser } from "../src/controllers/userController.js";
import { sessionData, verifyToken } from "../src/helpers/authHelper.js";
import { login, logout, register, token } from "../src/controllers/authController.js";
import { createPost, deletePost, getOnePostByUserId, getPostById, getPostByUserId, updatePost } from "../src/controllers/postController.js";
import { createComment, deleteComment, updateComment } from "../src/controllers/commentController.js";
import { loginValidation, registerValidation } from "../src/validation/authValidation.js";

const routes = express.Router();

/** AUTH ROUTES */
/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth api collections 
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: andro
 *               password:
 *                 type: string
 *                 example: androgantenk123
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login success! hello {username}
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     access_token:
 *                       type: string
 *       400:
 *         description: Error validation!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Wrong username or password!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
routes.post('/login', loginValidation, login);
/** 
 * @swagger
 * /logout:
 *   delete:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout success!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       204:
 *         description: No content available!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: User data not found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Logout failed!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
routes.delete('/logout', logout);
/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: 1234
 *               created_by:
 *                 type: string
 *                 default: system
 *               updated_by:
 *                 type: string
 *                 default: system
 *               deleted:
 *                 type: integer
 *                 default: 0
 *             required:
 *               - full_name
 *               - email
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Registration account success!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Validation error!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
routes.post('/register', registerValidation, register);
/**
 * @swagger
 * /token:
 *   get:
 *     summary: Refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success generate refresh token!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     access_token:
 *                       type: string
 *       500:
 *         description: Failed generate refresh token!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
routes.get('/token', token);

/** USER ROUTES */
/**
 * @swagger
 * tags:
 *  name: User
 *  description: User api collections 
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all user data
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Success get users data!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Success get users data!
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       full_name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       username:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                 totalRecord:
 *                   type: integer
 *       404:
 *         description: User data is not found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to get users data!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
routes.get('/users', verifyToken, getAllUsers);
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve user data by id
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success get user data!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     full_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     username:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to get users data!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
routes.get('/user/:id', verifyToken, getUserById);
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user data
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               updated_by:
 *                 type: string
 *             required:
 *               - full_name
 *               - updated_by 
 *     responses:
 *       200:
 *         description: Success update user data {full_name}!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed update user data!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
routes.put('/user/:id', verifyToken, updateUser);
/** 
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user data
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success delete user data!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed delete user data!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
routes.delete('/user/:id', verifyToken, deleteUser);

/** POST ROUTES */
/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Post api collections 
 */

/**
 * @swagger
 * /post/user/{user_id}:
 *   get:
 *     summary: Get post data by user_id
 *     tags: [Post]
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success get posts!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       post:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                       user_id:
 *                         type: string
 *                       user:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                       comment:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             comment:
 *                               type: string
 *                             created_at:
 *                               type: string
 *                               format: date-time
 *                             updated_at:
 *                               type: string
 *                               fromat: date-time
 *                             user_id:
 *                               type: string
 *                             user:
 *                               type: object
 *                               properties:
 *                                 username:
 *                                   type: string
 *       404:
 *         description: Post data not found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to get post!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
routes.get('/post/user/:user_id', verifyToken, getPostByUserId);
/**
 * @swagger
 * /post/{post_id}/user/{user_id}:
 *   get:
 *     summary: Get one post data by user_id
 *     tags: [Post]
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *       - name: post_id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success get posts!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       post:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                       user_id:
 *                         type: string
 *                       user:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                       comment:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             comment:
 *                               type: string
 *                             created_at:
 *                               type: string
 *                               format: date-time
 *                             updated_at:
 *                               type: string
 *                               fromat: date-time
 *                             user_id:
 *                               type: string
 *                             user:
 *                               type: object
 *                               properties:
 *                                 username:
 *                                   type: string
 *       404:
 *         description: Post data not found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to get post!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
routes.get('/post/:post_id/user/:user_id', verifyToken, getOnePostByUserId);
/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get one post data by id
 *     tags: [Post]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success get posts!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       post:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                       user_id:
 *                         type: string
 *                       user:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                       comment:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             comment:
 *                               type: string
 *                             created_at:
 *                               type: string
 *                               format: date-time
 *                             updated_at:
 *                               type: string
 *                               fromat: date-time
 *                             user_id:
 *                               type: string
 *                             user:
 *                               type: object
 *                               properties:
 *                                 username:
 *                                   type: string
 *       404:
 *         description: Post data not found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to get post!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
routes.get('/post/:id', verifyToken, getPostById);
/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post:
 *                 type: string
 *                 example: Hello World!!!
 *               deleted:
 *                 type: string
 *                 default: 0
 *             required:
 *               - post
 *               - deleted
 *     responses:
 *       201:
 *         description: Success create new post!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to create new post!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
routes.post('/post', verifyToken, sessionData, createPost);
/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: Update post data
 *     tags: [Post]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post:
 *                 type: string
 *             required:
 *               - post
 *     responses:
 *       200:
 *         description: Success update post data!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Post not found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to update post!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
routes.put('/post/:id', verifyToken, updatePost);
/** 
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Delete post data
 *     tags: [Post]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success delete post!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Post is not found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed delete post!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
routes.delete('/post/:id', verifyToken, deletePost);

/** COMMENT ROUTES */
/**
 * @swagger
 * tags:
 *  name: Comment
 *  description: Comment api collections 
 */

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Post comment!
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: Hello world!
 *               postId:
 *                 type: string
 *                 example: 2bc15812-195c-4f55-b5cb-4c1a77f622f6
 *             required:
 *               - comment
 *               - userId
 *     responses:
 *       201:
 *         description: Comment has been sent!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Post is not found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to sent comment!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
routes.post('/comment', verifyToken, sessionData, createComment);
/**
 * @swagger
 * /comment/{id}:
 *   put:
 *     summary: Update comment data
 *     tags: [Comment]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Comment ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *             required:
 *               - comment
 *     responses:
 *       200:
 *         description: Comment has been updated!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Comment is not found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to update comment!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
routes.put('/comment/:id', verifyToken, updateComment);
/** 
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Delete comment data
 *     tags: [Comment]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Comment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment has been deleted!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Comment is not found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed delete comment!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
routes.delete('/comment/:id', verifyToken, deleteComment);

/** ROUTES FOR TEST */
routes.get('/', verifyToken, sessionData, testCheckSession);

export default routes;
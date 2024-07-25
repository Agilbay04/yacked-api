import { body } from "express-validator";

export const loginValidation = [
    [
        body("username").notEmpty().withMessage("username can't empty")
            .isLength({ min: 5, max: 25 }).withMessage("username contains minimum 5 and maximum 25 characters"),
        body("password").notEmpty().withMessage("password can't empty")
            .isLength({ min: 8 }).withMessage("password contains minimum 8 characters"),
    ],
];

export const registerValidation = [
    [
        body("full_name").notEmpty().withMessage("full name can't empty"),
        body("email").notEmpty().withMessage("email can't empty")
            .isEmail().withMessage("value must using email format"),
        body("username").notEmpty().withMessage("username can't empty")
            .isLength({ min: 5, max: 25 }).withMessage("username contains minimum 5 and maximum 25 characters"),
        body("password").notEmpty().withMessage("password can't empty")
            .isLength({ min: 8 }).withMessage("password contains minimum 8 characters"),
    ],
];

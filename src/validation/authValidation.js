import { body } from "express-validator";

export const loginValidation = [
    [
        body("username").notEmpty().withMessage("Username can't empty")
            .isLength({ min: 5, max: 25 }).withMessage("Username contains minimum 5 and maximum 25 characters"),
        body("password").notEmpty().withMessage("Password can't empty")
            .isLength({ min: 8 }).withMessage("Password contains minimum 8 characters"),
    ],
];

export const registerValidation = [
    [
        body("full_name").notEmpty().withMessage("Full name can't empty"),
        body("email").notEmpty().withMessage("Email can't empty")
            .isEmail().withMessage("Value must using email format"),
        body("username").notEmpty().withMessage("Username can't empty")
            .isLength({ min: 5, max: 25 }).withMessage("Username contains minimum 5 and maximum 25 characters"),
        body("password").notEmpty().withMessage("Password can't empty")
            .isLength({ min: 8 }).withMessage("Password contains minimum 8 characters"),
    ],
];

import multer from "multer";
import fs from "fs";

const storageDisk = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/images/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const uploadConfig = multer({ 
    storage: storageDisk,
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    } 
});

export const deleteFile = async (path) => {
    fs.unlink(path, (err) => {
        if (err) {
            console.log('Failed to delete file!');
        }
    });
};

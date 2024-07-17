import multer from "multer";

const storageDisk = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storageDisk })

export default upload;

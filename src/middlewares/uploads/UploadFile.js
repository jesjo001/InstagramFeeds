import multer from 'multer';
import * as path from 'path';
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "../client/src/assets/upload");
//         console.log("here");
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname)
//     }
// })

export const uploads = multer({ dest: 'uploads/' })

export const uploader = dest => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dest);
        },
        filename: function (req, file, cb) {
            cb(
                null,
                file.fieldname + '-' + Date.now() + path.extname(file.originalname)
            );
        },
    });
};

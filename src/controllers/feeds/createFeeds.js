import Feed from "../../models/feeds"
import mobilenet from "@tensorflow-models/mobilenet";
import { uploader } from "../../middlewares/uploads/UploadFile";
import fs from 'fs';
import * as path from 'path';
import multer from 'multer';

export const createFeed = async (req, res, next) => {


    try {


        const user = req.user

        let filename = '';
        let upload = multer({ storage: uploader('client/src/assets/uploads/') }).single(
            'feedImage'
        );

        // uploading profile
        upload(req, res, async function (err) {
            if (req.file) {
                filename = req.file.filename;
            }
            let myObject = Object.assign({}, req.body);

            //validate if model is a cat here

            // const image = `${__dirname}client/src/assets/uploads/${filename}`;
            // const model = await mobilenet.load()
            // const prediction = model.classify(image)

            // console.log('Predictions: ');
            // console.log(prediction);

            const feed = await Feed.create({
                userId: user.user_id,
                text: myObject.feedText,
                photoName: filename,
                likes: 0,
            });

            if (!feed) return res.status(500).send("something went wrong. Try again latter")

            if (feed) {
                return res.status(200).json({
                    feed,
                    message: 'Feed created successfully'
                })
            }

            return res.status(200).send({ message: 'Profile updated' });
        });
    } catch (err) {
        console.log(err);
    }
}
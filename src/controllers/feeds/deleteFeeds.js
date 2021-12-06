import axios from 'axios';
import Feed from '../../models/feeds'
import { unlink } from 'fs/promises';

export const deleteFeed = async (req, res, next) => {

    if (!req.params.id) return res.status(500).send("Invalid query parameters")

    const { id } = req.params;

    const { user } = req

    try {

        //get feed
        const feed = await Feed.findOne({ _id: id });

        //if feed does not exist send an error msg
        if (!feed) return res.status(404).json({ statusCode: 404, message: "Feed not found" })

        //check if user has permission to delete feed if not return error
        if (feed.userId !== user.user_id) return res.status(401).json({ statusCode: 401, message: 'You do not have the correct permission to delete this feed' })

        const photoName = feed.photoName;

        //delete from database
        const deleteFeed = await Feed.deleteOne({ _id: id })
        if (deleteFeed.deletedCount == '0') return res.status(401).send("Ops Something went wrong!! Feed not found. Try again latter.");

        //Delete image Physically from bucket/folder
        unlink(`client/src/assets/uploads/${photoName}`, (err) => {
            if (err) {
                console.log(err)
                return res.send(500).json({ statusCode: 500, message: "Ops resource seems unavailable, might have been previously deleted. Try again later" })
            }
        });

        return res.status(200).json({
            message: "Feed deleted successfully"
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            statusCode: 500,
            message: "Ops Something went wrong, Try again later!!!"
        })
    }

}
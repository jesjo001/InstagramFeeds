import axios from 'axios';
import Feeds from '../../models/feeds'
import User from '../../models/User'

export const likeFeed = async (req, res, next) => {

    if (!req.params.id) return res.status(500).send("Invalid query parameters")

    const { id } = req.params;

    //get logged in user 
    const { user } = req;

    try {

        //check if image exists
        const exist = await Feeds.exists({ _id: id });

        if (!exist) res.status(401).json({
            status: 401,
            message: "Feed does not exist"
        })

        if (exist) {
            const updatedFeed = await Feeds.findOneAndUpdate({ _id: id }, { $inc: { likes: 1 } }, { new: true })
            const userUpdate = await User.findOneAndUpdate({ _id: user.user_id }, { $push: { feedViewed: id } }, { new: true })

            return res.status(200).json({
                feed: updatedFeed,
                message: `You liked ${userUpdate.username}'s feed.`
            })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            statusCode: 500,
            message: "Internal server error"
        })
    }

}
import axios from 'axios';
import Feeds from '../../models/feeds'
import User from '../../models/User'

export const getFeeds = async (req, res, next) => {

    try {

        const { user } = req

        const myUser = await User.findOne({ _id: user.user_id })

        const connectedUsers = myUser.connectedUsers;

        const feeds = await Feeds.find({ userId: { $in: connectedUsers } })

        if (!feeds) return res.status(404).json({
            statusCode: 404,
            message: "You currently do no have any feeds to view"
        })

        return res.status(200).json({
            feeds
        });

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            statusCode: 500,
            message: "Internal server error"
        });
    }

}
import User from "../../models/User";
import UserRequest from "../../models/UserRequest";

export const sendRequest = async (req, res) => {

    if (!req.params.id) return res.status(400).json({ statusCode: 404, message: "Invalid Parameter id required" });

    const { id } = req.params
    const { user } = req

    try {

        const userReq = await UserRequest.findOne({ requestingUser: user.user_id, requestedUser: id })

        const friend = await User.findOne({ _id: id })
        if (!friend) return res.status(404).json({ statusCode: 404, message: "User not found" });

        if (userReq) {
            if (userReq.status === 'active') return res.status(400).json({ statusCode: 400, message: "You are already connected with the user" });
            if (userReq.status === 'pending' || userReq.status === 'rejected') return res.send(400).json({ statusCode: 400, message: "Friend request sent to user" });
        }

        if (!userReq) {
            const connection = await UserRequest.create({ requestingUser: user.user_id, requestedUser: id, status: "pending" });
            if (connection) return res.status(200).json({ statusCode: 200, message: "User Request sent" })
            else return res.status(500).json({ statusCode: 200, message: "Something went wrong!! Try again later!!!" });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            statusCode: 500,
            message: "Internal server error"
        });
    }
}
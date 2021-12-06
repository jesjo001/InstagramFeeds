import User from "../../models/User";
import UserRequest from "../../models/UserRequest";

export const rejectRequest = async (req, res) => {

    if (!req.params.id) return res.status(400).json({ statusCode: 404, message: "Invalid Parameter id required" });

    const { id } = req.params
    const { user } = req

    try {

        const friend = await User.findOne({ _id: id })
        if (!friend) return res.status(404).json({ statusCode: 404, message: "User not found" });

        const userReq = await UserRequest.findOne({ requestingUser: user.user_id, requestedUser: id })

        if (userReq) {
            if (userReq.status === 'rejected') return res.status(400).json({ statusCode: 400, message: "Request been previously sent" });

            //if status is not rejected then reject request
            if (userReq.status !== 'rejected') {

                //set userRequest status to 'rejected' and save in database
                userReq.status = 'rejected';
                const saveDoc = await userReq.save();

                //validate that doc was saved
                if (saveDoc.status != 'rejected')
                    return res.status(500).json({ statusCode: 500, message: "Ops something wrong. Please try again later!!!" });

                //cleanup can be don with crude funtion
                //remove userId from connected user in both user doc
                const myUser = await User.findOneAndUpdate({ _id: user.user_id }, { $pullAll: { connectedUsers: [id] } }, { new: true });
                const friendUser = await User.findOneAndUpdate({ _id: id }, { $pullAll: { connectedUsers: [user.user_id] } }, { new: true });

                return res.status(200).json({ statusCode: 200, message: "User rejected successfully" });

            }
        }

        if (!userReq) {
            return res.status(200).json({ statusCode: 200, message: "User is not a connection, can only reject a connected friend " })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            statusCode: 500,
            message: "Internal server error"
        });
    }
}
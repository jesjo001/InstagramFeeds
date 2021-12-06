import User from "../../models/User";
import UserRequest from "../../models/UserRequest";

export const approveRequest = async (req, res, next) => {

    if (!req.params.id) return res.status(400).json({ statusCode: 404, message: "Invalid Parameter id required" });

    const id = req.params.id
    const user = req.user

    try {
        //get requested user
        const friend = await User.findOne({ _id: id })

        //if user not found exit with error message user does not exist
        if (!friend) return res.status(404).json({ statusCode: 404, message: "User not found" });

        //check if already approved
        const userReq = await UserRequest.findOne({ requestingUser: user.user_id, requestedUser: id })
        const friendReq = await UserRequest.findOne({ requestingUser: id, requestedUser: user.user_id })


        if (userReq) {
            //if request exit as is approved send back already approved message
            if (userReq.status === 'approved') return res.status(400).json({ statusCode: 404, message: "User has been previously approved" });

            //if not approved, then approve
            if (userReq.status !== 'approved') {
                const approve = await UserRequest.updateOne({ requestingUser: user.user_id, requestedUser: id }, { $set: { status: 'approved' } })
                const addUser = await User.updateOne({ _id: user.user_id }, { $push: { connectedUsers: id } })
                const addSecondUser = await User.updateOne({ _id: id }, { $push: { connectedUsers: user.user_id } })
                return res.status(201).json({ statusCode: 404, message: "User approved successfully" });
            }
        }

        if (friendReq) {
            //if request exit as is approved send back already approved message
            if (friendReq.status === 'approved') return res.status(400).json({ statusCode: 404, message: "User has been previously approved" });

            //if not approved, then approve
            if (friendReq.status !== 'approved') {
                const approve = await UserRequest.updateOne({ requestingUser: id, requestedUser: user.user_id }, { $set: { status: 'approved' } })
                const addUser = await User.updateOne({ _id: user.user_id }, { $push: { connectedUsers: id } })
                const addSecondUser = await User.updateOne({ _id: id }, { $push: { connectedUsers: user.user_id } })
                return res.status(201).json({ statusCode: 404, message: "User approved successfully" });
            }
        }

        //if user as never sent a request send error
        if (!userReq && !friendReq)
            return res.status(401).json({ statusCode: 401, message: "You can only approve a requested user. Kindly send friend request first." });


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            statusCode: 500,
            message: "Internal server error"
        });
    }
}
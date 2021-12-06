import User from "../../models/User";
import UserRequest from "../../models/UserRequest";

export const getRequests = async (req, res, next) => {

    try {

        const { user } = req;
        console.log(user)
        //check if already approved
        const userReq = await UserRequest.find({ requestedUser: user.user_id });

        if (userReq) return res.status(201).json({ statusCode: 201, requests: userReq });

        //if user doesnt have any request
        if (!userReq) return res.status(401).json({ statusCode: 401, message: "You do not have any friend request" });


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            statusCode: 500,
            message: "Internal server error"
        });
    }
}
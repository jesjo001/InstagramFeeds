import mongoose from 'mongoose';

const userRequestSchema = new mongoose.Schema({
    requestingUser: {
        type: String,
        default: null,
        required: true
    },
    requestedUser: {
        type: String,
        default: null,
        required: false
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['pending', 'approved', 'rejected'],
        }
    },
}, { timestamp: true });

const UserRequest = mongoose.model("UserRequest", userRequestSchema);
export default UserRequest;

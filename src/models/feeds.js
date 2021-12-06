import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const feedsSchema = new Schema({
    userId: { type: String, require: true },
    text: { type: String, require: true },
    photoName: { type: String, require: true },
    containCats: { type: Boolean, require: false },
    likes: { type: Number, require: false },
},
    {
        timestamps: true,
    })

const Feeds = mongoose.model('Feeds', feedsSchema);
export default Feeds;
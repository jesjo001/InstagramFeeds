import express from 'express';
import { userValidationRules, validate } from '../../middlewares/validation/validator'
import { protect } from "../../middlewares/authentication/auth";
import { createFeed } from "../../controllers/feeds/createFeeds";
import { deleteFeed } from "../../controllers/feeds/deleteFeeds";
import { getFeeds } from "../../controllers/feeds/getFeeds";
import { likeFeed } from "../../controllers/feeds/likeFeeds";
// import { uploads } from "../../middlewares/uploads/UploadFile"
const FeedRouter = express.Router();;

//protect route with middleware
//only authenticated and authorized users can access routes

FeedRouter.use(protect);
// FeedRouter.post('/create', uploads.single('file'), createFeed);
FeedRouter.post('/create', createFeed);
FeedRouter.delete('/delete/:id', deleteFeed);
FeedRouter.get('/getAll', getFeeds);
FeedRouter.post('/like/:id', likeFeed);

export default FeedRouter;
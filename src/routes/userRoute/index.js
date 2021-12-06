import express from 'express';
import { userValidationRules, validate } from '../../middlewares/validation/validator'

import { userLogin } from "../../controllers/user/userLogin"
import { registerUser } from "../../controllers/user/useRegister"
import { approveRequest } from "../../controllers/user/approveReuest"
import { rejectRequest } from "../../controllers/user/rejectRequest"
import { sendRequest } from "../../controllers/user/sendFriendReq"
import { getRequests } from "../../controllers/user/getUserRequests"
import { protect } from "../../middlewares/authentication/auth"
import { loginLimiter } from "../../middlewares/loginLimit"

const UserRouter = express.Router();

UserRouter.post('/login', userLogin)
UserRouter.post('/register', userValidationRules(), validate, registerUser)

UserRouter.use(protect)
UserRouter.post('/approve/:id', approveRequest)
UserRouter.post('/request/:id', sendRequest);
UserRouter.post('/reject/:id', rejectRequest);
UserRouter.get('/getrequests/', getRequests)

export default UserRouter;

import rateLimit from 'express-rate-limit';
const config = process.env;

const opts = {
    windowMs: 1 * 60 * 1000, // 6 points
    max: 10, // Per second
    message: "You can only make 10 login req pre minute"
};

export const loginLimiter = rateLimit(opts);
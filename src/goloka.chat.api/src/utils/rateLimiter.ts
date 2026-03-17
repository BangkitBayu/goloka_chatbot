import rateLimit from "express-rate-limit";

const reqLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, //5 menit
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message: "Too many requests, try again in 5 minutes",
  },
});

export default reqLimiter;

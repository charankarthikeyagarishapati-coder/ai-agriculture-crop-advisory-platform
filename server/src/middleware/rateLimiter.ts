import rateLimit from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});

export const aiRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30, // limit AI advisory/diagnosis requests
  message: { error: 'AI generation limit reached. Please wait a few minutes before submitting new requests.' }
});

// utils/otp.js
import crypto from 'crypto';

export const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
};

export const isOtpValid = (otp, storedOtp, expiresAt) => {
  return otp === storedOtp && new Date() < new Date(expiresAt);
};

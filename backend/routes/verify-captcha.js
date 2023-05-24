const axios = require('axios');
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('/verify-captcha', async (req, res) => {
  const { response } = req.body;

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${response}`;

    const verificationResponse = await axios.post(verificationUrl);
    const { success, 'error-codes': errorCodes } = verificationResponse.data;

    if (success) {
      res.json({ success: true });
    } else {
      res.json({ success: false, 'error-codes': errorCodes });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;

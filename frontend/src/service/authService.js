import axios from 'axios';

const commonPath = 'http://localhost:3000';

export async function verifyCaptcha(token) {
  try {
    const res = await axios.post(`${commonPath}/verify-captcha`, { response: token });
    if (res.data.success) {
      return true;
    } else {
      console.error('CAPTCHA verification failed:', res.data['error-codes']);
      return false;
    }
  } catch (error) {
    console.error('CAPTCHA verification request failed:', error);
    return false;
  }
}

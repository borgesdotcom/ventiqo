<template>
  <LoginCotainer :class="['home', theme]">
  </LoginCotainer>
</template>

<script>
import { ref, inject } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';
import axios from 'axios';
import LoginCotainer from '@/components/login-container/vue/LoginContainer.vue';

export default {
  components: {
    LoginCotainer,
  },
  setup() {
    window.top.document.title = 'Log In'
    const theme = inject('theme')
    const commonPath = 'http://localhost:3000';
    const verified = ref(false);
    const { executeRecaptcha } = useReCaptcha();
    

    const verifyCaptcha = async () => {
      const token = await executeRecaptcha('homepage');

      try {
        const res = await axios.post(`${commonPath}/verify-captcha`, { response: token });
        if (res.data.success) {
          verified.value = true;
        } else {
          console.error('CAPTCHA verification failed:', res.data['error-codes']);
        }
      } catch (error) {
        console.error('CAPTCHA verification request failed:', error);
      }
    };

    const testeButton = () => {
      if (verified.value) {
        console.log('ENTROU');
      }
    };

    return {
      verified,
      verifyCaptcha,
      testeButton,
      theme
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../sass/LoginPage.scss';
</style>
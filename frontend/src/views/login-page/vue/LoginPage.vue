<template>
  <div :class="['home', theme]">
    <login-cotainer>
      <ventiqo-button
        class="button-google"
      >
        Log-in with Google
      </ventiqo-button>
      <ventiqo-button
        class="button-login"
      >
        Login
      </ventiqo-button>
    </login-cotainer>
    <h1>Welcome to ventiqo</h1>
    <p>Please verify that you are not a robot:</p>
    <button @click="verifyCaptcha">Verify</button>
    <button :disabled="!verified" @click="goToTimeline">Go to Timeline</button>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';
import axios from 'axios';
import VentiqoButton from '@/components/button/vue/VentiqoButton.vue';
import LoginCotainer from '@/components/login-container/vue/LoginContainer.vue';

export default {
  components: {
    VentiqoButton,
    LoginCotainer,
  },
  setup() {
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
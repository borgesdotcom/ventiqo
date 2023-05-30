<template>
  <div class="home" :class="theme">
    <h1>Welcome to ventiqo</h1>
    <p>Please verify that you are not a robot:</p>
    <button @click="verifyCaptcha">Verify</button>
    <button :disabled="!verified" @click="goToTimeline">Go to Timeline</button>
    <ventiqo-button
      class="button-google"
    >
      Log-in with Google
    </ventiqo-button>
    <ventiqo-button
      @click="testeButton"
      class="button-login"
    >
      Log In
    </ventiqo-button>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';
import axios from 'axios';
import VentiqoButton from '@/components/button/vue/VentiqoButton.vue';

export default {
  components: {
    VentiqoButton,
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
<template>
  <div :class="['home', theme]">
    <login-container>
      <ventiqo-button
        class="button-google"
        @click="verifyCaptcha"
      >
        <template v-if="buttonState === 'initial'">Não sou um robo</template>
        <template v-else-if="buttonState === 'loading'"><i class="fas fa-spinner fa-spin"></i></template>
        <template v-else><i class="fas fa-check"></i></template>
      </ventiqo-button>
    </login-container>
  </div>
</template>
<script>
import { ref, inject } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';
import axios from 'axios';
import LoginContainer from '@/components/login-container/vue/LoginContainer.vue';

export default {
  components: {
    LoginContainer,
  },
  setup() {
    window.top.document.title = 'Entrar em Ventiqo / Ventiqo'
    const theme = inject('theme')
    const commonPath = 'http://localhost:3000';
    const verified = ref(false);
    const buttonState = ref('initial'); // New state variable
    const { executeRecaptcha } = useReCaptcha();

    const verifyCaptcha = async () => {
      buttonState.value = 'loading'; // Set to loading when request is sent

      const token = await executeRecaptcha('homepage');

      try {
        const res = await axios.post(`${commonPath}/verify-captcha`, { response: token });
        if (res.data.success) {
          verified.value = true;
          buttonState.value = 'success'; // Set to success if request is successful
        } else {
          console.error('CAPTCHA verification failed:', res.data['error-codes']);
          buttonState.value = 'initial'; // Revert to initial if request fails
        }
      } catch (error) {
        console.error('CAPTCHA verification request failed:', error);
        buttonState.value = 'initial'; // Revert to initial if request fails
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
      theme,
      buttonState // return buttonState ref
    };
  },
};
</script>
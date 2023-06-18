<template :class="theme">
  <article class="ventiqo-container" @mousemove="handleMouseMove">
    <section class="ventiqo-login-container">
      <div class="ventiqo-login-container__content">
        <h1>Bem-vindo a <span class="ventiqo-login-container__content-yellow">Ventiqo</span>, </h1>
        <p>Faça login e acompanhe suas postagens! <br /> Não tem uma conta ? <a href="#"> clique aqui.</a></p>
      </div>
      <form @submit.prevent="handleSubmit">
        <ventiqo-input v-model="username" name="username" label="Usuario" title="Insira seu usuário"
          class="ventiqo-login-container__content-username" :value="username" :required="true" type="text"
          @input="inputUsername" />
        <ventiqo-input v-model="password" name="password" label="Senha" title="Insira sua senha"
          class="ventiqo-login-container__content-password" :value="password" :required="true" type="password"
          @input="inputPassword" />
        <ventiqo-button class="ventiqo-login-container__content-btn-login" type="submit" title="Entrar">
          <span v-if="buttonState === 'initial'" key="initial">Entrar</span>
          <span v-else-if="buttonState === 'loading'" key="loading"><i class="fas fa-spinner fa-spin"></i></span>
          <span v-else key="success"><i class="fas fa-check"></i></span>

        </ventiqo-button>
      </form>
      <a class="ventiqo-login-container__content-yellow-no-outline" href="#" title="Esqueci minha senha">Esqueceu sua
        senha?</a>
      <h2>ou</h2>
      <ventiqo-button class="ventiqo-container__btn-anonimous" title="Entrar como convidado">Entrar como
        convidado</ventiqo-button>
    </section>
    <section class="ventiqo-logo-container">
      <div class="overlay"></div>
      <img src="../../../assets/logomarca.png" alt="Ventiqo" />
      <div class="parallax-background" :style="backgroundPositionStyle"></div>
    </section>
  </article>
</template>

<script>
import { ref, computed, inject } from 'vue';
import { useReCaptcha } from 'vue-recaptcha-v3';
import VentiqoButton from '@/components/button/vue/VentiqoButton.vue';
import VentiqoInput from '@/components/input/vue/VentiqoInput.vue';
import { verifyCaptcha } from '@/service/authService';

export default {
  components: {
    VentiqoButton,
    VentiqoInput,
  },
  setup() {
    const theme = inject('theme')
    const mouseX = ref(0);
    const mouseY = ref(0);
    const buttonState = ref('initial');
    const verified = ref(false);
    const { executeRecaptcha } = useReCaptcha();

    const handleMouseMove = (event) => {
      mouseX.value = event.clientX;
      mouseY.value = event.clientY;
    };

    const handleSubmit = async () => {
      await verifyCaptchaOnAuth();
      console.log('ENTROU?', verified.value)
    }

    const verifyCaptchaOnAuth = async () => {
      buttonState.value = 'loading';
      const token = await executeRecaptcha('homepage');

      try {
        const isSuccess = await verifyCaptcha(token);
        if (isSuccess) {
          verified.value = true;
          buttonState.value = 'success';
        } else {
          buttonState.value = 'initial';
        }
      } catch (error) {
        console.error('CAPTCHA verification request failed:', error);
        buttonState.value = 'initial';
      }
    };


    const backgroundPositionStyle = computed(() => {
      const parallaxFactorX = -0.05;
      const parallaxFactorY = -0.05;

      const bgPosX = mouseX.value * parallaxFactorX;
      const bgPosY = mouseY.value * parallaxFactorY;

      return {
        transform: `translate(${bgPosX}px, ${bgPosY}px)`,
      };
    });

    return { handleSubmit, handleMouseMove, backgroundPositionStyle, buttonState, verified, verifyCaptchaOnAuth, theme };
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    inputUsername(event) {
      if (!event.target.value) {
        this.username = ''
      } else {
        this.username = event.target.value
      }
    },
    inputPassword(event) {
      if (!event.target.value) {
        this.password = ''
      } else {
        this.password = event.target.value
      }
    }
  },

}
</script>

<style lang="scss">
@import '../sass/LoginContainer.scss';
</style>
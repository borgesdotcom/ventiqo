<template>
  <article class="ventiqo-container" @mousemove="handleMouseMove">
    <section class="ventiqo-login-container">
      <div class="ventiqo-login-container__content">
        <h1>Bem-vindo a <span class="ventiqo-login-container__content-yellow">Ventiqo</span>, </h1>
        <p>Faça login e acompanhe suas postagens! Não tem uma conta ? <a href="#"> clique aqui.</a></p>
      </div>
      <form>
        <ventiqo-input
          v-model="username"
          name="username"
          label="Usuario"
          title="Insira seu usuário"
          class="ventiqo-login-container__content-username"
          :value="username"
          :required="true"
          type="text"
          @input="inputUsername"
        />
        <ventiqo-input
          v-model="password"
          name="password"
          label="Senha"
          title="Insira sua senha"
          class="ventiqo-login-container__content-password"
          :value="password"
          :required="true"
          type="password"
          @input="inputPassword"
        />
        <ventiqo-button class="ventiqo-login-container__content-btn-login" type="submit" title="Entrar">Entrar</ventiqo-button>
      </form>
      <a class="ventiqo-login-container__content-yellow-no-outline" href="#" title="Esqueci minha senha">Esqueceu sua senha?</a>
      <h2>ou</h2>
      <ventiqo-button class="ventiqo-container__btn-anonimous" title="Entrar como convidado">Entrar como convidado</ventiqo-button>
    </section>
    <section class="ventiqo-logo-container">
      <div class="overlay"></div>
      <img src="../../../assets/logomarca.png" alt="Ventiqo"/>
      <div class="parallax-background" :style="backgroundPositionStyle"></div>
    </section>
  </article>
</template>

<script>
import { ref, computed } from 'vue';
import VentiqoButton from '@/components/button/vue/VentiqoButton.vue';
import VentiqoInput from '@/components/input/vue/VentiqoInput.vue';

export default {
  components: {
    VentiqoButton,
    VentiqoInput,
  },
  setup() {
    const mouseX = ref(0);
    const mouseY = ref(0);

    const handleMouseMove = (event) => {
      mouseX.value = event.clientX;
      mouseY.value = event.clientY;
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

    return { handleMouseMove, backgroundPositionStyle };
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
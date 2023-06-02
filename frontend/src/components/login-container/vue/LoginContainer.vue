<template>
  <article class="ventiqo-container">
    <section class="ventiqo-login-container">
      <div class="ventiqo-login-container__content">
        <h1>Bem-vindo a <span class="ventiqo-login-container__content-yellow">Ventiqo</span>, </h1>
        <p>acompanhe suas postagens! Faça <i>login</i> ou crie uma conta <a href="#">aqui</a>.</p>
      </div>
      <form>
        <ventiqo-input
          v-model="username"
          name="username"
          label="Usuario"
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
          class="ventiqo-login-container__content-password"
          :value="password"
          :required="true"
          type="password"
          @input="inputPassword"
        />
        <ventiqo-button class="ventiqo-login-container__content-btn-login" type="submit">Log In</ventiqo-button>
      </form>
      <a class="ventiqo-login-container__content-yellow-no-outline" href="#">Esqueceu sua senha?</a>
      <h2>ou</h2>
      <ventiqo-button class="ventiqo-container__btn-anonimous">Continue como Anonimo</ventiqo-button>
    </section>
    <section class="ventiqo-logo-container">
      <img src="../../../assets/logomarca.png" alt="Ventiqo"/>
    </section>
  </article>
</template>

<script>
import VentiqoButton from '@/components/button/vue/VentiqoButton.vue';
import VentiqoInput from '@/components/input/vue/VentiqoInput.vue';

export default {
  components: {
    VentiqoButton,
    VentiqoInput,
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
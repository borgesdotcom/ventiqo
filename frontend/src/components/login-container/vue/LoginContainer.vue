<template>
  <article class="ventiqo-login-container">
    <section class="ventiqo-login-container__title">
      <h1>Log In</h1>
      <p>Bem-vindo ao <span class="ventiqo-login-container__title-yellow">Ventiqo</span></p> 
    </section>
    <slot />
  </article>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '../sass/LoginContainer.scss';
</style>
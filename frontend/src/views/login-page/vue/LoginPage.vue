<template>
  <div :class="['home', theme]">
    <login-container/>
  </div>
</template>
<script>
import {  inject } from 'vue';
import LoginContainer from '@/components/login-container/vue/LoginContainer.vue';

export default {
  components: {
    LoginContainer,
  },
  setup() {
    window.top.document.title = 'Entrar em Ventiqo / Ventiqo'
    const theme = inject('theme')

    return {
      theme,
    };
  },
};
</script>
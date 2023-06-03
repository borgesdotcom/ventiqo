<template>
  <div id="app">
    <div v-if="loading" class="loading-screen">
      <img src="./assets/logoMaxQuality.jpg" alt="Carregando..." class="spinner" />
    </div>
    <main v-else>
      <router-view></router-view>
      <ThemeSwitch/>
    </main>
  </div>
</template>

<script>
import { inject, ref } from 'vue'
import ThemeSwitch from './components/theme-swich/vue/ThemeSwich.vue'

export default {
  name: 'App',
  components: {
    ThemeSwitch
  },
  setup() {
    const theme = inject('theme')

    const loading = ref(true)

    setTimeout(() => {
      loading.value = false
    }, 2000)

    return {
      theme,
      loading
    }
  },
}
</script>

<style>
.loading-screen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.spinner {
  animation: spin 4s linear infinite;
  max-width: 50px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

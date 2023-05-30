<template>
  <div>
    <main>
      <router-view></router-view>
      <ThemeSwitch/>
    </main>
  </div>
</template>

<script>
import { inject } from 'vue'
import ThemeSwitch from './components/theme-swich/vue/ThemeSwich.vue'

export default {
  name: 'App',
  components: {
    ThemeSwitch
  },
  setup() {
    const theme = inject('theme')

    return {
      theme
    }
  },
}
</script>

<style>
</style>

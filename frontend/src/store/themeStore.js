import { ref } from 'vue'

export const themeStore = {
  install: (app) => {
    const theme = ref('dark')

    const setTheme = (newTheme) => {
      theme.value = newTheme
    }

    app.provide('theme', theme)
    app.provide('setTheme', setTheme)
  }
}

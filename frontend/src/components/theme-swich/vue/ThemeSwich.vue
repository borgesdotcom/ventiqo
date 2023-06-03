<template>
    <div class="theme-switch">
        <div class="switch">
            <input type="checkbox" id="theme-switch" :checked="isDark" @change="toggleTheme">
            <label for="theme-switch" class="slider round" title="Mudar tema">
                <span class="slider round">
                    <span class="icon-wrapper">
                        <span class="icon moon-icon" v-if="isDark">🌙</span>
                        <span class="icon sun-icon" v-if="!isDark">🌞</span>
                    </span>
                </span>
            </label>
        </div>
    </div>
</template>
  
<script>
import { inject, computed } from 'vue'

export default {
    name: 'ThemeSwitch',
    setup() {
        const theme = inject('theme')
        const setTheme = inject('setTheme')

        const isDark = computed(() => theme.value === 'dark')

        const toggleTheme = () => {
            setTheme(isDark.value ? 'light' : 'dark')
        }

        return {
            isDark,
            toggleTheme,
        }
    },
}
</script>

<style lang="scss">
    @import '../sass/ThemeSwich.scss';
</style>

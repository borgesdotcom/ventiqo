<template>
    <div class="home" :class="theme">
        <img class="logo desktop-logo" src="../../../assets/logomarca.png" alt="logo" />
        <div class="centered-block">
            <p>caralhooo</p>
            <post-container></post-container>
        </div>
        <img class="logo mobile-logo" src="../../../assets/logomarca.png" alt="logo" />
    </div>
</template>

<script>
import { inject } from 'vue';
import PostContainer from '@/components/post-container/vue/PostContainer.vue';

export default {
    components: {
        PostContainer
    },
    setup() {
        window.top.document.title = 'Página Inicial / Ventiqo'
        const theme = inject('theme')

        return {
            theme,
        };
    },
};
</script>

<style lang="scss">
@import '../sass/MainPage.scss';
</style>

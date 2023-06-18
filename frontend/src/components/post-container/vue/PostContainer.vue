<template :class="theme">
  <div class="block">
    <form @submit.prevent="handleSubmit">
      <ventiqo-input :maxlength="250" v-model="post" name="post" class="input-post" :value="post"
      label='No que estou pensando ?' :required="true" type="text" @input="$event => inputPost($event)"/>
      <div class="input-post-length">
        <div class="loading-bar-container">
          <div class="loading-bar" :style="{width: (post.length / 250) * 100 + '%'}"></div>
        </div>
      </div>
      <div class="button-container">
        <ventiqo-button class="btn-post" title="Enviar" type="submit"><span class="fa fa-paper-plane"></span></ventiqo-button>
      </div>
    </form>
  </div>
</template>

<script>
import { inject } from 'vue';
import VentiqoButton from '@/components/button/vue/VentiqoButton.vue';
import VentiqoInput from '@/components/input/vue/VentiqoInput.vue';

export default {
  components: {
    VentiqoButton,
    VentiqoInput,
  },
  setup() {
    const theme = inject('theme');

    const handleSubmit = () => {
      console.log('submit');
    }

    return { handleSubmit, theme };
  },
  data() {
    return {
      post: '',
    }
  },
  methods: {
    inputPost(event) {
      let val = event.target.value;
      this.post = val;
    },
  },
}
</script>


<style lang="scss">
@import '../sass/PostContainer.scss';
</style>
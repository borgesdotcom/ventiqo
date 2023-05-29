<template>
    <button
        :type="buttonType"
        :class="['btn', classStyled]"
        @click="onClickButton"
    >
        <slot />
    </button>
</template>

<script>
export default {
  props: {
    classStyled: {
      type: [String, Array],
      required: false,
      default: () => "btn-default",
    },
    buttonType: {
      type: String,
      required: false,
      default: () => "button",
    },
  },
  computed: {
    classes() {
      const isArray = this.classStyle instanceof Array;
      if (isArray) {
        return this.classStyle.join(",");
      }
      return this.classStyle;
    },
  },
  methods: {
    onClickButton(event) {
      this.$emit("on-click", event);
    },
  },
};
</script>

<style lang="scss">
@import '../sass/VentiqoButton.scss'
</style>
<template>
  <div>
    <label
      :for="name"
      :class="[
        'ventiqo-input',
        type,
        {
          valid: validClass,
          invalid: invalidClass,
          'has-content': value,
          disabled: disabled,
        },
      ]"
    >
      <input
        :id="name"
        :name="name"
        :value="value"
        class="ventiqo-input-field"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :autocomplete="autocomplete"
        @input="$emit('input', $event)"
        @focusout="handleFocusOut"
        @keypress="$emit('keypress', $event)"
      />
      <div
        :id="`input-label-${name}`"
        :class="['ventiqo-input-label',
                  {
                    invalid: invalidClass,
                    valid: validClass,
                    default: pattern && required === false,
                  },
                ]"
      >
        {{ label }}
      </div>
      <div
        class="ventiqo-input__icon"
        @click="$emit('clear')"
        @keyup.esc="$emit('clear')"
      >
        <span
          v-if="iconValidation"
          class="ventiqo-icon"
          aria-hidden="true"
        >
          <i
            :class="valid ? 'icon-done' : 'icon-warning'"
          />
        </span>

        <span
          v-if="closeButton && disabled === false && value != '' && clearButton != false"
          class="ventiqo-icon"
          aria-hidden="true"
        >
          <i
            :class="'icon-close'"
          />
        </span>

      </div>
    </label>
    <div
      v-if="valid != null && closeButton === false && disabled === false"
      :id="idAlertLabel"
      role="alert"
      :class="['ventiqo-input-alert-msg',
                { valid: valid, invalid: !valid }]"   
    >
      {{ msgAlertValidation }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    pattern: {
      type: RegExp,
      required: false,
      default: () => /[a-zA-z0-9]*@(.)*.([a-z]){2,3}?([a-z]){2}/,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    valid: {
      type: [Boolean, null],
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    msgAlertValid: {
      type: String,
      required: false,
      default: () => ''
    },
    msgAlertInvalid: {
      type: String,
      required: false,
      default: () => ''
    },
    msgRequiredAlert: {
      type: String,
      required: false,
      default: 'Digite o campo',
    },
    resetValidation: {
      type: Boolean,
      default: false,
    },
    clearButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      closeButton: false,
      showMsg: false,
    }
  },
  computed: {
    msgAlertValidation() {
      if (this.valid === true && this.msgAlertValid && this.closeButton === false) {
        return this.msgAlertValid
      }

      if (
        this.valid === false
        && this.msgAlertInvalid
        && this.value !== ''
        && this.closeButton === false
      ) {
        return this.msgAlertInvalid
      }

      if (
        this.valid === false
        && this.required === true
        && this.msgRequiredAlert
        && this.value === ''
        && this.closeButton === false
      ) {
        return this.msgRequiredAlert
      }
      return undefined
    },
    iconValidation() {
      return (
        (this.required === true
         || (this.required === false && this.value !== ''))
        && (this.pattern || (this.required && this.value !== 'SN'))
        && (this.valid === false || this.valid === true)
        && this.closeButton === false
        && this.disabled === false
      )
    },
    invalidClass() {
      return (
        (this.required === true
         || (this.required === false && this.value !== ''))
        && this.valid != null
        && !this.valid
        && this.closeButton === false
        && this.disabled === false
      )
    },
    validClass() {
      return (
        (this.required === true
         || (this.required === false && this.value !== ''))
        && this.valid
        && this.closeButton === false
        && this.disabled === false
      )
    },
    idAlertLabel() {
      return `ventiqo-input-msg-alert-${this.name}`
    },
  },
  watch: {
    value() {
      if (this.resetValidation === false) {
        if (this.clearButton !== true) {
          if (this.disabled === false) {
            const regex = new RegExp(this.pattern)
            const regexValidation = regex.test(this.value)
            this.$emit('update:valid', regexValidation)
            return regexValidation
          }
          return undefined
        }
        if (this.value !== 'SN') {
          this.closeButton = true
        }
      } else if (this.clearButton !== true) {
        this.$emit('update:resetValidation', false)
      }
    },
    disabled() {
      if (this.resetValidation === false && this.clearButton === true) {
        this.handleFocusOut()
      }
    },
  },
  methods: {
    handleFocusOut() {
      if (this.disabled === false) {
        const regex = new RegExp(this.pattern)
        const regexValidation = regex.test(this.value)
        this.$emit('update:valid', regexValidation)
        return regexValidation
      }
      return undefined
    },
  },
}
</script>

<style lang="scss">
@import '../sass/VentiqoInput.scss';
</style>
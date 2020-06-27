<template lang="pug">
  label.checkbox
    input(type="checkbox" v-model="model" :value="val" @change="$emit('input', result)").checkbox__field
    .checkbox__fake
      Icons(name="checkbox").checkbox__icon
</template>

<script>
  import Icons from './Icons'
  export default {
      name: 'Checkbox',
      props: ['value', 'val'],
      components: {
        Icons
      },
      data () {
        return {
          checkedProxy: false,
          message: 'Слава Одину, Checkbox работает!',
          result: false
        }
      },
      computed: {
        model: {
          get () {
            return this.value
          },
          set (val) {
            this.result = val
          }
        }
      }
    }
</script>

<style scoped lang="sass">
  .checkbox
    display: inline-block
    cursor: pointer
  .checkbox__field
    display: none
    &:checked + .checkbox__fake
      border-color: #00A11E
      .checkbox__icon
        opacity: 1
  .checkbox__fake
    width: 0.875em
    height: 0.875em
    cursor: pointer
    transition-duration: 0.3s
    border: 1px solid #C6CBD4
    border-radius: 1px
    overflow: hidden
  .checkbox__icon
    display: inline-block
    width: 100%
    height: 100%
    transition-duration: 0.3s
    opacity: 0
    fill: #00A11E
</style>

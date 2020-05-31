<template>
  <div id="app">
    <h1><a href="https://www.figma.com/file/jSjeMxTorX3tO2YqJP8sdZ" target="_blank">Table UI</a> | <a href="https://paper.dropbox.com/doc/Vue.js--AyExgaHEe80wg~WW8POCkrDpAg-GdUBmChbMHVOrnrMdsu3j" target="_blank">ТЗ</a></h1>
    <TableUI></TableUI>
  </div>
</template>
<script>
  import TableUI from '@/components/Table'
  export default {
    components: {
      TableUI
    },
    mounted () {
      this.$store.dispatch('products')
    }
  }
</script>
<style lang="sass">
body
  background-color: #F2F2F2

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

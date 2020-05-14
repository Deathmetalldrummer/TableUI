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
</style>

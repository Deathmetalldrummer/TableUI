<template lang="pug">
  .table
    div(v-if='!products') Empty
    table(v-if='products')
      thead
        tr
          th
            .th
              input(type="checkbox")
          th(v-for="item in productsHeader")
            .th {{item[1]}}
      tbody
        tr(v-for='product in products')
          td
            .td
              input(type="checkbox")
          td(v-for='item in productsHeader')
            .td {{product[item[0]]}}
</template>

<script>
    export default {
        name: 'TableUI',
        data () {
            return {
              message: 'Слава Одину, Table работает!',
              productsHeader: [
                ['product', 'Product(100g serving)'],
                ['calories', 'Calories'],
                ['fat', 'Fat (g)'],
                ['carbs', 'Carbs (g)'],
                ['protein', 'Protein (g)'],
                ['iron', 'Iron (%)']
              ]
            }
        },
        computed: {
          products () {
            return this.$store.getters.products
          }
        }
    }
</script>

<style scoped lang="sass">
table
  background-color: #fff
  border-radius: 4px
  width: 100%
  border-collapse: collapse
th
  text-align: left
th:first-of-type,
td:first-of-type
  .td,
  .th
    padding-left: 1em
.td,.th
  padding: 0.5em
thead
  box-shadow: 0 1px 0 0 #D5DAE0
tbody tr
  cursor: pointer
  &:nth-of-type(even)
    background-color: #F8F9FA
  &:hover
    background-color: rgba(0, 161, 30, 0.07)
</style>

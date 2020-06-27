<template lang="pug">
  .table
    div(v-if='!products') Empty
    table(v-if='products')
      thead
        tr
          th
            .th
              Checkbox(v-model="checkbox" @click.native="checkAllChanged($event)")
          th(v-for="item in productsHeader")
            .th {{item[1]}}
      tbody
        tr(v-for='product in products')
          td
            .td
              Checkbox(v-model="checkboxes" :val="product.id")
          td(v-for='item in productsHeader')
            .td {{product[item[0]]}}
</template>

<script>
    import Icons from './Icons'
    import Checkbox from './Checkbox'
    export default {
        name: 'TableUI',
        components: {
          Checkbox,
          Icons
        },
        data () {
            return {
              checkboxes: [],
              checkbox: false,
              message: 'Слава Одину, Table работает!',
              productsHeader: [
                ['product', 'Product(100g serving)'],
                ['calories', 'Calories'],
                ['fat', 'Fat (g)'],
                ['carbs', 'Carbs (g)'],
                ['protein', 'Protein (g)'],
                ['iron', 'Iron (%)']
              ],
              timeout: null
            }
        },
        computed: {
          products () {
            return this.$store.getters.products
          }
        },
        methods: {
          rowEvent (event) {
            // if (window.getSelection().toString() !== '') return
            const input = event.currentTarget.querySelector('input')
            if (event.target !== input) {
              input.click()
              this.checkbox = this.products.length === this.checkboxes.length
              // input.checked = !input.checked
            }
          },
          checkAllChanged (event) {
            if (typeof event.target.checked === 'boolean') {
              this.checkboxes = event.target.checked ? this.products.map(item => item.id) : []
            }
          }
        },
        watch: {
          checkboxes () {
            const checkbox = this.products.length === this.checkboxes.length
            if (checkbox !== this.checkbox) {
              this.checkbox = checkbox
            }
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

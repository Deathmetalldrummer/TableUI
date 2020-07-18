<template lang="pug">
  .sorting
    span.sorting__.sorting__title Sorting by:
    button.btn.sorting__(type="button" v-for="item of sorting" @click="change(item)" :class="getClass(item)") {{item.name}}
</template>

<script>
    export default {
        name: 'Sorting',
        props: ['list', 'active'],
        data () {
            return {
                message: 'Слава Одину, Sorting работает!',
                sorting: this.list,
                sortingActive: this.active || this.list[0].value
            }
        },
      methods: {
          change (value) {
            this.sortingActive = value.value
            this.$emit('changed', value)
          },
          getClass (item) {
            return {
              btn_depressed: item.value === this.sortingActive,
              btn_text: item.value !== this.sortingActive
            }
          }
      }
    }
</script>

<style scoped lang="sass">
  .sorting__title
    font-weight: bold
    margin-right: 0.5em
</style>

<template lang="pug">
	ul.droplist
		li.droplist__li
			Checkbox(v-model="checkbox" title="Select All"  @click.native="checkAllChanged($event)").droplist__item.droplist__item_selectAll
		li(v-for="item in list").droplist__li
			Checkbox(v-model="checkboxes" :val="item" :title="item.name").droplist__item
</template>

<script>
	import Checkbox from './Checkbox'

	export default {
		name: 'DroplistCheckbox',
		props: ['list'],
		components: {
			Checkbox
		},
		data () {
			return {
				checkbox: false,
				checkboxes: this.list || [],
				message: 'Слава Одину, DroplistCheckbox работает!'
			}
		},
		methods: {
			checkAllChanged (event) {
				if (typeof event.target.checked === 'boolean') {
					this.checkboxes = event.target.checked ? this.list : []
				}
			}
		},
		watch: {
			checkboxes () {
				const checkbox = this.list.length === this.checkboxes.length
				if (checkbox !== this.checkbox) {
					this.checkbox = checkbox
				}
				this.$emit('selected', this.checkboxes)
			}
		}
	}
</script>

<style scoped lang="sass">
	.droplist
		list-style: none
		margin: 0
		padding: 0.5em 0

	.droplist__item
		display: block
		padding: 0.5em 1em
		white-space: nowrap

		&_selectAll
			font-weight: bold

		&:hover
			background-color: #eee

</style>

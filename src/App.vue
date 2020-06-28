<template>
	<div id="app">
		<h1><a href="https://www.figma.com/file/jSjeMxTorX3tO2YqJP8sdZ" target="_blank">Table UI</a> | <a
			href="https://paper.dropbox.com/doc/Vue.js--AyExgaHEe80wg~WW8POCkrDpAg-GdUBmChbMHVOrnrMdsu3j"
			target="_blank">ТЗ</a></h1>
		<div class="tableBar">
			<div class="tableBar__">Sort</div>
			<div class="tableBar__">Del</div>
			<div class="tableBar__">
				<Dropdown :list="dropdownList" :title="dropdownTitle" @value="dropdownSelected($event)"></Dropdown>
			</div>
			<div class="tableBar__">Pagination</div>
			<div class="tableBar__">
				<DropdownCheckbox :list="dropdownCheckboxesList" :title="dropdownCheckboxesTitle" @selected="dropdownCheckboxesSelected($event)"></DropdownCheckbox>
			</div>
		</div>
		<TableUI></TableUI>
	</div>
</template>
<script>
	import TableUI from '@/components/Table'
	import Dropdown from '@/components/Dropdown'
	import DropdownCheckbox from '@/components/DropdownCheckbox'

	export default {
		components: {
			TableUI,
			Dropdown,
			DropdownCheckbox
		},
		data () {
			return {
				dropdownList: [10, 15, 20, 25],
				dropdownTitle: '10 Per Page',
				dropdownCheckboxesList: [
					{
						name: 'Product(100g serving)',
						value: 'product'
					}, {
						name: 'Calories',
						value: 'calories'
					}, {
						name: 'Fat (g)',
						value: 'fat'
					}, {
						name: 'Carbs (g)',
						value: 'carbs'
					}, {
						name: 'Protein (g)',
						value: 'protein'
					}, {
						name: 'Iron (%)',
						value: 'iron'
					}],
				dropdownCheckboxesTitle: '0 columns selected',
				showDropbox: false
			}
		},
		mounted () {
			this.$store.dispatch('products')
			this.dropdownCheckboxesTitle = this.dropdownCheckboxesList.length + ' columns selected'
		},
		methods: {
			dropdownCheckboxesSelected (value) {
				this.dropdownCheckboxesTitle = value.length + ' columns selected'
			},
			dropdownSelected (value) {
				this.dropdownTitle = value + ' Per Page'
			}
		}
	}
</script>
<style lang="sass">
	@import './assets/sass/glob'
	body
		background-color: #F2F2F2
	.tableBar
		display: flex
		justify-content: space-between
		align-content: center
		border-top: 1px solid $border_color_base
		padding: 1em 0
	.tableBar__
		flex-shrink: 0
		&:first-of-type
			flex-grow: 1
		&+&
			margin-left: 1em
</style>

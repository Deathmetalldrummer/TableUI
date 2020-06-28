<template>
	<div id="app">
		<h1><a href="https://www.figma.com/file/jSjeMxTorX3tO2YqJP8sdZ" target="_blank">Table UI</a> | <a
			href="https://paper.dropbox.com/doc/Vue.js--AyExgaHEe80wg~WW8POCkrDpAg-GdUBmChbMHVOrnrMdsu3j"
			target="_blank">ТЗ</a></h1>
		<Dropdown :list="dropdownList" :title="dropdownTitle" @value="dropdownSelected($event)"></Dropdown>
		<DropdownCheckbox :list="dropdownCheckboxesList" :title="dropdownCheckboxesTitle"
							@selected="dropdownCheckboxesSelected($event)"></DropdownCheckbox>
		<DropdownSimple :title="dropdownTitle">
			<Droplist :list="dropdownList" @value="dropdownSelected($event)"></Droplist>
		</DropdownSimple>
		<DropdownSimple :title="dropdownCheckboxesTitle">
			<DroplistCheckbox :list="dropdownCheckboxesList"
								@selected="dropdownCheckboxesSelected($event)"></DroplistCheckbox>
		</DropdownSimple>
		<br>
		<br>
		<br>
		<TableUI></TableUI>
	</div>
</template>
<script>
	import TableUI from '@/components/Table'
	import Dropdown from '@/components/Dropdown'
	import DropdownCheckbox from '@/components/DropdownCheckbox'
	import DropdownSimple from '@/components/DropdownSimple'
	import DroplistCheckbox from '@/components/DroplistCheckbox'
	import Droplist from '@/components/Droplist'

	export default {
		components: {
			TableUI,
			Dropdown,
			DropdownCheckbox,
			DropdownSimple,
			DroplistCheckbox,
			Droplist
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
</style>

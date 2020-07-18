<template>
	<div id="app">
		<h1><a href="https://www.figma.com/file/jSjeMxTorX3tO2YqJP8sdZ" target="_blank">Table UI</a> | <a
			href="https://paper.dropbox.com/doc/Vue.js--AyExgaHEe80wg~WW8POCkrDpAg-GdUBmChbMHVOrnrMdsu3j"
			target="_blank">ТЗ</a></h1>
		<div class="tableBar">
			<div class="tableBar__">
				<Sorting :list="dropdownCheckboxesList"></Sorting>
			</div>
			<div class="tableBar__">
				<button class="btn" disabled>Delete</button>
			</div>
			<div class="tableBar__">
				<Dropdown :list="dropdownList" :title="dropdownTitle" @value="dropdownSelected($event)"></Dropdown>
			</div>
			<div class="tableBar__">
				<Pagination :perPage="perPage" :length="productCount"></Pagination>
			</div>
			<div class="tableBar__">
				<DropdownCheckbox :list="dropdownCheckboxesList" :title="dropdownCheckboxesTitle" @selected="dropdownCheckboxesSelected($event)"></DropdownCheckbox>
			</div>
		</div>
		<TableUI @action="log($event)">
			<div slot="action" class="tableAction">
				<Icons name="del" class="tableAction__icon"></Icons>
				<span class="tableAction__text">delete</span>
			</div>
		</TableUI>
	</div>
</template>
<script>
	import TableUI from '@/components/Table'
	import Dropdown from '@/components/Dropdown'
	import DropdownCheckbox from '@/components/DropdownCheckbox'
	import Pagination from '@/components/Pagination'
	import Icons from '@/components/Icons'
	import Sorting from '@/components/Sorting'

	export default {
		components: {
			TableUI,
			Dropdown,
			DropdownCheckbox,
			Pagination,
			Icons,
			Sorting
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
				showDropbox: false,
				perPage: 10
			}
		},
		computed: {
			productCount () { return this.$store.getters.productsCount }
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
				this.perPage = value
				this.dropdownTitle = value + ' Per Page'
			},
			log (value) {
				console.log(123, value.id)
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
	.tableAction
		font-size: 1em
		display: flex
		justify-content: center
		align-items: center
		color: $color_light
		fill: $color_light
		cursor: pointer
	.tableAction__icon
		width: 1em
		margin-right: 5px
	.tableAction__text
</style>

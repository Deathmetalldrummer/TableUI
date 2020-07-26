<template>
	<div id="app">
		<h1><a href="https://www.figma.com/file/jSjeMxTorX3tO2YqJP8sdZ" target="_blank">Table UI</a> | <a
			href="https://paper.dropbox.com/doc/Vue.js--AyExgaHEe80wg~WW8POCkrDpAg-GdUBmChbMHVOrnrMdsu3j"
			target="_blank">ТЗ</a></h1>
		<div class="tableBar_wrap">
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
		</div>
		<TableUI @action="tableActionEvent($event)">
			<div slot="action" class="tableAction" @click="onTableAction($event)">
				<Icons name="del" class="tableAction__icon"></Icons>
				<span class="tableAction__text">delete</span>
			</div>
		</TableUI>
		<Confirm :el="elem" @confirm="confirmRespond($event)">Are you sure you want to <b>delete item</b>?
		</Confirm>
	</div>
</template>
<script>
	import TableUI from '@/components/Table'
	import Dropdown from '@/components/Dropdown'
	import DropdownCheckbox from '@/components/DropdownCheckbox'
	import Pagination from '@/components/Pagination'
	import Icons from '@/components/Icons'
	import Sorting from '@/components/Sorting'
	import Confirm from '@/components/Confirm'

	export default {
		components: {
			TableUI,
			Dropdown,
			DropdownCheckbox,
			Pagination,
			Icons,
			Sorting,
			Confirm
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
				perPage: 10,
				elem: null,
				actionItem: null
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
			tableActionEvent (value) {
				this.actionItem = value
			},
			onTableAction (event) {
				this.elem = {
					el: event.currentTarget,
					random: Math.random()
				}
			},
			confirmRespond (value) {
				console.log(this.actionItem, value)
			}
		}
	}
</script>
<style lang="sass">
	@import './assets/sass/glob'
	body
		background-color: #F2F2F2
	.tableBar_wrap
		border-top: 1px solid $border_color_base
	.tableBar
		display: flex
		flex-flow: row wrap
		justify-content: space-between
		align-content: center
		margin: 0 -0.5em
		padding: 0.5em 0
	.tableBar__
		flex-shrink: 0
		padding: 0.5em
		&:first-of-type
			flex-grow: 1
	.tableAction
		font-size: 1em
		display: flex
		justify-content: center
		align-items: center
		color: $color_light
		fill: $color_light
		cursor: pointer
		position: relative
		&:hover
			.tableAction__confirm
				display: block
	.tableAction__icon
		width: 1em
		margin-right: 5px
	.tableAction__text
	.tableAction__confirm
		z-index: 9999
		top: 100%
		display: none
		position: absolute
</style>

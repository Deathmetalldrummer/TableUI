<template>
	<div id="app">
		<h1><a href="https://www.figma.com/file/jSjeMxTorX3tO2YqJP8sdZ" target="_blank">Table UI</a> | <a
			href="https://paper.dropbox.com/doc/Vue.js--AyExgaHEe80wg~WW8POCkrDpAg-GdUBmChbMHVOrnrMdsu3j"
			target="_blank">ТЗ</a></h1>
		<div class="tableBar_wrap">
			<div class="tableBar">
				<div class="tableBar__">
					<Sorting :list="productsHeaderSelected" @changed="sortingChanged($event)"></Sorting>
				</div>
				<div class="tableBar__">
					<button :class="{'btn': true, 'btn_depressed': !deleteBtnDisabled}" :disabled="deleteBtnDisabled" @click="showConfirm($event, 'array')">
						{{deleteBtnText}}
					</button>
				</div>
				<div class="tableBar__">
					<Dropdown :list="dropdownList" :title="dropdownTitle" @value="dropdownSelected($event)"></Dropdown>
				</div>
				<div class="tableBar__">
					<Pagination :perPage="perPage" :length="productCount" @change="pagination($event)"></Pagination>
				</div>
				<div class="tableBar__">
					<DropdownCheckbox :list="productsHeader" :title="dropdownCheckboxesTitle" @selected="dropdownCheckboxesSelected($event)"></DropdownCheckbox>
				</div>
			</div>
		</div>
		<TableUI
			@action="tableActionEvent($event)"
			:body="productsPerPage"
			:header="productsHeaderSelected"
			:sortBy="sortValue"
			@checked="checkedEvent($event)">
			<div slot="action" class="tableAction" @click="showConfirm($event, 'item')">
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
				dropdownCheckboxesTitle: '0 columns selected',
				showDropbox: false,
				perPage: 10,
				elem: null,
				deleteType: null, // null | 'item' | 'array'
				actionItem: null,
				checked: null,
				paginationValue: null,
				productsHeaderSelectedValue: null,
				sortValue: null
			}
		},
		computed: {
			productCount () { return this.$store.getters.productsCount },
			products () { return this.$store.getters.products },
			productsHeader () { return this.$store.getters.productsHeader },
			productsPerPage () {
				const from = this.paginationValue && (this.paginationValue._from - 1)
				const to = this.paginationValue && (this.paginationValue._to)
				return this.products && this.products.slice(from, to)
			},
			deleteBtnText () { return 'Delete' + (!this.deleteBtnDisabled ? ` (${this.checked.length})` : '') },
			deleteBtnDisabled () { return !(this.checked && this.checked.length) },
			productsHeaderSelected: {
				set (value) { this.productsHeaderSelectedValue = value },
				get () { return this.productsHeaderSelectedValue || this.productsHeader }
			}
		},
		mounted () {
			this.$store.dispatch('products')
			this.dropdownCheckboxesTitle = this.productsHeader && this.productsHeader.length + ' columns selected'
		},
		methods: {
			dropdownCheckboxesSelected (value) {
				this.productsHeaderSelected = value
				this.dropdownCheckboxesTitle = value.length + ' columns selected'
			},
			dropdownSelected (value) {
				this.perPage = value
				this.dropdownTitle = value + ' Per Page'
			},
			tableActionEvent (value) {
				this.actionItem = value
			},
			showConfirm (event, type) {
				this.deleteType = type
				this.elem = {
					el: event.currentTarget,
					random: Math.random()
				}
			},
			confirmRespond (value) {
				if (value && this.deleteType) {
					if (this.deleteType === 'array') {
						this.checked.map((item) => this.$store.dispatch('deleteProduct', item))
					}
					if (this.deleteType === 'item') {
						this.$store.dispatch('deleteProduct', this.actionItem.id)
					}
					this.deleteType = null
				}
			},
			pagination (value) {
				this.paginationValue = value
			},
			checkedEvent (value) {
				this.checked = value
			},
			sortingChanged (value) {
				this.sortValue = value && value.value
			}
		}
	}
</script>
<style lang="sass">
	@import './assets/sass/glob'
	html, body
		font-size: 16px
	body
		padding: 1em 3em 2em
		background-color: #F2F2F2
		font-family: 'Source Sans Pro', sans-serif
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

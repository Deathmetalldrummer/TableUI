<template lang="pug">
	.table
		div(v-if='!showTable') Empty
		table(v-if='showTable')
			thead
				tr
					th.col__checkbox
						.th
							Checkbox(v-model="checkbox" @click.native="checkAllChanged($event)")
					th(v-for="item in headerSorted")
						.th.th__sorting(@click="sortChange(item.value)" :class="{'th__sorting_active': sort && sort.type && sort.value === item.value}") {{item.name}}
							Icons.th__sortingIcon(v-if="sort && sort.value === item.value" :name="sort.type === 'DESC' ? 'arrowDown' : 'arrowUp'")
					th(v-if='$slots.action')
			tbody
				tr(v-for='product in bodySorted')
					td.col__checkbox
						.td
							Checkbox(v-model="checkboxes" :val="product.id" @click.native="checked()")
					td(v-for='item in headerSorted')
						.td {{product[item.value]}}
					td(v-if='$slots.action').td__action
						.td(@click="actionEvent($event, product)")
							slot(name="action")
</template>

<script>
	import Checkbox from './Checkbox'
	import Icons from './Icons'

	export default {
		name: 'TableUI',
		props: {
			header: {
				type: Array,
				default: () => []
			},
			body: {
				type: Array,
				default: () => []
			},
			sortBy: {
				type: String,
				default: null
			}
		},
		components: {
			Checkbox,
			Icons
		},
		data () {
			return {
				checkboxes: [],
				checkbox: false,
				message: 'Слава Одину, Table работает!',
				timeout: null,
				sort: null,
				sortBodyMethod: (prev, next) => {
					if (this.sort && prev[this.sort.value] > next[this.sort.value]) {
						return this.sort.type === 'ASC' ? 1 : -1
					}
					if (this.sort && prev[this.sort.value] < next[this.sort.value]) {
						return this.sort.type === 'DESC' ? 1 : -1
					}
					return 0
				},
				sortHeaderMethod: (prev, next) => {
					if (!this.sortBy) return 0
					return prev.value === this.sortBy ? -1 : 1
				}
			}
		},
		computed: {
			showTable () { return this.body && this.body.length && this.header && this.header.length },
			bodySorted () {
				const body = JSON.parse(JSON.stringify(this.body))
				return body.sort(this.sortBodyMethod)
			},
			headerSorted () {
				const header = JSON.parse(JSON.stringify(this.header))
				return header.sort(this.sortHeaderMethod)
			}
		},
		methods: {
			rowEvent (event) {
				// if (window.getSelection().toString() !== '') return
				const input = event.currentTarget.querySelector('input')
				if (event.target !== input) {
					input.click()
					this.checkbox = this.body.length === this.checkboxes.length
					// input.checked = !input.checked
				}
			},
			checkAllChanged (event) {
				if (typeof event.target.checked === 'boolean') {
					this.checkboxes = event.target.checked ? this.body.map(item => item.id) : []
					this.$emit('checked', this.checkboxes)
				}
			},
			actionEvent (event, product) {
				event.stopPropagation()
				this.$emit('action', product)
			},
			checked () {
				setTimeout(() => {
					this.$emit('checked', this.checkboxes)
				}, 10)
			},
			sortChange (value) {
				if (value === this.sortBy || !this.sortBy) {
					if (this.sort && this.sort.value !== value) { this.sort = null }
					if (this.sort && this.sort.type === 'DESC') {
						this.sort = null
						return
					}
					this.sort = {
						type: this.sort ? 'DESC' : 'ASC',
						value: value
					}
				}
			}
		},
		watch: {
			checkboxes () {
				const checkbox = this.body.length === this.checkboxes.length
				if (checkbox !== this.checkbox) {
					this.checkbox = checkbox
					console.log(this.checkboxes)
				}
			}
		}
	}
</script>

<style scoped lang="sass">
	@import '../assets/sass/variable'
	table
		font-size: 0.875rem
		line-height: 1.7
		background-color: #fff
		border-radius: (1em/4)
		width: 100%
		border-collapse: collapse

	th
		text-align: left

	th:first-of-type,
	td:first-of-type
		.td,
		.th
			padding-left: 2.6em
			padding-right: 1.4em

	th:last-of-type,
	td:last-of-type
		.td
			padding-right: 2.6em

	.col__checkbox
		width: 1px
	.th__sorting
		cursor: pointer
		display: flex
		align-items: center
		transition-duration: 0.3s
		&_active
			color: $accent
	.th__sortingIcon
		width: 0.6em
		margin-left: 0.5em
	.th
		padding: 1.1em 0.5em
	.td
		padding: 0.85em 0.5em

	thead
		box-shadow: 0 1px 0 0 #D5DAE0

	tbody tr
		cursor: pointer

		&:nth-of-type(even)
			background-color: #F8F9FA

		&:hover
			background-color: rgba(0, 161, 30, 0.07)

	.td__action
		width: 1px
		opacity: 0
		transition-duration: 0.3s
		tr:hover &
			opacity: 1
</style>

<template lang="pug">
	.dropdown(v-click-outside="close")
		button(type="button" @click="showList = !showList" :class="{'dropdown__action_active': showList}").btn.dropdown__action
			span.btn__text {{title}}
			Icons(name="chevronDown").btn__icon.dropdown__icon
		transition(name="fade")
			.dropdown__dropbox(v-if="showList")
				ul.dropdownCheckboxes
					li.dropdownCheckboxes__li
						Checkbox(v-model="checkbox" title="Select All"  @click.native="checkAllChanged($event)").dropdownCheckboxes__item.dropdownCheckboxes__item_selectAll
					li(v-for="item in list").dropdownCheckboxes__li
						Checkbox(v-model="checkboxes" :val="item" :title="item.name").dropdownCheckboxes__item
</template>

<script>
	import Checkbox from './Checkbox'
	import Icons from './Icons'

	export default {
		name: 'DropdownCheckbox',
		props: ['list', 'title', 'showDropbox'],
		components: {
			Checkbox,
			Icons
		},
		data () {
			return {
				checkbox: true,
				checkboxes: this.list || [],
				showList: this.showDropbox || false,
				message: 'Слава Одину, DropdownCheckbox работает!'
			}
		},
		methods: {
			checkAllChanged (event) {
				if (typeof event.target.checked === 'boolean') {
					this.checkboxes = event.target.checked ? this.list : []
				}
			},
			close () {
				if (this.showList) {
					this.showList = false
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
@import '../assets/sass/variable'
.dropdown
	position: relative
	display: inline-block

.dropdown__action
	&_active
		.dropdown__icon
			transform: scaleY(-1)
.dropdown__icon
	width: 0.7em
	height: 0.5em
	transition-duration: $dropdown_transition
.dropdown__dropbox
	position: absolute
	z-index: 999
	top: 100%
	right: 0
	min-width: 100%
	margin-top: 13px
	background-color: #fff
	box-shadow: $box_shadow
	border-radius: 4px
	max-height: 15em
	overflow: auto

.dropdownCheckboxes
	list-style: none
	margin: 0
	padding: 0.5em 0

.dropdownCheckboxes__item
	display: block
	padding: 0.5em 1em
	white-space: nowrap

	&_selectAll
		font-weight: bold

	&:hover
		background-color: #eee
</style>

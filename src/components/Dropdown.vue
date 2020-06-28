<template lang="pug">
	.dropdown(v-click-outside="close")
		button(type="button" @click="showList = !showList" :class="{'dropdown__action_active': showList}").dropdown__action {{title}}
		transition(name="fade")
			.dropdown__dropbox(v-if="showList")
				ul.dropdown__list
					li.dropdown__item(v-for="item in list" @click="selected(item)") {{item}}
</template>

<script>
	export default {
		name: 'Dropdown',
		props: ['list', 'title'],
		data () {
			return {
				message: 'Слава Одину, Dropdown работает!',
				showList: false
			}
		},
		methods: {
			selected (item) {
				this.$emit('value', item)
				this.showList = false
			},
			close () {
				if (this.showList) {
					this.showList = false
				}
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
	font-family: "Source Sans Pro", serif
	font-size: 0.875em
	line-height: 1.5
	color: $color_light
	background-color: transparent
	border: 1px solid $border_color_base
	border-radius: 2px
	padding: 0.286em 1em
	outline: none
	cursor: pointer
	transition-duration: $dropdown_transition

	&_active,
	&:focus
		border-color: $color_light

.dropdown__dropbox
	position: absolute
	top: 100%
	left: 0
	min-width: 100%
	margin-top: 13px
	background-color: #fff
	box-shadow: $box_shadow
	border-radius: 4px
	max-height: 15em
	overflow: auto

.dropdown__list
	list-style: none
	padding: 0
	margin: 0
	background-color: #fff

.dropdown__item
	cursor: pointer
	padding: 0.3em 1em
	transition-duration: 0.3s

	&:hover
		background-color: #eee
</style>

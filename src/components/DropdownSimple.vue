<template lang="pug">
	.dropdown(v-click-outside="close")
		button(type="button" @click="show = !show" :class="{'dropdown__action_active': show}").dropdown__action {{title}}
		transition(name="fade")
			.dropdown__dropbox(v-if="show")
				slot
</template>

<script>
	export default {
		name: 'DropdownSimple',
		props: ['title', 'showDropbox'],
		data () {
			return {
				message: 'Слава Одину, DropdownSimple работает!',
				show: this.showDropbox || false
			}
		},
		methods: {
			close () {
				if (this.show) {
					this.show = false
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
</style>

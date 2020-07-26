<template lang="pug">
	.dropdown(v-click-outside="close")
		button(type="button" @click="show = !show" :class="{'dropdown__action_active': show}").btn.dropdown__action
			span.btn__text {{title}}
			Icons(name="chevronDown").btn__icon.dropdown__icon
		transition(name="fade")
			.dropdown__dropbox(v-if="show")
				slot
</template>

<script>
	import Icons from './Icons'

	export default {
		name: 'DropdownSimple',
		props: ['title', 'showDropbox'],
		components: { Icons },
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
		left: 0
		min-width: 100%
		margin-top: 13px
		background-color: #fff
		box-shadow: $box_shadow
		border-radius: 4px
		max-height: 15em
		overflow: auto
</style>

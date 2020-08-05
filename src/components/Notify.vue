<template lang="pug">
	.notify
		transition-group(name="notifyListAnimate" tag="div")
			.notify__.notifyItemAnimate(v-for="item in notify" :key="item.id" :class="`notify__${item.type}`")
				.notify__header
					h4.notify__title {{item.title}}
					span.notify__close(@click="notifyClose(item.id)") +
				p.notify__body {{item.body}}
</template>
<script>
	export default {
		name: 'Notify',
		data () {
			return {
				message: 'Слава Одину, Notify работает!'
			}
		},
		computed: {
			notify () { return this.$store.getters.notify }
		},
		methods: {
			notifyClose (id) {
				this.$store.dispatch('notifyDel', id)
			}
		}
	}
</script>

<style scoped lang="sass">
	@import '../assets/sass/variable'

	.notify
		position: fixed
		right: 1em
		top: 1em
		display: flex
		flex-flow: column-reverse nowrap
		justify-content: end
		width: 22em
	.notify__
		padding: 0.5em 1em 1em
		border-radius: (1em/4)
		color: #fff
		border: 1px solid transparent
		&+&
			margin-top: 1em
		&success
			border-color: darken($accent, 10%)
			background-color: $accent
		&warning
			border-color: darken(#ff520c, 10%)
			background-color: #ff520c

	.notify__header
		display: flex
		justify-content: space-between
		align-items: center
		margin-bottom: 0.5em
	.notify__title
		flex-grow: 1
		margin: 0
	.notify__close
		flex-shrink: 0
		font-size: 2em
		width: 0.5em
		height: 0.5em
		transform: rotate(45deg)
		cursor: pointer
		display: inline-flex
		justify-content: center
		align-items: center
		border-radius: 50%
	.notify__body
		margin: 0

	.notifyItemAnimate
		transition: all 0.5s
	.notifyListAnimate-enter, .notifyListAnimate-leave-to
		opacity: 0
		transform: translateY(-10em)
	.notifyListAnimate-leave-active
		position: absolute
</style>

<template lang="pug">
	.confirm_wrap(ref="confirm" :class="{'confirm_wrap_active': display}")
		.confirm(v-click-outside="close")
			.confirm__.confirm__body
				slot
			.confirm__.confirm__action
				button.btn.confirm__cancel(@click="action(false)") Cancel
				button.btn.btn_depressed.confirm__confirm(@click="action(true)") Confirm
</template>

<script>
	export default {
		name: 'Confirm',
		props: {
			text: {
				type: String,
				default: 'Are you sure?'
			},
			el: {
				type: Object
			}
		},
		data () {
			return {
				message: 'Слава Одину, Confirm работает!',
				display: false,
				elParent: null,
				parentCoors: null,
				coords: null
			}
		},
		computed: {
			show () {
				return !!this.el
			},
			getEl () {
				return this.el && this.el.el
			},
			confirm () {
				return this.$refs.confirm
			},
			elCoord () {
				return this.getCoords(this.getEl)
			},
			confirmCoords () {
				return this.getCoords(this.confirm)
			}
		},
		methods: {
			action (value) {
				this.$emit('confirm', value)
				this.close()
			},
			getCoords (elem) {
				const box = elem.getBoundingClientRect()

				return {
					top: box.top + pageYOffset,
					left: box.left + pageXOffset,
					bottom: box.bottom + pageYOffset,
					right: box.right + pageXOffset,
					width: box.width
				}
			},
			getStyle () {
				const coordsLeft = (this.elCoord.left + this.elCoord.width / 2) - (this.confirmCoords.width / 2)
				const coordsRight = coordsLeft + this.confirmCoords.width
				const docWidth = document.body.clientWidth
				const coordsDocDiff = docWidth - coordsRight

				const left = coordsDocDiff > 0 ? `left: ${coordsLeft < 0 ? 0 : coordsLeft + 'px;'}` : 'left: auto;'
				const top = `top: ${this.elCoord.bottom}px;`
				const right = (coordsDocDiff < 0) ? 'right: 0;' : ''

				return (left + top + right)
			},
			close () {
				if (this.display) {
					this.display = false
				}
			}
		},
		watch: {
			el (value) {
				const delay = value.el && this.elParent && (value.el !== this.elParent) && this.display ? 300 : 0
				const display = value.el === this.elParent ? !this.display : true
				this.elParent = value && value.el
				this.display = false
				setTimeout(() => {
					this.confirm.removeAttribute('style')
					this.confirm.setAttribute('style', this.getStyle())
					this.display = display
				}, delay)
			}
		}
	}
</script>

<style scoped lang="sass">
	@import '../assets/sass/variable'
	.confirm_wrap
		font-size: 0.875rem
		position: absolute
		padding-top: 1em
		top: -1000%
		left: -1000%
		z-index: -1
		transition: z-index 0.3s
		&_active
			z-index: 9999999999
			.confirm
				opacity: 1
	.confirm
		opacity: 0
		transition-duration: 0.3s
		font-size: 1rem
		background-color: #fff
		box-shadow: $box_shadow
		min-width: 16em
		border-radius: (1em/4)
		padding: 1em
	.confirm__body
		line-height: 1.7
	.confirm__
		text-align: center
	.confirm__action
		margin-top: 0.3em
	.confirm__cancel
		border-radius: (1em/4)
	.confirm__confirm
		border-radius: (1em/4)
		margin-left: 1em
</style>

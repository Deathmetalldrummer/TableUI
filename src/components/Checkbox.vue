<template lang="pug">
	label.checkbox
		input(type="checkbox" v-model="model" :value="val" @change="$emit('input', result)").checkbox__field
		.checkbox__fake
			Icons(name="checkbox").checkbox__icon
		.checkbox__title(v-if="title") {{title}}
</template>

<script>
	import Icons from './Icons'

	export default {
		name: 'Checkbox',
		props: ['value', 'val', 'title'],
		components: {
			Icons
		},
		data () {
			return {
				checkedProxy: false,
				message: 'Слава Одину, Checkbox работает!',
				result: false
			}
		},
		computed: {
			model: {
				get () {
					return this.value
				},
				set (val) {
					this.result = val
				}
			}
		}
	}
</script>

<style scoped lang="sass">
	@import "../assets/sass/variable"
	.checkbox
		display: inline-block
		cursor: pointer

	.checkbox__field
		display: none

		&:checked + .checkbox__fake
			border-color: $accent

			.checkbox__icon
				opacity: 1

	.checkbox__fake
		width: 0.875em
		height: 0.875em
		cursor: pointer
		transition-duration: 0.3s
		border: 1px solid $border_color_secondary
		border-radius: 1px
		overflow: hidden

	.checkbox__icon
		display: inline-block
		width: 100%
		height: 100%
		transition-duration: 0.3s
		opacity: 0
		fill: $accent

	.checkbox__title
		margin-left: 13px

	.checkbox__fake,
	.checkbox__title
		display: inline-block
		vertical-align: middle
</style>

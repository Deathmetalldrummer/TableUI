<template lang="pug">
	ul.droplist
		li.droplist__item(v-for="item in list" @click="selected(item)") {{item}}
</template>

<script>
	import Checkbox from './Checkbox'

	export default {
		name: 'Droplist',
		props: ['list'],
		components: {
			Checkbox
		},
		data () {
			return {
				message: 'Слава Одину, Droplist работает!'
			}
		},
		methods: {
			selected (item) {
				this.$emit('value', item)
			}
		}
	}
</script>

<style scoped lang="sass">
	.droplist
		list-style: none
		padding: 0
		margin: 0
		background-color: #fff

	.droplist__item
		cursor: pointer
		padding: 0.3em 1em
		transition-duration: 0.3s

		&:hover
			background-color: #eee
</style>

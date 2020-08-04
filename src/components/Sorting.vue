<template lang="pug">
	.sorting
		span.sorting__.sorting__title Sorting by:
		button.btn.sorting__.sorting__btn(type="button" v-for="item of sorting" @click="change(item)" :class="getClass(item)") {{item.name}}
</template>

<script>
	export default {
		name: 'Sorting',
		props: ['list', 'active'],
		data () {
			return {
				message: 'Слава Одину, Sorting работает!',
				sortingActive: this.active
			}
		},
		computed: {
			sorting () {
				return this.list
			}
		},
		methods: {
			change (value) {
				this.sortingActive = (this.sortingActive !== value.value) ? value.value : null
				this.$emit('changed', this.sortingActive ? value : null)
			},
			getClass (item) {
				return {
					btn_depressed: item.value === this.sortingActive,
					btn_text: item.value !== this.sortingActive
				}
			}
		}
	}
</script>

<style scoped lang="sass">
	.sorting
		font-size: 0.875rem
	.sorting__title
		font-weight: 600
		margin-right: 0.5em
	.sorting__
		line-height: 1.7
	.sorting__btn
		padding-left: 0.6em
		padding-right: 0.6em
</style>

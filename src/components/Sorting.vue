<template lang="pug">
	.sorting
		span.sorting__.sorting__title Sorting by:
		button.btn.sorting__(type="button" v-for="item of sorting" @click="change(item)" :class="getClass(item)") {{item.name}}
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
	.sorting__title
		font-weight: bold
		margin-right: 0.5em
</style>

<template lang="pug">
	.pagination
		button.btn.pagination__(@click="prev()" :disabled="prevDisabled")
			Icons(name="chevronLeft").pagination__icon
		span.pagination__.pagination__text {{text}}
		button.btn.btn_icon.pagination__(@click="next()" :disabled="nextDisabled")
			Icons(name="chevronRight").pagination__icon
</template>

<script>
	import Icons from '@/components/Icons'

	export default {
		name: 'Pagination',
		props: {
			length: { // Общее количество
				type: Number,
				default: 0
			},
			perPage: { // Количество на страницу
				type: Number,
				default: 0
			},
			page: { // Номер страницы
				type: Number,
				default: 1
			}
		},
		components: {
			Icons
		},
		data () {
			return {
				message: 'Слава Одину, Pagination работает!',
				perPage_: this.perPage,
				page_: this.page
			}
		},
		computed: {
			_from () {
				return (this.page_ - 1) * this.perPage_ + (!!this.perPage_ && 1)
			},
			_to () {
				const _to = this.page_ * this.perPage_
				return _to > this.length ? this.length : _to
			},
			text () {
				this.$emit('change', { _from: this._from, _to: this._to, page: this.page_ })
				return `${this._from}-${this._to} of ${this.length}`
			},
			prevDisabled () {
				return !!this.length && this.page_ <= 1
			},
			nextDisabled () {
				return !!this.length && this.page_ >= (this.length / this.perPage_)
			}
		},
		methods: {
			next () {
				++this.page_
			},
			prev () {
				--this.page_
			}
		},
		watch: {
			perPage (value) {
				this.page_ = 1
				this.perPage_ = value
			}
		}
	}
</script>

<style scoped lang="sass">
	.pagination
		display: flex
		justify-content: center
		align-items: center

	.pagination__
	.pagination__icon
		width: 0.417em
	.pagination__text
		font-weight: bold
		padding: 0 0.5em
</style>

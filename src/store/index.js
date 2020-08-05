import Vue from 'vue'
import Vuex from 'vuex'
import * as products from '../assets/js/request'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		products: null,
		productsHeader: [
			{
				name: 'Product (100g serving)',
				value: 'product'
			}, {
				name: 'Calories',
				value: 'calories'
			}, {
				name: 'Fat (g)',
				value: 'fat'
			}, {
				name: 'Carbs (g)',
				value: 'carbs'
			}, {
				name: 'Protein (g)',
				value: 'protein'
			}, {
				name: 'Iron (%)',
				value: 'iron'
			}],
		notify: []
	},
	getters: {
		products: state => state.products,
		productsHeader: state => state.productsHeader,
		productsCount: state => state.products ? state.products.length : 0,
		notify: state => state.notify
	},
	mutations: {
		products: (state, payload) => {
			state.products = payload
		},
		deleteProduct: (state, payload) => {
			state.products = state.products.filter(item => item.id !== payload)
		},
		notifyAdd: (state, payload) => state.notify.push(payload),
		notifyDel: (state, payload) => { state.notify = state.notify.filter(item => item.id !== payload) }
	},
	actions: {
		products: state => {
			products.getProducts().then(respond => {
				console.log('Данные получены', respond)
				state.commit('products', respond)
			}).catch(error => {
				console.log('WTF?', error)
			})
		},
		deleteProduct: (state, payload) => {
			products.deleteProducts().then(respond => {
				console.log(`Объект ${payload} удалён!`, respond)
				state.commit('deleteProduct', payload)
				state.dispatch('notifyAdd', {
					type: 'success',
					title: 'Success',
					body: `Объект ${payload} удалён!`
				})
			}).catch(error => {
				console.log('Не удалось удалить объект!', error)
				state.dispatch('notifyAdd', {
					type: 'warning',
					title: 'Warning',
					body: `Не удалось удалить объект ${payload}!`
				})
			})
		},
		notifyAdd: (state, payload) => {
			const notify = state.getters.notify
			const id = notify.length > 0 ? notify[notify.length - 1].id + 1 : notify.length
			const _payload = {
				id: id,
				...payload
			}
			state.commit('notifyAdd', _payload)
			setTimeout(() => {
				state.dispatch('notifyDel', _payload.id)
			}, 10000)
		},
		notifyDel: (state, payload) => {
			state.commit('notifyDel', payload)
		}
	},
	modules: {}
})

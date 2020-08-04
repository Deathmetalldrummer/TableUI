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
			}]
	},
	getters: {
		products: state => state.products,
		productsHeader: state => state.productsHeader,
		productsCount: state => state.products ? state.products.length : 0
	},
	mutations: {
		products: (state, payload) => {
			state.products = payload
		},
		deleteProduct: (state, payload) => {
			state.products = state.products.filter(item => item.id !== payload)
		}
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
			}).catch(error => {
				console.log('Не удалось удалить объект!', error)
			})
		}
	},
	modules: {}
})

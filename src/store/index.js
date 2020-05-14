import Vue from 'vue'
import Vuex from 'vuex'
import * as products from '../assets/js/request'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: null
  },
  getters: {
    products: state => state.products
  },
  mutations: {
    products: (state, payload) => { state.products = payload }
  },
  actions: {
    products: state => {
      products.getProducts().then(respond => {
        console.log('Данные получены', respond)
        state.commit('products', respond)
      }).catch(error => {
          console.log('WTF?', error)
      })
    }
  },
  modules: {
  }
})

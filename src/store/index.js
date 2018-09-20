'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import movies from './modules/movies/index'
import entity from './modules/entity/index'
import loader from './modules/loader/index'

Vue.use(Vuex)
Vue.config.debug = true
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    movies,
    entity,
    loader
  },
  strict: false,
  middlewares: debug ? [createLogger()] : []
})

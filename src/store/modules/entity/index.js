'use strict'

import * as type from './types'
import actions from './actions'

const state = {
  isFetching: false,
  error: null,
  data: {},
  similar: []
}

const mutations = {

  [type.REQUEST_ENTITY] (state) {
    state.isFetching = true
    state.error = null
  },

  [type.REQUEST_ENTITY_SUCCESS] (state, action) {
    state.data = {...action.payload}
    state.isFetching = false
  },

  [type.REQUEST_ENTITY_ERROR] (state, action) {
    state.isFetching = false
    state.error = action.error
  },

  [type.REQUEST_SIMILAR_SUCCESS] (state, action) {
    state.similar = [...action.payload]
    state.isFetching = false
  }

}

const getters = {

  entity: state => {
    return state.data
  },

  isFetching: state => {
    return state.isFetching
  },

  similar: state => {
    return state.similar
  }

}

export default {
  state,
  mutations,
  actions,
  getters
}

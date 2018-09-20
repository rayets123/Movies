'use strict'

import * as type from './types'
import actions from './actions'

const state = {
  isFetching: false,
  error: null,
  data: [],
  favorites: [],
  moviesByGenres: [],
  found: [],
  page: 0,
  total_pages: 0,
  total_results: 0
}

const mutations = {

  [type.REQUEST_MOVIES] (state) {
    state.isFetching = true
    state.error = null
  },

  [type.REQUEST_MOVIES_SUCCESS] (state, action) {
    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults
    } = action.payload
    state.data = [...results]
    state.page = page
    state.total_pages = (totalPages > 1000 ? 1000 : totalPages)
    state.total_results = totalResults
    state.isFetching = false
  },

  [type.REQUEST_MOVIES_ERROR] (state, action) {
    state.isFetching = false
    state.error = action.error
  },

  [type.TOGGLE_FAVOURITE] (state, action) {
    if (state.favorites.some(item => item.id === action.payload.id)) {
      state.favorites = state.favorites.filter((item, i) => item.id !== action.payload.id)
    } else {
      state.favorites = [...state.favorites, action.payload]
    }
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },

  [type.SET_FAVORITES] (state, action) {
    state.favorites = [...action.payload]
  },

  [type.REQUEST_GENRE_MOVIES_SUCCESS] (state, action) {
    state.moviesByGenres = [...action.payload]
  },

  [type.SEARCH_SUCCESS] (state, action) {
    state.found = [...action.payload]
  },

  [type.SORT_MOVIES] (state, action) {
    state[action.payload.name] = [...action.payload.data]
  }

}

const getters = {

  moviesList: state => {
    return state.data
  },

  totalPages: state => {
    return state.total_pages
  },

  favorites: state => {
    return state.favorites
  },

  found: state => {
    return state.found
  },

  moviesByGenres: state => {
    return state.moviesByGenres
  }

}

export default {
  state,
  mutations,
  actions,
  getters
}

'use strict'

import * as type from './types'
import config from '../../../config'
import axios from 'axios'
import { HIDE_LOADER, SHOW_LOADER } from '../loader/types'

const actions = {

  async fetchMovies ({
    commit
  }, data) {
    const { page } = data
    try {
      commit(type.REQUEST_MOVIES)
      commit(SHOW_LOADER)
      const response = await axios.get(`${config.requestUrl}/discover/movie`, {
        params: {
          api_key: config.apiKey,
          page
        }
      })
      commit(type.REQUEST_MOVIES_SUCCESS, {
        payload: response.data
      })
      commit(HIDE_LOADER)
    } catch (error) {
      commit(type.REQUEST_MOVIES_ERROR, {
        error
      })
    }
  },

  async searchMovies ({
    commit
  }, data) {
    const { query } = data
    try {
      commit(type.REQUEST_MOVIES)
      const response = await axios.get(`${config.requestUrl}/search/movie`, {
        params: {
          api_key: config.apiKey,
          query
        }
      })
      commit(type.SEARCH_SUCCESS, {
        payload: response.data.results
      })
    } catch (error) {
      commit(type.REQUEST_MOVIES_ERROR, {
        error
      })
    }
  },

  async fetchMoviesByGenre ({
    commit
  }, data) {
    const { genreId } = data
    try {
      commit(type.REQUEST_MOVIES)
      commit(SHOW_LOADER)
      const response = await axios.get(`${config.requestUrl}/discover/movie`, {
        params: {
          api_key: config.apiKey,
          with_genres: genreId
        }
      })
      commit(type.REQUEST_GENRE_MOVIES_SUCCESS, {
        payload: response.data.results
      })
      commit(HIDE_LOADER)
    } catch (error) {
      commit(type.REQUEST_MOVIES_ERROR, {
        error
      })
    }
  },

  toggleFavourite ({ commit }, data) {
    commit(type.TOGGLE_FAVOURITE, {
      payload: data
    })
  },

  setFavorites ({ commit }, data) {
    commit(type.SET_FAVORITES, {
      payload: data
    })
  },

  sortMovies ({ commit }, data) {
    commit(type.SORT_MOVIES, {
      payload: data
    })
  }

}

export default actions

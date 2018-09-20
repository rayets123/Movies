'use strict'

import * as type from './types'
import config from '../../../config'
import axios from 'axios'
import { HIDE_LOADER, SHOW_LOADER } from '../loader/types'

const actions = {

  async fetchEntity ({
    commit
  }, data) {
    const { id } = data
    try {
      commit(type.REQUEST_ENTITY)
      commit(SHOW_LOADER)
      const response = await axios.get(`${config.requestUrl}/movie/${id}`, {
        params: {
          api_key: config.apiKey
        }
      })
      commit(type.REQUEST_ENTITY_SUCCESS, {
        payload: response.data
      })
      commit(HIDE_LOADER)
    } catch (error) {
      commit(type.REQUEST_ENTITY_ERROR, {
        error
      })
    }
  },

  async fetchSimilar ({
    commit
  }, data) {
    const { id } = data
    try {
      commit(type.REQUEST_ENTITY)
      commit(SHOW_LOADER)
      const response = await axios.get(`${config.requestUrl}/movie/${id}/similar`, {
        params: {
          api_key: config.apiKey
        }
      })
      commit(type.REQUEST_SIMILAR_SUCCESS, {
        payload: response.data.results
      })
      commit(HIDE_LOADER)
    } catch (error) {
      commit(type.REQUEST_ENTITY_ERROR, {
        error
      })
    }
  }

}

export default actions

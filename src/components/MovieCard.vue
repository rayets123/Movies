<template>
  <div>
    <v-hover>
      <v-card class="mb-3 entity" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
        <!-- CARD IMAGE -->
        <router-link :to="`/movie/${movie.id}`">

          <v-layout v-if="genreRoute()" row>
            <v-flex xs4 md2>
              <v-img
                :src="`${config.mdImg}${movie.poster_path}`"
                :lazy-src="`${config.mdImg}${movie.poster_path}`"
                height="200px"
                aspect-ratio="1"
                class="grey lighten-10">
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>
            </v-flex>
            <v-flex xs8 md10 class="text-xs-left">
              <h2 class="mb-2">{{movie.title}}</h2>
              <h4 class="mt-2">Overview</h4>
              <p>{{movie.overview}}</p>
            </v-flex>
          </v-layout>

          <v-img v-else
            :src="`${config.mdImg}${movie.poster_path}`"
            :lazy-src="`${config.mdImg}${movie.poster_path}`"
            height="200px"
            aspect-ratio="1"
            class="grey lighten-10">
            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </v-img>

        </router-link>
        <!-- CARD IMAGE -->
        <!-- CARD ACIONS -->
        <v-card-actions v-if="!genreRoute()">
          <router-link :to="`/movie/${movie.id}`">
            <span class=" white--text" v-text="movie.original_title"></span>
          </router-link>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn slot="activator" fab dark small @click="toggleFavourite(movie)">
              <v-icon :color="checkFavorite()">favorite</v-icon>
            </v-btn>
            <span v-text="checkFavorite() === 'pink' ? 'Remove from favorite' : 'Add to favorite'"></span>
          </v-tooltip>
        </v-card-actions>
        <!-- CARD ACIONS -->
      </v-card>
    </v-hover>
  </div>
</template>
<script>
// Vuex
import { mapGetters, mapActions } from 'vuex'

import config from '../config'
export default {
  name: 'MovieCard',
  props: {
    movie: {
      required: true,
      type: Object
    }
  },
  data () {
    return { config }
  },
  computed: {
    ...mapGetters(['favorites'])
  },
  methods: {
    ...mapActions(['toggleFavourite']),
    checkFavorite () {
      return this.favorites.some(item => item.id === this.movie.id)
        ? 'pink'
        : 'white'
    },
    genreRoute () {
      return this.$route.name === 'Genre'
    }
  }
}
</script>

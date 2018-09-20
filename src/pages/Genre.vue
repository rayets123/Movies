<template>
  <div>
    <!-- SORT PANEL -->
    <v-layout>
      <v-flex>
        <SortingPanel :data='moviesByGenres'/>
      </v-flex>
    </v-layout>
    <!-- SORT PANEL -->
    <!-- MOVIES BY GENRE -->
    <v-container fluid grid-list-md>
        <h2 class='text-xs-left text-uppercase mb-2'>Movies by genre</h2>
        <v-layout row wrap>
            <v-flex v-for='(movie, key) in moviesByGenres' xs12 md12 :key='key'>
                <MovieCard :movie='movie'/>
            </v-flex>
        </v-layout>
    </v-container>
    <!-- MOVIES BY GENRE -->
  </div>
</template>
<script>
// Vuex
import { mapGetters, mapActions } from 'vuex'
import store from '../store/index'

// Components
import MovieCard from '@/components/MovieCard'
import SortingPanel from '@/components/SortingPanel'

export default {
  components: {
    MovieCard,
    SortingPanel
  },
  computed: {
    ...mapGetters(['moviesByGenres'])
  },
  methods: {
    ...mapActions(['fetchMoviesByGenre', 'addFavourite'])
  },
  async beforeRouteEnter (to, from, next) {
    await store.dispatch('fetchMoviesByGenre', {
      genreId: to.params.id
    })
    next()
  }
}
</script>

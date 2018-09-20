<template>
  <div>
    <!-- SORT PANEL -->
    <v-layout>
      <v-flex>
        <SortingPanel :data='favorites'/>
      </v-flex>
    </v-layout>
    <!-- SORT PANEL -->
    <!-- FAVORITES MOVIES -->
    <v-container fluid grid-list-md>
      <h2 class='text-xs-left text-uppercase mb-2'>Favorite movies</h2>
      <v-layout row wrap>
        <v-flex v-for='(movie, key) in favorites' xs4 md3 :key='key'>
          <MovieCard :movie='movie'/>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- FAVORITES MOVIES -->
  </div>
</template>
<script>
// Vuex
import { mapGetters, mapActions } from 'vuex'

// Components
import MovieCard from '@/components/MovieCard'
import SortingPanel from '@/components/SortingPanel'

export default {
  components: {
    MovieCard,
    SortingPanel
  },
  computed: {
    ...mapGetters(['favorites'])
  },
  methods: {
    ...mapActions([
      'fetchMovies',
      'addFavourite'
    ])
  }
}
</script>

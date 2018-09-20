<template>
  <div>
    <!-- SORT PANEL -->
    <v-layout>
      <v-flex>
        <SortingPanel :data='moviesList'/>
      </v-flex>
    </v-layout>
    <!-- SORT PANEL -->
    <!-- MAIN MOVIES LIST -->
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex v-for='(movie, key) in moviesList' xs4 md3 :key='key'>
          <MovieCard :movie='movie' />
        </v-flex>
      </v-layout>
    </v-container>
    <!-- MAIN MOVIES LIST -->
    <!-- PAGINATION -->
    <v-pagination
      class='pb-3'
      v-model='page'
      :length='totalPages'
      :total-visible='8'
      @input='changePage'
    >
    </v-pagination>
    <!-- PAGINATION -->
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
  data () {
    return {
      page: 1
    }
  },
  computed: {
    ...mapGetters([
      'moviesList',
      'totalPages'
    ])
  },
  methods: {
    ...mapActions([
      'fetchMovies',
      'addFavourite'
    ]),
    changePage () {
      this.fetchMovies({
        page: this.page
      })
    }
  },
  async beforeRouteEnter (to, from, next) {
    await store.dispatch('fetchMovies', {
      page: 1
    })
    next()
  }
}
</script>
<style lang='scss'>
.entity .v-image__image {
  transition: all 0.3s linear;
}
.entity:hover .v-image__image {
  transform: scale(1.1);
}
</style>

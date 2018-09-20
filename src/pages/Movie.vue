<template>
  <div v-if='!isFetching'>
    <v-layout wrap :style="{ 'background-image': `url(${config.lgImg}${entity.backdrop_path})`, 'background-size': 'cover' }">
      <v-flex class='custom_bg pb-3'>

        <!-- MOVIE DETAILS -->
        <v-container>
          <v-layout align-center justify-center row fill-height>
            <v-flex xs12 md6 lg3 class='pa-2'>
              <img :src='`${config.mdImg}${entity.poster_path}`' alt='alt'>
            </v-flex>
            <v-flex xs12 md6 lg9 class='text-xs-left pa-2'>
              <v-layout align-center>
                <h2 class='mb-2'>{{entity.title}}</h2>
                <v-tooltip top>
                  <v-btn slot='activator' fab dark small @click='toggleFavourite(entity)'>
                    <v-icon :color='checkFavorite()'>favorite</v-icon>
                  </v-btn>
                  <span v-text="checkFavorite() === 'pink' ? 'Remove from favorite' : 'Add to favorite'"></span>
                </v-tooltip>
              </v-layout>
              <p>
                Release date: {{$moment(entity.release_date).format('MMMM Do YYYY')}}
              </p>
              <p>
                Popularity: {{entity.popularity}}
              </p>
              <p>
                Budget: $ {{entity.budget | currency}}
              </p>
              <p>
                Revenue: $ {{entity.revenue | currency}}
              </p>
              <p>
                Genre:
                <span v-for='(genre, key) in entity.genres' :key='key'>
                  <v-btn small>
                    <router-link :to='`/genre/${genre.id}`'>
                      {{genre.name}}
                    </router-link>
                  </v-btn>
                </span>
              </p>
              <p>
                Countries:
                <span v-for='(country, key) in entity.production_countries' :key='key'>
                  {{country.name}},
                </span>
              </p>
              <h4 class='mt-2'>Overview</h4>
              <p>{{entity.overview}}</p>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- MOVIE DETAILS -->

        <!-- SIMILAR -->
        <v-flex v-if='similar.length > 0'>
          <h2 class='display-2'>Similar</h2>
          <swiper :options='swiperOption'>
            <swiper-slide v-for='(item, key) in similar' :key='key'>
              <router-link :to='`/movie/${item.id}`'>
                <img :src='`${config.mdImg}${item.poster_path}`' alt='alt'>
              </router-link>
            </swiper-slide>
            <div class='swiper-pagination' slot='pagination'></div>
            <div class='swiper-button-prev swiper-button-white' slot='button-prev'></div>
            <div class='swiper-button-next swiper-button-white' slot='button-next'></div>
          </swiper>
        </v-flex>
        <!-- SIMILAR -->

      </v-flex>
    </v-layout>
  </div>
</template>
<script>
// Vuex
import { mapGetters, mapActions } from 'vuex'

// Libs
import config from '../config'
export default {
  name: 'Movie',
  data () {
    return {
      config,
      swiperOption: {
        loop: true,
        slidesPerView: 8,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          1024: {
            slidesPerView: 6,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 20
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 10
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'entity',
      'similar',
      'isFetching',
      'favorites'
    ])
  },
  filters: {
    currency: function (value) {
      return value && value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  created () {
    this.fetchEntity({
      id: this.$route.params.id
    })
    this.fetchSimilar({
      id: this.$route.params.id
    })
  },
  methods: {
    ...mapActions([
      'fetchEntity',
      'fetchSimilar',
      'toggleFavourite'
    ]),
    checkFavorite () {
      return this.favorites.some(item => item.id === this.entity.id)
        ? 'pink'
        : 'white'
    }
  }
}
</script>
<style lang='scss'>
.custom_bg {
  min-height: calc(100vh - 65px);
  background: radial-gradient(
    circle at 20% 50%,
    rgba(20.39%, 16.08%, 19.22%, 0.98) 0%,
    rgba(20.39%, 16.08%, 19.22%, 0.88) 100%
  );
}
img {
  max-width: 100%;
}
.swiper-container {
  color: #fff;
  padding: 30px;
}
</style>

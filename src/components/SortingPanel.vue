<template>
  <div>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <div slot='header'>Sorting</div>
        <v-select
            full-width
            outline
            v-model='select'
            class='mx-3'
            :items='items'
            item-text='name'
            item-value='value'
            dark label='Sort movies'
            @input='sorting'
        >
        </v-select>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>
export default {
  name: 'SortingPanel',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      select: '',
      items: [
        {
          name: 'Popularity',
          value: 'popularity'
        },
        {
          name: 'Vote count',
          value: 'vote_count'
        },
        {
          name: 'Vote average',
          value: 'vote_average'
        },
        {
          name: 'Title',
          value: 'title'
        }
      ]
    }
  },
  methods: {
    sorting () {
      this.data.sort((a, b) => {
        if (a[this.select] > b[this.select]) {
          return -1
        }
        if (a[this.select] < b[this.select]) {
          return 1
        }
        return 0
      })
      if (this.select === 'title') {
        this.data.reverse()
      }
    }
  }
}
</script>

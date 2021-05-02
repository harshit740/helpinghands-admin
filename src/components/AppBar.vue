<template>
  <v-app-bar
      app
      dark
  >
    <v-app-bar-nav-icon @click.stop="setDrawer()"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-layout v-if="$route.path === '/'">
      <v-autocomplete
          v-model="selectedCity"
          :items="city['data']"
          item-text='Name'
          item-value='_id'
          hide-details
          label="City"
          @change="cityOnSelect"
          small-chips
          clearable
          solo
      ></v-autocomplete>
      <v-spacer></v-spacer>
      <v-autocomplete
          v-model="selectedResource"
          :items="resources['data']"
          item-text='resourceName'
          item-value='_id'
          hide-details
          label="Select Resource"
          @change="resourceOnSelect"
          chips
          clearable
          solo
      ></v-autocomplete>
    </v-layout>
    <v-progress-circular
        :size="40"
        :width="10"
        color="white"
        indeterminate
        v-if="loader.loading"
    ></v-progress-circular>
  </v-app-bar>
</template>

<script>


import {mapState} from "vuex";

export default {
  name: "AppBar",

  async mounted() {

  },
  computed: {
    ...mapState({
      resources: state => state.resources,
      city: state => state.city,
      loader: state => state.loader
    }),
    selectedCity: {
      get() {
        return this.$store.getters.getSelectedCity
      },
      set(value) {
        this.$store.commit('setSelectedCity', value)
      }
    },
    selectedResource: {
      get() {
        return this.$store.getters.getSelectedResource
      },
      set(value) {
        this.$store.commit('setSelectedResource', value)
      }
    }
  },
  watch: {}
  ,
  methods: {
    setDrawer() {
      this.$store.commit("setDrawer")
    }
    ,
    cityOnSelect(data) {
      if (this.$store.getters.getSelectedResource && data) {
        this.$store.dispatch('loadPosts', {city: data, resource: this.$store.getters.getSelectedResource})
      } else if (data) {
        this.$store.dispatch('loadPosts', {city: data})
      } else {
        this.$store.dispatch('loadPosts', {})
      }
    }
    ,
    resourceOnSelect(data) {
      if (this.$store.getters.getSelectedCity && data) {
        this.$store.dispatch('loadPosts', {resource: data, city: this.$store.getters.getSelectedCity})
      } else if (data) {
        this.$store.dispatch('loadPosts', {resource: data})
      } else {
        this.$store.dispatch('loadPosts', {})
      }
    }
  }
}
</script>

<style scoped>

</style>
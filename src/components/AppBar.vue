<template>
  <v-app-bar
      app
      dark
      short
      outlined
  >
    <v-app-bar-nav-icon @click.stop="setDrawer()"></v-app-bar-nav-icon>
    <v-layout v-if="$route.path === '/' && windowWidth < 600">
      <v-bottom-sheet v-model="sheet">
        <v-sheet
            class="text-center"
            height="200px"
        >
          <div class="py-3">
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
            <v-checkbox ripple label="Show UnApproved Only" v-on:change="checkboxChange"></v-checkbox>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </v-layout>
    <v-layout v-if="$route.path === '/' && windowWidth > 600" align-baseline>
      <v-autocomplete
          v-if="windowWidth > 600"
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
      <v-autocomplete
          v-if="windowWidth > 600"
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
      <v-checkbox ripple label="Show UnApproved Only" v-on:change="checkboxChange"></v-checkbox>
    </v-layout>
    <v-btn
        v-if="windowWidth < 600"
        dark
        @click="sheet = !sheet"
    >
      <v-icon>fas fa-filter</v-icon>
    </v-btn>
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
  data: () => {
    return {
      sheet: false,
      windowWidth: window.innerWidth,
      isshowunAproved: false
    }
  },
  mounted() {
    console.log(this.windowWidth)
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
    checkboxChange(event) {
      this.isshowunAproved = !event;
      let payload = {}
      if (this.$store.getters.getSelectedResource && this.$store.getters.getSelectedCity) {
        payload = {
          city: this.$store.getters.getSelectedCity,
          resource: this.$store.getters.getSelectedResource,
          approved: this.isshowunAproved
        }
      } else if (this.$store.getters.getSelectedCity) {
        payload = {city: this.$store.getters.getSelectedCity, approved: !event}
      } else if (this.$store.getters.getSelectedResource) {
        payload = {resource: this.$store.getters.resource, approved: !event}
      } else {
        payload = {approved: !event}
      }
      this.$store.dispatch('loadPosts', payload)
    },
    setDrawer() {
      this.$store.commit("setDrawer")
    },
    cityOnSelect(data) {
      if (this.$store.getters.getSelectedResource && data) {
        this.$store.dispatch('loadPosts', {
          city: data,
          resource: this.$store.getters.getSelectedResource,
          approved: this.isshowunAproved
        })
      } else if (data) {
        this.$store.dispatch('loadPosts', {city: data})
      } else {
        this.$store.dispatch('loadPosts', {})
      }
    },
    resourceOnSelect(data) {
      if (this.$store.getters.getSelectedCity && data) {
        this.$store.dispatch('loadPosts', {
          resource: data,
          city: this.$store.getters.getSelectedCity,
          approved: this.isshowunAproved
        })
      } else if (data) {
        this.$store.dispatch('loadPosts', {resource: data, approved: this.isshowunAproved})
      } else {
        this.$store.dispatch('loadPosts', {approved: this.isshowunAproved})
      }
    }
  }
}
</script>

<style scoped>

</style>
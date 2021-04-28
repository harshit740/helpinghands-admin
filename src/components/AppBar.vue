<template>
  <v-app-bar
      app
      dark
  >
    <v-app-bar-nav-icon @click.stop="setDrawer()"></v-app-bar-nav-icon>

    <div class="d-flex align-center">
    </div>
    <v-spacer></v-spacer>
    <v-select
        v-model="selectedCity"
        :items="city['data']"
        item-text='Name'
        item-value='_id'
        hide-details
        label="City"
        @change="cityOnSelect"
    ></v-select>
    <v-spacer></v-spacer>
    <v-select
        v-model="resourcess"
        :items="resources['data']"
        item-text='resourceName'
        item-value='_id'
        hide-details
        label="Select Resource"
        @change="resourceOnSelect"
    ></v-select>
  </v-app-bar>
</template>

<script>


import {mapState} from "vuex";

export default {
  name: "AppBar",
  data() {
    return {
      resourcess: [],
    }
  },
  async mounted() {
    await this.$store.dispatch('loadCity',)
    await this.$store.dispatch('loadResources',)
  },
  computed: {
    ...mapState({
      resources: state => state.resources,
      city: state => state.city
    }),
    selectedCity: {
      get() {
        return this.$store.getters.isSelectedCity
      },
      set(value) {
        this.$store.commit('setSelectedCity', value)
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
      console.log("InsideSelected ")
      this.$store.dispatch('loadPosts', {city: data})
    }
    ,
    resourceOnSelect(data) {
      if (this.selectedCity) {
        console.log(this.$store.getters.isSelectedCity)
        this.$store.dispatch('loadPosts', {resource: data, city: this.$store.getters.isSelectedCity})
      } else {
        this.$store.dispatch('loadPosts', {resource: data})

      }
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <v-app>
    <app-bar></app-bar>
    <sidebar></sidebar>
    <v-main>
      <v-layout v-if="isload" justify-center>
        <v-progress-circular
            class="text-xs-center justify-lg-end"
            :size="100"
            :width="10"
            color="white"
            indeterminate
        ></v-progress-circular>
      </v-layout>

      <router-view v-else/>
    </v-main>
  </v-app>
</template>

<script>

import AppBar from "@/components/AppBar";
import Sidebar from "@/components/Sidebar";

export default {
  name: 'App',

  components: {Sidebar, AppBar},
  mounted() {
    this.$store.dispatch('loadPosts')
  },
  computed: {
    isload() {
      console.log("IslOading")
      return this.$store.getters.isLoading
    }
  },
  data: () => ({
    drawer: true
  }),
  watch: {}
};
</script>

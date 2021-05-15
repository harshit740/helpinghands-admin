<template>
  <v-app>
    <app-bar></app-bar>
    <sidebar></sidebar>
    <v-main>
      <router-view :key="$route.path"/>
    </v-main>
  </v-app>
</template>

<script>

import AppBar from "@/components/AppBar";
import Sidebar from "@/components/Sidebar";

export default {
  name: 'DashboardLayout',

  components: {Sidebar, AppBar},
  async mounted() {
    this.$store.dispatch('loadPosts')
    this.$store.dispatch('loadCity',)
    this.$store.dispatch('loadResources',)
  },
  data: () => ({
    drawer: true
  }),
};
</script>

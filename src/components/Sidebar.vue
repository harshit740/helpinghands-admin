<template>
  <v-navigation-drawer
      v-model="drawer"
      @close="drawer = false"
      absolute
      temporary
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aef07710c08d50?class=photo"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ getUserName }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-content>
        <v-btn @click="logout">Logout</v-btn>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item>
        <router-link to="/">Home</router-link>
      </v-list-item>
      <v-list-item>
        <router-link to="posts">Posts</router-link>
      </v-list-item>
      <v-list-item>
        <router-link to="users">Users</router-link>
      </v-list-item>
      <v-list-item>
        <router-link to="resources">Resources</router-link>
      </v-list-item>
      <v-list-item>
        <router-link to="city">City</router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  data: () => ({
    drawer: false,
    drawerClosed: false
  }),
  methods: {
    logout() {
      this.$router.push('/accounts/login');
    }
  },
  watch: {
    drawer() {
      if (this.drawer) {
        this.$store.commit("setDrawer")
      }
    }
  },
  computed: {
    getUserName: () => {
      let username = JSON.parse(localStorage.getItem('Auth'))
      return username['username']
    },
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'setDrawer') {
        console.log("Setting Drawe")
        if (state.drawer) {
          this.drawer = state.drawer
        }
      } else if (mutation.type === 'setUsername') {
        this.username = state.username
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
}
</script>

<style scoped>

</style>
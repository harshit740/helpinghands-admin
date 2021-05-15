<template>
  <v-navigation-drawer
      v-model="drawer"
      @close="drawer = false"
      absolute
      temporary
      fixed
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

    <v-list>
      <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="rout(item)"
        >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard',route:"/" },
      { title: 'Posts', icon: 'mdi-view-list',route: "posts" },
      { title: 'Users', icon: 'mdi-account-box',route:"users" },
      { title: 'Resources', icon: 'mdi-resource',route:"resources" },
      { title: 'City', icon: 'mdi-city',route:"city" },

    ],
    drawer: false,
    drawerClosed: false
  }),
  methods: {
    rout(item){
      this.$router.push(item.route);
    },
    logout() {
      this.$router.push('/accounts/login');
    },
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

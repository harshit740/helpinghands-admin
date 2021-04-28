<template>
  <v-card dark width="400">
    <v-layout column>
      <v-layout row justify-center>
        <v-card-actions>
          <v-btn color="orange" v-if="post['resource']">{{ post['resource']['resourceName'] }}</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn v-if="post['city']" @click="onSelectCity(post['city'])" color="primary">{{ post['city'].Name }}</v-btn>
          <br>
        </v-card-actions>
      </v-layout>

      <v-card-title>{{ post['personName'] }}</v-card-title>
      <br>
      <v-layout row justify-space-around>
        <span>{{ post['personContactNo'] }}</span>
        <span><v-icon>fa fa-envelope</v-icon></span>
        <span><v-icon>fa fa-phone</v-icon></span>
      </v-layout>
      <v-layout row justify-space-around>
        <span>{{ post['postedBy']['username'] }}</span>
        <span>{{ Date.parse(post['createdAt']) }}</span>
      </v-layout>
      <v-layout justify-space-around row>
        <v-card-actions v-if="!post['approved']">
          <v-btn class="ma-2" color="green" dark>Approve
            <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
          <v-btn class="ma-2" color="red" dark>Reject
            <v-icon dark left>fa-times</v-icon>
          </v-btn>
        </v-card-actions>
      </v-layout>
    </v-layout>
  </v-card>

</template>

<script>
export default {
  name: "card",
  props: [
    'post'
  ],
  mounted() {
    console.log(this.post['approved'])
  },
  methods: {
    onSelectCity(data) {
      this.$store.dispatch('loadPosts', {city: data._id})
      this.$store.commit('setSelectedCity', data)
      console.log(data)
    }
  }

}
</script>

<style scoped>

</style>
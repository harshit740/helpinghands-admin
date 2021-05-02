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
          <v-btn class="ma-2" color="green" :loading="isLoading" dark @click="approve(post)">Approve
            <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
          <v-btn class="ma-2" color="red" dark @click=reject(post)>Reject
            <v-icon dark left>fa-times</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions v-if="post['approved']">
          <v-btn class="ma-2" color="green" dark>Approved
            <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-layout>
    </v-layout>
  </v-card>

</template>

<script>
import {host} from "@/config";

export default {
  name: "card",
  data: () => {
    return {
      isLoading: false
    }
  },
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
    },
    async approve(post) {
      this.isLoading = true
      let response = (await this.$axios.post(host + '/manageMod/approvePost', {postId: post['_id']})).data
      if (response['code'] === 200) {
        this.post['approved'] = true
      }
      this.isLoading = false
    },
    reject(post) {
      console.log(post)

    }
  }

}
</script>

<style scoped>

</style>
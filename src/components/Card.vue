<template>
  <v-card dark>
    <v-layout column>
      <v-layout row justify-center>
        <v-card-actions>
          <v-btn small color="orange" v-if="post['resource']">{{ post['resource']['resourceName'] }}</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" small v-if="post['city']" @click="onSelectCity(post['city'])"
                     color="primary">{{
                  post['city'].Name.length > 20 ? post['city'].Name.slice(0, 20) + '..' : post['city'].Name
                }}
              </v-btn>
            </template>
            <span>{{ post['city'].Name }}</span>
          </v-tooltip>
          <br>
        </v-card-actions>
      </v-layout>

      <v-card-title>{{
          post['personName'].length > 20 ? post['personName'].slice(0, 20) + '..' : post['personName']
        }}
      </v-card-title>
      <br>
      <v-layout row justify-space-around>
        <span>{{ post['personContactNo'] }}</span>
        <span><v-icon>fa fa-envelope</v-icon></span>
        <span><v-icon>fa fa-phone</v-icon></span>
      </v-layout>
      <v-card-text></v-card-text>
      <v-layout row justify-space-around>
        <v-chip color="cyan" small label>Posted By</v-chip>
        <v-chip color="primary" small label>{{ post['postedBy'] }}</v-chip>
      </v-layout>
      <v-card-text></v-card-text>
      <v-layout row justify-space-around>
        <v-chip color="cyan" small label>Posted On</v-chip>
        <v-chip color="primary" small label>{{ new Date(post['createdAt']).toLocaleString() }}</v-chip>
      </v-layout>
      <v-layout justify-center>
        <v-card-actions v-if="!post['approved']">
          <v-btn small class="ma-2" color="green" :loading="isLoading" dark @click="approve(post)">Approve
            <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
          <v-btn class="ma-2" small color="red" dark @click=reject(post)>Reject
            <v-icon dark left>fa-times</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions v-if="post['approved']">
          <v-btn small class="ma-2" color="green" dark>Approved
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
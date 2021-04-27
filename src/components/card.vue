<template>
  <v-card dark width="400">
    <v-layout column>
      <v-layout row justify-center>
        <v-card-actions>
          <v-btn color="orange" v-if="resource">{{ resource.resourceName }}</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn v-if="city" @click="onSlectCity(city)" color="green">{{ city.Name }}</v-btn>
          <br>
        </v-card-actions>
      </v-layout>
      <v-card-title>
        <div>
          <span>{{ title }}</span><br>
          <br>
          <v-layout row justify-center>
            <span>{{ phonenumer }}</span>
          </v-layout>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn class="ma-2" color="primary" dark>Approve
          <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-layout>
  </v-card>

</template>

<script>
export default {
  name: "card",
  props: [
    'title',
    'phonenumer',
    'resource',
    'city'
  ],
  methods: {
    onSlectCity(data) {
      this.$store.dispatch('loadPosts', {city: data._id})
      this.$store.commit('setSelectedCity', data)
      console.log(data)
    }
  }

}
</script>

<style scoped>

</style>
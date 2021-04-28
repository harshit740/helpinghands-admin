<template>
  <v-container>
    <v-item-group>
      <v-row>
        <v-col
            v-for="post in posts.data"
            :key="post._id"
            cols="12"
            md="3"
        >
          <v-item >
            <card
                v-if="post"
                :post="post"
                class="d-flex align-center"
                dark
                height="240"
            >
            </card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </v-container>
</template>

<script>
import Card from "@/components/card";
import {mapState} from 'vuex';

export default {
  name: "cardList",
  components: {Card},
  computed: mapState([
    'posts'
  ]),
  watch: {
  }

}
</script>

<style scoped>

</style>
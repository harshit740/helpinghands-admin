<template>
    <v-item-group>
      <v-row>
        <v-col
            v-for="post in this.posts.data"
            :key="post._id"
            cols="14"
            md="3"
        >
          <v-item>
            <card
                v-show="post"
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
</template>

<script>
import Card from "@/components/Card";

export default {
  props: [
    'posts'
  ],
  name: "cardList",
  components: {Card},

}
</script>

<style scoped>

</style>
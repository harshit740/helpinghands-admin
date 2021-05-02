<template>

  <card-list v-if="posts" :posts="posts"></card-list>
</template>

<script>

import CardList from "@/components/CardList";
import {mapState} from "vuex";

export default {
  name: 'Home',
  computed: mapState([
    'posts','loader'
  ]),
  components: {
    CardList,
  }
}
</script>

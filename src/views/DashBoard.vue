<template>
<v-container>
  <card-list v-if="posts" :posts="posts"></card-list>
</v-container>
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
